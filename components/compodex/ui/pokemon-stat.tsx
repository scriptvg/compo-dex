"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"

/* -------------------------------------------------------------------------
 * PokemonStat — base-stat rows (HP, Attack, Defense, …) composed on shadcn/ui.
 *
 * Each row is a shadcn `Field`: a `FieldLabel` (name + value) over a `Progress`
 * bar, wired together with `htmlFor` / `id` exactly like shadcn's labelled
 * progress example. The root owns one stat (name + value + max), derives its
 * fill percentage and color, and shares them through context so the parts stay
 * composable.
 * ----------------------------------------------------------------------- */

/** Canonical stat order as returned by PokéAPI. */
export const POKEMON_STAT_ORDER = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
] as const

export type PokemonStatName = (typeof POKEMON_STAT_ORDER)[number]

export const POKEMON_STAT_LABEL = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
} as const satisfies Record<PokemonStatName, string>

/** Self-contained per-stat colors (inline so the component installs alone). */
export const POKEMON_STAT_COLOR = {
  hp: "#22c55e",
  attack: "#f97316",
  defense: "#eab308",
  "special-attack": "#3b82f6",
  "special-defense": "#84cc16",
  speed: "#ec4899",
} as const satisfies Record<PokemonStatName, string>

/** Practical maximum of a single base stat across the games (Blissey HP = 255). */
export const POKEMON_STAT_MAX = 255

/* -------------------------------- Context -------------------------------- */

type PokemonStatContextValue = {
  name?: PokemonStatName
  value: number
  max: number
  /** `value / max` clamped to 0–100, for the Progress bar. */
  percent: number
  label: string
  color: string
  /** Wires `FieldLabel htmlFor` to `Progress id`. */
  id: string
}

const PokemonStatContext =
  React.createContext<PokemonStatContextValue | null>(null)

function usePokemonStat(): PokemonStatContextValue {
  const ctx = React.useContext(PokemonStatContext)
  if (!ctx) throw new Error("usePokemonStat must be used within <PokemonStat>")
  return ctx
}

/* --------------------------------- Root ---------------------------------- */

export type PokemonStatProps = Omit<
  React.ComponentProps<typeof Field>,
  "color"
> & {
  /** Known stat — fills in label and color automatically. */
  stat?: PokemonStatName
  value: number
  /** Scale the bar against this. Defaults to `POKEMON_STAT_MAX` (255). */
  max?: number
  /** Override the label (defaults to the stat's name). */
  label?: string
  /** Override the bar color (defaults to the stat's color, else `--primary`). */
  color?: string
}

function PokemonStat({
  stat,
  value,
  max = POKEMON_STAT_MAX,
  label,
  color,
  className,
  ...props
}: PokemonStatProps) {
  const id = React.useId()
  const resolvedLabel = label ?? (stat ? POKEMON_STAT_LABEL[stat] : "")
  const resolvedColor =
    color ?? (stat ? POKEMON_STAT_COLOR[stat] : "var(--primary)")
  const percent =
    max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0

  const ctx = React.useMemo<PokemonStatContextValue>(
    () => ({
      name: stat,
      value,
      max,
      percent,
      label: resolvedLabel,
      color: resolvedColor,
      id,
    }),
    [stat, value, max, percent, resolvedLabel, resolvedColor, id]
  )

  return (
    <PokemonStatContext.Provider value={ctx}>
      <Field
        data-slot="pokemon-stat"
        data-stat={stat}
        className={cn("gap-1 text-xs", className)}
        {...props}
      />
    </PokemonStatContext.Provider>
  )
}

/* --------------------------------- Label --------------------------------- */

export type PokemonStatLabelProps = React.ComponentProps<typeof FieldLabel>

/**
 * Label row over the bar — shadcn `FieldLabel` bound to the Progress via
 * `htmlFor`. Defaults to `name … value`; pass children to recompose.
 */
