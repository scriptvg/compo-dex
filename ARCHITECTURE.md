# CompoDex Architecture & Design

**Status:** Design approved  
**Version:** 1.0.0  
**Date:** 2026-07-03

---

## Executive Summary

CompoDex is a **Pokédex-specialized UI kit** for React developers. Unlike shadcn/ui (generic primitives), CompoDex provides **domain-aware components** that understand Pokémon data shapes but remain **data-agnostic** — no PokeAPI coupling.

**Philosophy:** Copy-paste components (shadcn model) + Pokédex domain expertise + freedom to modify.

**For juniors:** Install a component, read JSDoc for the expected data shape, connect your PokeAPI calls, done.

**Long-term:** Extract primitives → npm package with zero external dependencies.

---

## Part 1: Comparative Analysis

### PokemonCard vs shadcn Card vs Radix Card

| Aspect | shadcn Card | Radix Card | CompoDex Card |
|--------|-------------|-----------|---------------|
| **Primitive** | `<div>` wrapper | None (recommend HTML) | `<article>` semantic |
| **Type awareness** | ❌ Generic | ❌ Generic | ✅ Pokémon type → gradient |
| **Coloring** | Manual CSS | Manual CSS | Auto type-driven (color-mix) |
| **Dual-type support** | ❌ N/A | ❌ N/A | ✅ Primary + secondary gradient |
| **Mega forms** | ❌ N/A | ❌ N/A | ✅ Rainbow surface built-in |
| **Composability** | 5 subcomponents | 0 (DIY) | 9 subcomponents |
| **Copy-paste friendly** | ✅ Yes | ❌ Minimal | ✅ Yes (complete) |
| **Data coupling** | None | None | None (but shape-aware) |
| **Learning curve** | Shallow (generic) | Shallow | Moderate (Pokédex domain) |

**Verdict:** CompoDex Card is **shadcn-like composability + Pokédex domain knowledge**. The type gradient is not a wrapper hack — it's a first-class concern. A junior sees `type="water" secondary="flying"` and immediately understands the card is dual-typed with the correct visual.

---

### PokemonBadgeType vs shadcn Badge vs Radix Badge

| Aspect | shadcn Badge | Radix Badge | CompoDex BadgeType |
|--------|--------------|-------------|-------------------|
| **Semantic** | `<div>` | None | `<span>` (inline) |
| **Type catalog** | ❌ Manual | ❌ Manual | ✅ 21 types built-in |
| **Color system** | Manual + theme | Manual + theme | CSS vars (--color-type-*) + CVA |
| **Variants** | 2-3 (basic) | 0 | 4 (solid, soft, outline, ghost) |
| **Type-specific colors** | ❌ Generic | ❌ Generic | ✅ Fire=orange, Water=blue, etc. |
| **Usage** | `<Badge variant="outline">Label</Badge>` | DIY | `<PokemonBadgeType type="water">water</PokemonBadgeType>` |
| **Intent clarity** | Generic | Generic | **Pokédex-specific** |

**Verdict:** CompoDex BadgeType is a **drop-in replacement for generic badges in Pokédex UIs**. No manual color mapping. No "type" string → color lookup. The component owns the type color catalog.

---

### PokemonSprite vs Radix Avatar vs shadcn Avatar

| Aspect | Radix Avatar | shadcn Avatar | CompoDex Sprite |
|--------|--------------|---------------|-----------------|
| **Primitive** | Custom component | Radix Avatar wrapper | Radix Avatar (wrapped) |
| **Size scale** | 1 (fixed) | 5-6 sizes | **8 sizes** (xs, sm, md, lg, xl, 2xl, card) |
| **Composability** | Root + Image + Fallback | Root + Image + Fallback | Root + Image + Fallback + **Badge + Group** |
| **Group support** | ❌ Manual flex | ❌ Manual flex | ✅ `<PokemonSpriteGroup>` (overlapping) |
| **Count chip** | ❌ DIY | ❌ DIY | ✅ `<PokemonSpriteGroupCount>` |
| **For Pokédex** | Works, needs wrapping | Works, needs wrapping | **Built for Pokédex** |
| **Data coupling** | None | None | None |

