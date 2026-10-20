# CCGS — Annual Autumn Event 2026

Creative source of truth: [Creative direction](docs/CREATIVE-DIRECTION.md).

Codex implementation: [Handoff](docs/CODEX-HANDOFF.md).

Content and fact checking: [Content](docs/CONTENT.md).

Visual references are stored directly in [public/references/](public/references/README.md), with a [provenance and integrity manifest](public/references/manifest.json). No separate download is required. The experience is single-viewport, touch-first, non-scrolling, with a living translucent form and immediately readable event details.

Codex starts with [AGENTS.md](AGENTS.md), then the creative direction, handoff and content documents. The repository includes the brief, reference assets and an executable foundation. M1 is implemented and ready for creative review. See [M1 review](docs/M1-REVIEW.md) for interaction behaviour and validation. See [Graphics stack](docs/GRAPHICS-STACK.md) for the selected libraries and implementation guidance.

## Local development

Use Node 22 or later and pnpm 11.3.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Validation: `pnpm test`, `pnpm typecheck` and `pnpm build`. Event details remain in server-rendered HTML. Run `pnpm start --hostname 0.0.0.0 --port 3216` after building to preview on this Mac and, where network settings permit, a phone on the same local network.