function PokemonStatLabel({
  className,
  children,
  ...props
}: PokemonStatLabelProps) {
  const { label, id } = usePokemonStat()
  return (
    <FieldLabel
      htmlFor={id}
      className={cn("w-full text-muted-foreground", className)}
      {...props}
    >
      {children ?? (
        <>
          <span className="truncate">{label}</span>
          <PokemonStatValue className="ml-auto" />
        </>
      )}
    </FieldLabel>
  )
}

/* --------------------------------- Value --------------------------------- */

export type PokemonStatValueProps = React.ComponentProps<"span">

function PokemonStatValue({
  className,
  children,
  ...props
}: PokemonStatValueProps) {
  const { value } = usePokemonStat()
  return (
    <span
      data-slot="pokemon-stat-value"
      className={cn("font-medium tabular-nums text-foreground", className)}
      {...props}
    >
      {children ?? value}
    </span>
  )
}

/* ---------------------------------- Bar ---------------------------------- */

export type PokemonStatBarProps = React.ComponentProps<typeof Progress>

/**
 * The stat bar — shadcn `Progress` recolored per stat. `value` is the fill
 * percentage; the real `value / max` is announced via `aria-valuetext`, and
 * the bar is named by `<PokemonStatLabel>` through `htmlFor` / `id`.
 */
function PokemonStatBar({ className, style, ...props }: PokemonStatBarProps) {
  const { id, percent, value, max, color } = usePokemonStat()
  return (
    <Progress
      id={id}
      data-slot="pokemon-stat-bar"
      value={percent}
      aria-valuetext={`${value} / ${max}`}
      // Recolor the Progress indicator with the per-stat color.
      className={cn(
        "h-2 [&>[data-slot=progress-indicator]]:bg-(--stat-color)",
        className
      )}
      style={{ "--stat-color": color, ...style } as React.CSSProperties}
      {...props}
    />
  )
}

/* --------------------------------- List ---------------------------------- */

/** One row's data for the `stats` render shorthand. */
export type PokemonStatEntry = {
  stat?: PokemonStatName
  value: number
  max?: number
  label?: string
  color?: string
}

/**
 * Accepts either an array of entries or a `{ stat: value }` record (e.g.
 * straight from a stats object). Records are ordered by `POKEMON_STAT_ORDER`.
 */
export type PokemonStatsInput =
  | PokemonStatEntry[]
  | Partial<Record<PokemonStatName, number>>

function normalizeStats(stats: PokemonStatsInput): PokemonStatEntry[] {
  if (Array.isArray(stats)) return stats
  return POKEMON_STAT_ORDER.filter((name) => stats[name] != null).map(
    (name) => ({ stat: name, value: stats[name] as number })
  )
}

export type PokemonStatListProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  /**
   * Data to render. Either an array of entries or a `{ stat: value }` record.
   * Each entry is handed to the `children` render prop.
   */
  stats?: PokemonStatsInput
  /**
   * Render prop: receives each stat entry and returns its row. Pass a plain
   * node instead to compose `<PokemonStat>` children by hand.
   */
  children?:
    | React.ReactNode
    | ((entry: PokemonStatEntry, index: number) => React.ReactNode)
}

/**
 * Spacing wrapper for a set of stat rows. Pass `stats` plus a `children` render
 * prop to render from data, or compose `<PokemonStat>` children directly.
 */
function PokemonStatList({
  className,
  stats,
  children,
  ...props
}: PokemonStatListProps) {
  return (
    <div
      data-slot="pokemon-stat-list"
      className={cn("grid gap-3", className)}
      {...props}
    >
      {typeof children === "function"
        ? normalizeStats(stats ?? []).map((entry, index) => (
            <React.Fragment key={entry.stat ?? index}>
              {children(entry, index)}
            </React.Fragment>
          ))
        : children}
    </div>
  )
}

export {
  PokemonStat,
  PokemonStatLabel,
  PokemonStatValue,
  PokemonStatBar,
  PokemonStatList,
  usePokemonStat,
}
