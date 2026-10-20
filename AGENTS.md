# Codex project instructions

## Read before implementation

1. `docs/CREATIVE-DIRECTION.md` — approved direction and rejected paths.
2. `docs/CODEX-HANDOFF.md` — scope, milestones and approval boundary.
3. `docs/CONTENT.md` — event copy, unresolved RSVP and fact-check queue.
4. `public/references/README.md` and `public/references/manifest.json` — visual references, provenance and usage limits.

## Preserve the approved concept

- Keep the approved flyer family and the evolved translucent membrane direction. Improve contrast and hierarchy; do not redesign the concept or copy superseded text from historical images.
- One viewport, touch-first, no page scrolling. Essential information must be immediately readable, including before animation or JavaScript loads.
- Use the event copy in the documents. No guest count, family headline, atom, globe, dashboard cards or patient stories as decoration.
- Treat all reference PNGs as concept artwork, not real venue photography. Do not treat pictured menus or incidental labels as verified facts.
- Do not regenerate missing references or claim inaccessible assets are present. Check the manifest and actual files.
- Implement M1 first; obtain creative approval before M2, as required by the existing handoff. Never simulate an RSVP submission while its destination is unconfigured.
- Use British English for code, comments, documentation and interface copy. Source each discovery before publication.

## Current repository state

The repository contains the brief, four verified reference images and a Next.js/React/TypeScript foundation with the graphics stack installed. Read `docs/GRAPHICS-STACK.md` for package responsibilities and commands. Use pnpm and preserve its lockfile. M1 now includes a custom WebGL membrane, a semantic event layout, one sourced discovery, gesture and keyboard controls, and static artwork. Read `docs/M1-REVIEW.md` for validation and remaining limits. M1 awaits creative approval before M2; a local preview is not a public deployment or an actual iPhone Safari test.
