# Graphics foundation

Selected on 20 October 2026 against the approved creative direction. This records the original foundation selection. M1 has since been implemented; see `docs/M1-REVIEW.md` for its behaviour, evidence and remaining limits.

## Installed tools and purpose

| Library | Intended contribution |
| --- | --- |
| Three.js + React Three Fiber | A custom deformable membrane, camera, lighting and interaction in React. Use the stable WebGL renderer for the initial iPhone implementation. |
| Drei | Transmission material, render textures and scene helpers. `MeshTransmissionMaterial` is a starting point for refraction, not a substitute for an original form. |
| GSAP + its React integration | Deliberate entrance, touch, discovery, dismiss and return timelines with lifecycle cleanup. One animation owner per property. |
| Use Gesture | Pointer and touch input with drag intent, cancellation and controlled bounds. |
| Maath | Frame-rate-independent damping for the membrane's response and return. |
| Postprocessing + its React integration | Selective light and colour refinement. Add effects only where the composition benefits; keep text outside the effects pipeline. |
| Next.js + React + TypeScript | App Router foundation, server-rendered event details and a typed client scene. |

Exact versions are pinned in `package.json`; `pnpm-lock.yaml` records the resolved dependency graph. The initial install uses React 19 with React Three Fiber 9 and checks peer dependencies strictly. Three.js 0.186.1 is within Postprocessing's declared supported range.

## How to use the foundation

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm build
pnpm start
```

Use Node 22 or later and the pnpm version recorded in `packageManager`. The current page is the M1 invitation, with server-rendered event details and a dynamically loaded Three.js / React Three Fiber scene. GSAP orchestrates the discovery entrance. The other installed graphics helpers remain available for justified refinements; they are not automatically loaded into the page. No live RSVP is configured.

## Implementation decisions for M1

- Develop the approved static composition first, then mount a dynamically loaded client scene. Essential text must survive loading errors, unavailable WebGL and disabled JavaScript.
- Keep event text and controls in semantic HTML above the canvas. Ensure keyboard access and focus return for discoveries.
- Shape a bespoke membrane with geometry and shader deformation. Do not substitute a stock sphere, orbit, torus, atom or floating card collection.
- Use the approved flyer for visual lineage and the subtractive reference for composition. Reference images are concept art, not verified venue photography. Do not turn a complete text-bearing mockup into a texture behind duplicate live text.
- Refractive effects can require extra render passes. Start with controlled resolution and samples, cap pixel density, and use a simpler material where necessary. Verify actual iPhone Safari before declaring it supported.
- Honour reduced motion, pause work when hidden and provide a useful static fallback after context loss. Input must change the object's state and reveal real content; movement alone is not the experience.
- Do not attach gesture suppression to the whole document. Preserve essential controls, browser zoom and accessibility. Fit the intended composition to the viewport without clipping enlarged text.
- Additional animation frameworks, scroll engines, physics engines and component kits are not needed for this brief. Introduce another dependency only for a concrete requirement.
- M1 still requires one sourced discovery, interaction paths, browser evidence and creative approval before M2.

## Primary documentation

- [React Three Fiber compatibility and installation](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [Drei transmission material](https://drei.docs.pmnd.rs/shaders/mesh-transmission-material)
- [GSAP in React](https://gsap.com/resources/React/)
- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
- [Use Gesture](https://use-gesture.netlify.app/docs/)
- [Maath](https://github.com/pmndrs/maath)
- [React Three Postprocessing](https://react-postprocessing.docs.pmnd.rs/)

Package licence metadata was checked at selection: MIT for the core libraries and helpers, Zlib for Postprocessing, and GSAP's standard no-charge licence for GSAP and its React integration. No paid assets, subscriptions or services were purchased.

## Validation recorded on 20 October 2026

- `pnpm build`: production build and static page generation passed.
- `pnpm typecheck`: passed.
- All nine graphics package entry points imported successfully and exposed the expected API symbols. This checks package loading, not browser rendering or shader output.
- `pnpm audit --prod --audit-level high`: reported no known vulnerabilities at the time of checking.
- Production server: HTTP 200 with the essential event details in the initial HTML.
- The four reference image checksums remain unchanged.
- This section records the earlier foundation checks. Subsequent browser rendering and interaction checks are recorded in `docs/M1-REVIEW.md`; physical iPhone Safari validation remains outstanding.
