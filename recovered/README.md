# Archivos recuperados del historial (iteración vieja del proyecto)

Antes de la reinicialización con plantilla shadcn nueva (commit `6b486d0`,
13-abr-2026), el proyecto tenía otra iteración completa. Esto recupera el
**pico** de esa iteración (commit `cd58d05`) que NO existe en `main` hoy.

> Solo para revisión/comparación. NO está cableado al proyecto y está excluido
> del build en `tsconfig.json` ("exclude": ["recovered"]). Fusiona a mano lo útil.

## Contenido (recovered/old-iteration/, rutas originales preservadas)

- `components/` — marketing viejo (hero, features, faq, why-this-kit, core-building,
  how-works, site-header, cli-installer, manual-steps, logo), sistema de
  **examples/preview** (example*.tsx, file-tabs, usage-code), code-block, docs-sidebar.
- `components/compo-dex/pokemon-image.tsx` — PokemonImage/PokemonSprite/PokemonFallback original.
- `app/(compo-dex)/docs/` + `content/docs/components/` — sistema de docs viejo
  (component-docs.ts, components.ts, register.tsx, MDX + demos de pokemon-image).
- `utils/shiki/`, `styles/shiki.css`, `utils/copy.ts`, `lib/copy.ts`, `lib/source-code.ts`
  — OJO: la rama `development/code-block-shiki-scroll-area-copy` ya re-hace shiki/code-block/copy.
- `registry.json`, `public/r/*` — registro viejo (ya reconstruido y actualizado en la raíz del proyecto).
- `next.config.ts`, `pnpm-workspace.yaml`, `mdx.d.ts` — config vieja (referencia).

## Equivalentes actuales en main (no recuperar a ciegas)
- Docs viejo  -> reemplazado por el sistema MDX en `content/docs/*.mdx` + `app/(www)/docs/`.
- Marketing   -> versiones nuevas ya integradas / recuperadas en components/layout, components/ui.
- pokemon-image -> hoy es `components/compodex/ui/pokemon-sprite.tsx`.

Origen navegable: commit `cd58d05` (pico viejo) y `56dd56f` (donde se montó el registro).

## recovered/dangling-theme-routes/ (commit colgado 19959957 — "theme UX", nunca mergeado)

Trabajo que quedó en un commit suelto sin rama. Casi todo está superado:
- `app/(main)/*` — rutas viejas (también en wip/local-progress; main usa el grupo (www)).
- `components/ui/{layout,main}.tsx` — reorg ya presente en wip/local-progress.
- `components/ui/header.tsx` — **único genuinamente nuevo**: primitivos Header/HeaderContainer.

Nota: `lib/theme-view-transition.ts` de ese commit YA está en main (no se recupera).