**Verdict:** CompoDex Sprite adds **group semantics** (stack of Pokémon with +N counter). Radix Avatar is the base; CompoDex extends with Pokédex-specific patterns.

---

### PokemonStat vs recharts vs shadcn Progress

| Aspect | recharts | shadcn Progress | CompoDex Stat |
|--------|----------|-----------------|---------------|
| **Purpose** | Charts library | Progress bar | **Stat display** |
| **Stat colors** | Manual | Manual | ✅ 6 stats × built-in colors |
| **Per-stat label** | Manual | Manual | ✅ HP/Attack/Defense/etc. |
| **Composability** | N/A (chart) | Root + Indicator | Root + Label + Value + Bar + List |
| **Context pattern** | N/A | N/A | ✅ `usePokemonStat()` |
| **For bulk render** | Not ideal | Possible but verbose | ✅ `<PokemonStatList stats={...}>` |
| **Data shape** | Any | Any | Pokédex shape-aware |

**Verdict:** CompoDex Stat is a **context-driven abstraction** that knows 6 stat names, their labels, and their colors. Shadow of recharts (simple), cleaner than manual Progress composition.

---

### Pokedex (shell) vs shadcn Table vs Radix Table

| Aspect | shadcn Table | Radix Table | CompoDex Pokedex |
|--------|--------------|-------------|------------------|
| **Purpose** | Data table | Table primitive | **Pokédex shell** |
| **Search** | ❌ DIY | ❌ DIY | ✅ Built-in |
| **Filters** | ❌ DIY | ❌ DIY | ✅ Type, generation, legendary/mythical |
| **Pagination** | ❌ DIY | ❌ DIY | ✅ Built-in |
| **State mgmt** | ❌ DIY | ❌ DIY | ✅ Headless (controllable) |
| **Data-aware filtering** | Manual | Manual | ✅ Filter shape matches PokeAPI |
| **Composability** | Limited | Limited | ✅ Full (context-based) |

**Verdict:** CompoDex Pokedex is a **headless framework**, not a table. It owns search + filter + pagination **logic**. Visual layer is shadcn/ui (InputGroup, Button, Empty). The **unique value** is domain filtering (types, generations, legendary status).

---

## Part 2: Tier Architecture (Hybrid Model)

```
┌─────────────────────────────────────────────────────────┐
│ TIER 3: Utilities / Hooks                               │
│ (Transform PokeAPI → Component shapes)                  │
├─────────────────────────────────────────────────────────┤
│ • usePokemonCard(pokemonData)                           │
│ • usePokemonSprite(pokemonData)                         │
│ • usePokemonStat(pokemonData)                           │
│ • Transformers (sprite URL, type names, stats)         │
└─────────────────────────────────────────────────────────┘
                          ▲
                          │
┌─────────────────────────────────────────────────────────┐
│ TIER 2: Block Components (Ready-made patterns)         │
│ (Encapsulate PokeAPI calls + Tier 1)                   │
├─────────────────────────────────────────────────────────┤
│ • PokedexCard (with usePokemonByName)                  │
│ • PokedexShell (with usePokedex)                       │
│ • [Future] PokemonDetailPage (with full stats)        │
└─────────────────────────────────────────────────────────┘
                          ▲
                          │
┌─────────────────────────────────────────────────────────┐
│ TIER 1: Pure UI Components (100% presentational)       │
│ (No PokeAPI, no hooks, composable, copyable)           │
├─────────────────────────────────────────────────────────┤
│ • PokemonCard (+ 9 subcomponents)                       │
│ • PokemonBadgeType (+ variants)                         │
│ • PokemonSprite (+ group, count)                        │
│ • PokemonStat (+ label, value, bar, list)             │
│ • Badge type colors (exported consts)                   │
└─────────────────────────────────────────────────────────┘
```

### Tier 1: Pure UI (Primitives)

**What:** Presentational components with zero data fetching, zero framework assumptions.

**Props:** Expect simple scalars and Pokédex type strings (`type="water"`, `value=84`).

**Composability:** Subcomponents (PokemonCard.Header, PokemonCard.Media, etc.) assembled at call site.

**Installation:** Copy the entire file into your project. Modify freely.

