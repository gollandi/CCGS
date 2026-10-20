# M1 — creative review

Status: implemented locally and ready for creative review. M2 is not started. No public deployment or creative approval is claimed.

## What is implemented

- A single-viewport invitation derived from the approved flyer: warm ivory, amber light, the CONSULTANT ONLY stamp, high-contrast event details and the approved closing line.
- A bespoke WebGL ribbon whose geometry deforms with the pointer. Its shader samples the lower, text-free portion of the original flyer artwork; it does not claim to depict the real venue. The original PNG is unchanged.
- Subtle idle motion, direct deformation during a pull, a discovery transition, dismissal and return to the starting state. A deliberate drag or a tap opens the same discovery. No hovering is required.
- One sourced historical discovery about the venue's April 2021 wedding-licence announcement. The source link is available in the panel. See `docs/CONTENT.md` and `src/lib/discovery.ts`.
- Enter and Space open the discovery. Escape and “Back to the evening” close it. Focus moves into the panel and returns to the trigger after closing.
- Still artwork can be selected explicitly. The system's reduced-motion preference selects the same static path without creating a WebGL canvas. The story remains interactive in this mode.
- Initial event details and a static SVG artwork are server-rendered. A native HTML discovery is supplied inside `noscript`; event details and native RSVP disclosure do not depend on JavaScript.
- Failed scene loading or a lost WebGL context returns to static artwork. Hidden documents stop the render loop. Geometry resolution and pixel density are bounded.
- RSVP opens an honest explanation that response collection is not configured. No response is transmitted or simulated.
- Fonts are served locally. Their OFL notices are in `public/fonts/`.

## Observed validation — 20 October 2026

- `pnpm build`: production build and static generation passed.
- `pnpm typecheck`: passed.
- `pnpm test`: five tests passed, covering accidental movement, deliberate multi-direction pulls, cancellation, bounds and coordinate direction.
- Production preview returned HTTP 200. Essential event details, static artwork and the no-JavaScript discovery are present in the returned HTML.
- Chromium: actual drag opened the discovery; click, Enter and Space also worked. Escape and the return button restored the idle state and trigger focus.
- Explicit still mode removed the WebGL canvas and retained keyboard discovery and dismissal.
- All of the following viewport checks passed: no document scrolling, no discovery overlap with the title or practical details, source link present, focus moved to return and restored after Escape.

| Viewport | Context |
| --- | --- |
| 1440 × 900 | Desktop |
| 390 × 844 | Phone portrait |
| 375 × 667 | Compact phone portrait |
| 320 × 568 | Small phone portrait |
| 844 × 390 | Phone landscape |

- Browser error log contained no errors during final checks. A Three.js Clock deprecation warning from the React Three Fiber dependency was observed; it did not prevent rendering.
- All four reference images retain their manifest checksums.

## Limits and next review

These are Chromium viewport checks, not a physical touchscreen or iPhone Safari certification. A native Safari check could not proceed because the Mac was locked. System reduced-motion emulation and forced GPU context-loss testing were unavailable through the browser-control interface; the explicit static mode was tested, but those automatic triggers still need device validation. The no-JavaScript fallback was checked in the server HTML, not in a JavaScript-disabled browser session.

Use M1 for creative review: visual family, hierarchy, the membrane's character and the discovery transition. Actual iPhone Safari, browser zoom / larger accessibility text, device performance and context-loss recovery still require validation. Do not expand to M2 until the owner approves this milestone.

## Preview

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start --hostname 0.0.0.0 --port 3216
```

Open `http://localhost:3216` on the Mac. On a phone on the same local network, use the Mac's current LAN address and port 3216. The local loopback preview was verified with HTTP 200. A request to the Mac's LAN address returned an empty response during this session, so access from a separate phone is not confirmed. Network access must be resolved before claiming a physical-phone preview. This preview is not hosted publicly.
