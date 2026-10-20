# Replacement invitation — validation, 20 October 2026

This replaces the owner-rejected M1. It is a local implementation for creative review, not a public deployment or human approval.

## Implemented

- Manrope sans serif throughout. No serif is loaded by the page; old licensed font files remain unused.
- Authored wine, flame, dog-tag ring and leaf SVG objects. Pointer input changes wine surface curves, flame/core paths, leaf tip and veins, and ring radii, in addition to secondary transforms. A WebGL light membrane unfurls and deforms near the actual pointer coordinates.
- Four sourced stories with primary links: wine, current executive chef/seasonal pie, dogs/Chelsea Dog Day, Rossetti’s household. See DISCOVERIES.md for claims and limits. Google and Reddit were searched; irrelevant wedding recommendations were excluded.
- Click, completed drag, Enter and Space reveal stories; Escape and Back close them. Focus moves to Back and returns to the originating object. Visible captions are included in accessible labels.
- Pause removes the canvas and material loops while preserving the stories. System reduced motion and scene error/context-loss paths retain static artwork. Essential information and no-script stories are server-rendered.
- Working calendar download with the confirmed start and location. RSVP explicitly remains unconfigured.
- Compact stories scroll internally; event information stays visible. At extreme widths below 300px the page may reflow and scroll, rather than clip inaccessible text.

## Observed checks

- `pnpm build`: production compilation, type checking and static generation passed after the final fixes.
- `pnpm typecheck`: passed. `pnpm test`: 5 existing gesture helper tests passed. The reveal path uses the tested completion/cancellation recogniser; legacy coordinate helper tests do not establish material rendering quality.
- `git diff --check`: clean before commit. Impeccable mechanical detector returned `[]` on the changed UI targets; this does not measure creativity.
- All 20 story-by-viewport combinations at 1440×900, 390×844, 375×667, 320×568 and 844×390 showed no page scrolling and no story/date overlap in Chromium. Every story exposed its source links.
- Actual browser drag opened wine. Enter/Space opened a story. Escape returned focus. Explicit pause produced `renderer: still`, zero canvas elements and working keyboard discovery; resume restored animation.
- Smallest viewport: the chef story ends at y396 and practical information starts at y425.7. Keyboard End moved internal scroll to 50px, exposing navigation at y387.8 while the page remained at scrollY0.
- A pause/calendar overlap discovered during functional testing was corrected; actual browser click then changed Pause to Resume and removed the canvas.
- Browser error log: no errors during final checks.
- Invitation and calendar URLs returned HTTP 200. Calendar CRLF, line folding, start time and absence of an invented end time checked. No calendar-app import was performed.
- All four original reference PNGs retain their manifest checksums. The newly reattached mockup is byte-identical to the existing subtractive reference; no duplicate or invented image was added.
- The already-open Codex browser was reloaded and visibly showed the replacement invitation.

## Limits

Chromium viewport checks are not physical touchscreen or iPhone Safari tests. Actual text enlargement/browser zoom, automatic OS reduced-motion switching, forced context loss and physical-phone network access remain unverified. Semantic fallbacks were checked in source/server output, not in a JavaScript-disabled browser. The independent reviewer used source and screenshots; runtime interaction measurements above were performed by the implementation agent. Visual wonder and creative acceptance belong to JJ’s review.

## Preview

The local production preview is at http://127.0.0.1:3216. Start again with `pnpm build` followed by `pnpm start --hostname 0.0.0.0 --port 3216`.

## Independent final verdict

**Final disposition: ready for JJ’s design review.** Source-and-screenshot review; runtime interaction results were supplied by the implementing agent. The installed skill’s referenced shipped reviewer files were absent, so an independently spawned reviewer performed the equivalent pass. This is not human creative approval.

| Previous finding | Status | Final evidence / limit |
| --- | --- | --- |
| Compact story overlaps event details | Resolved | Final 320px screenshots separate reading from date/address; body is 12px. |
| Mostly whole-object transforms | Resolved in implementation | Wine, flame and leaf paths deform; collar radii respond. Perceived sophistication needs viewing the motion. |
| Pointer deformation offset | Resolved | Coordinates use actual light-field bounds. |
| Accessible names omit visible captions | Resolved | Object and switcher names retain visible phrases. |
| Small reading-control hit areas | Resolved within reviewed scope | Explicit minimum heights; motion control 44×44px. |
| Incomplete reveal screenshots | Resolved | Settled desktop and mobile captures show source links and navigation. |
| Compact navigation at scroll end | Resolved | Fresh confirmation image visibly shows Wine, Chef, Dogs and Neighbours within the reading region, separated from event details. |
| Missing discovery documentation | Resolved | DISCOVERIES.md contains evidence, boundaries and excluded Reddit material. |
| Text enlargement / zoom | Untested, not an observed defect | Internal scroll and narrow reflow exist; actual text enlargement and Safari remain untested. |
| RSVP availability | Explicitly outstanding | Organiser destination is absent and disclosed. |

Reviewer’s visual judgement: the result reads as a restrained invitation with exploratory stories. Illustrations remain illustrative rather than photoreal; the collar may initially resemble jewellery. Those are matters for JJ’s creative review, not verified aesthetic success.