**For npm future:** **These become the package exports.** Zero external deps beyond React + Tailwind.

| Component | Lines | Subcomponents | External | Custom |
|-----------|-------|---------------|----------|--------|
| PokemonCard | 252 | 9 (Header, Media, Overlay, Number, Title, etc.) | cn() | ✅ Type gradient |
| PokemonBadgeType | 199 | 2 (Badge, Group) | cva, Slot | ✅ 21 type colors |
| PokemonSprite | 152 | 6 (Root, Image, Fallback, Badge, Group, Count) | cn() | ✅ 8-size scale |
| PokemonStat | 292 | 5 (Root, Label, Value, Bar, List) + hook | cn(), Field, Progress | ✅ Context pattern |

---

### Tier 2: Blocks (Ready-made patterns)

**What:** Components that **own a specific PokeAPI task** (fetch one Pokémon, list with filters).

**Props:** Accept PokeAPI data types or hook results directly.

**Composability:** Built from Tier 1; relatively fixed (less customizable than Tier 1).

**Installation:** Copy the file; if you want variations, fork it (don't modify in-place).

**For npm future:** **Separate package or examples.** Not core primitives.

| Component | PokeAPI Calls | Tier 1 Used | Responsibility |
|-----------|--------------|-------------|-----------------|
| PokedexCard | `usePokemonByName`, `usePokemonSpeciesByName` | PokemonCard + BadgeType + Sprite | Fetch → transform → display |
| Pokedex | None (context-driven) | InputGroup, Button, Empty | Search + filter + pagination shell |

---

### Tier 3: Utilities / Hooks

**What:** Transformers that map PokeAPI responses → Tier 1 prop shapes.

**Exports:** Typed helper functions and constants.

**Installation:** Copy or import; use to reduce boilerplate in your own components.

**Examples:**

```ts
// Given PokeAPI pokemonData, extract sprite URL
const spriteUrl = pokemonData?.sprites?.other?.["official-artwork"]?.front_default;

// Given PokeAPI types, map to CompoDex shape
const types = pokemonData?.types?.map(t => t.type.name as PokemonBadgeType);

// Given PokeAPI stats, order and render
const stats = pokemonData?.stats
  ?.map(s => ({ stat: s.stat.name, value: s.base_stat }))
  .sort((a, b) => POKEMON_STAT_ORDER.indexOf(a.stat) - POKEMON_STAT_ORDER.indexOf(b.stat));
```

**Future:** Export as `@compodex/transformers` or include in the registry.

---

## Part 3: Data Shapes (JSDoc as Contract)

Every Tier 1 component exports a `Props` type that **documents the expected PokeAPI shape**.

### PokemonCard

```ts
type PokemonCardProps = {
  type?: PokemonBadgeType        // e.g. "water", from pokemonData.types[0].type.name
  secondary?: PokemonBadgeType   // e.g. "flying", from pokemonData.types[1]?.type.name
  isMega?: boolean               // Boolean(pokemonData.name?.includes("-mega"))
  // Plus standard HTML props
}
```

**Junior usage:**
```tsx
<PokemonCard
  type={types[0]}
  secondary={types[1]}
  isMega={pokemon.name.includes("-mega")}
>
  {/* children */}
</PokemonCard>
```

### PokemonBadgeType

```ts
type PokemonBadgeTypeProps = {
  type?: PokemonBadgeType  // e.g. "fire"
  variant?: "solid" | "soft" | "outline" | "ghost"
}
```

### PokemonSprite

```ts
type PokemonSpriteProps = {
  size?: "xs" | "sm" | "default" | "md" | "lg" | "xl" | "2xl" | "card"
  // Children: PokemonSpriteImage, PokemonSpriteFallback
}

// Usage:
<PokemonSprite size="card">
  <PokemonSpriteImage src={pokemonData.sprites.front_default} />
  <PokemonSpriteFallback>{pokemon.name[0]}</PokemonSpriteFallback>
</PokemonSprite>
```

### PokemonStat

```ts
type PokemonStatProps = {
  stat?: "hp" | "attack" | "defense" | "special-attack" | "special-defense" | "speed"
  value: number                        // From pokemonData.stats[i].base_stat
  max?: number                         // Defaults to 255 (Blissey's HP)
  label?: string                       // Auto-filled from stat name
  color?: string                       // Auto-filled per-stat color
}

// Bulk usage:
<PokemonStatList stats={pokemonData.stats}>
  {(entry) => (
    <PokemonStat {...entry}>
      <PokemonStatLabel />
      <PokemonStatBar />
    </PokemonStat>
  )}
</PokemonStatList>
```

---

## Part 4: Documentation Strategy

### For each Tier 1 component: `[Component].stories.tsx`

```tsx
// Show PokeAPI shape + component props together
export const Default = {
  args: {
    type: "water",
    secondary: "flying",
    isMega: false,
  },
  decorators: [
    (Story) => (
      <div className="grid gap-4">
        <Story />
        <pre className="text-xs">
{`
PokeAPI shape:
{
  types: [
    { type: { name: "water" } },
    { type: { name: "flying" } }
  ],
  name: "gyarados"
}
`}
        </pre>
      </div>
    ),
  ],
};
```

**Outcome:** Junior sees the Storybook, copies the component, reads the JSDoc, wires up their PokeAPI call, done in 10 minutes.

---

## Part 5: Road to NPM (Primitives-First)

### Milestone 0: Copiable Tier 1 (NOW)

- ✅ Each Tier 1 component is self-contained, copyable, modifiable.
- ✅ Zero external Pokédex dependencies (only React, Tailwind, clsx, CVA).
- ✅ JSDoc shape contracts documented.
- ✅ Storybook demos for each component.
- ❌ Not on npm (copy-paste model, shadcn-style).

### Milestone 1: NPM Package (3-6 months)

**Package:** `@compodex/primitives`

**Exports:**
```ts
// Components
export { PokemonCard, ... } from './components/pokemon-card'
export { PokemonBadgeType, ... } from './components/badge-type'
// Types
export type { PokemonBadgeType, PokemonStatName } from './types'
// Constants
export { POKEMON_TYPE_COLOR, POKEMON_STAT_MAX, ... } from './constants'
```

**Build:** TypeScript → ESM + CJS + types.d.ts

**Bundle size:** ~20KB minified (Tier 1 only, no Tier 2/3 helpers).

**Dependencies:** None (react is peer).

**Rationale:** Users can **import directly** OR **copy-paste**. Choice is theirs.

---

## Part 6: What's NOT in CompoDex

- ❌ Data fetching (that's PokeAPI's job, use `pokenode-ts` or `axios`).
- ❌ State management (use React Context or Zustand).
- ❌ Animations beyond Tailwind (no Framer Motion on Tier 1).
- ❌ Generic component wrappers (badges, cards, progress bars are shadcn, not ours).
- ❌ Full-page layouts (Pokedex shell exists, but juniors assemble the rest).

---

## Part 7: Assignment for Juniors

**Build a Pokédex app in 2-3 hours:**

1. Copy `PokemonCard`, `PokemonBadgeType`, `PokemonSprite`, `PokemonStat` into your project.
2. Wire up `pokenode-ts` to fetch data.
3. Assemble: `<PokemonCard>` with subcomponents (Header, Media, Content).
4. Use `Pokedex` shell for search + filter + pagination state.
5. Style with Tailwind. Modify components as needed.

**Result:** A working Pokédex in fewer lines than starting from zero.

---

## Conclusion

**CompoDex is:**
- ✅ Pokédex-specialized (type gradients, stat colors, group patterns).
- ✅ Copy-paste friendly (shadcn model).
- ✅ Data-agnostic (connect any PokeAPI wrapper).
- ✅ Composable (Tier 1 subcomponents, Tier 2 patterns, Tier 3 helpers).
- ✅ NPM-ready (primitives are self-contained).

**For your portfolio:**
- Demonstrate domain-specific design (Pokédex knowledge embedded, not generic).
- Show strong composition patterns (context, render props, CVA).
- Prove copy-paste quality (code juniors can modify confidently).
- Build toward a primitives npm package (credible library trajectory).

**By Q1 2027:** If adoption and quality metrics are good, push to npm as `@compodex/primitives` with zero breaking changes. Copy-paste users opt-in; npm users get semantic versioning.

