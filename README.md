# CCGS Annual Autumn Event

An interactive invitation for 4 November 2026, 19:00, No. Fifty Cheyne, Chelsea. Consultant only.

## Run locally

```sh
pnpm install --frozen-lockfile
pnpm dev --hostname 0.0.0.0 --port 3216
```

Production preview: `pnpm build` then `pnpm start --hostname 0.0.0.0 --port 3216`. Open http://127.0.0.1:3216 on the host Mac.

## Current revision

A restrained sans serif invitation, a procedural translucent light field and four objects revealing sourced stories about wine, the executive chef, dogs and an unlikely neighbour. Touch or drag an object, or use Tab and Enter/Space. Escape or the return control closes the story. The pause control selects still artwork. System reduced motion and rendering failures retain a static fallback. Calendar export is functional; RSVP response collection is not configured.

- [Product and current owner direction](PRODUCT.md)
- [Built design system](DESIGN.md)
- [Sourced discoveries and research limits](docs/DISCOVERIES.md)
- [Current validation](docs/V2-REVIEW.md)
- [Reference asset manifest](public/references/manifest.json)
- [Graphics dependencies](docs/GRAPHICS-STACK.md)

The owner rejected the original M1. Its historical review is retained, clearly marked, and does not establish creative acceptance of either version. The latest mockup attachment matches the existing subtractive-direction asset byte for byte; its role is conceptual, never literal reproduction.

## Check

`pnpm typecheck`, `pnpm test`, `pnpm build`. Browser evidence is separate from physical-device and public-deployment verification.
