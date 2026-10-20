---
name: CCGS Annual Autumn Event
description: A finite wine-refraction event within the preserved CCGS invitation.
colors:
  copper: "#916242"
  paper: "#eeebe5"
  ink: "#302d2b"
  muted: "#6c625b"
  line: "#c8bdb0"
  popover: "#f8f5ef"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(38px, 4.7vw, 72px)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(26px, 2.8vw, 43px)"
    fontWeight: 450
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  wine-headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(30px, 3.4vw, 52px)"
    fontWeight: 400
    lineHeight: 1.07
    letterSpacing: "-0.04em"
  story-body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    lineHeight: 1.8
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "11px"
spacing:
  page: "clamp(24px, 4.2vw, 72px)"
  mobile-page: "25px"
  narrow-page: "20px"
components:
  calendar-link:
    textColor: "{colors.ink}"
    padding: "9px 0"
  back-button:
    textColor: "{colors.muted}"
    padding: "8px 0"
  story-source:
    textColor: "{colors.ink}"
    padding: "4px 0"
  story-switch:
    textColor: "{colors.muted}"
    padding: "8px 0"
  story-switch-current:
    textColor: "{colors.ink}"
  motion-control:
    textColor: "{colors.muted}"
    width: "44px"
    height: "44px"
---

# Design System: CCGS Annual Autumn Event

## Overview

**Creative North Star: "An optical event, then stillness"**

The invitation preserves V2’s warm paper, dark Manrope typography, essential event information and four sourced narrative identities. The wine entry is now an optical event: a fine line is refracted while one persistent visible word rotates and skews, then travels and scales into its exact heading slot as an asymmetrical reading space opens. The other three SVG anchors move to the edge during this discovery.

The latest owner brief asks for evolution of the surviving V2, not another redesign. This branch implements one vertical slice. Quietness and consequential interaction replace continuous material decoration. The build is not human-approved, and artistic surprise is an intention requiring review rather than a proven property.

**Key Characteristics:**

- Warm paper and restrained dark text, with the established copper interface accent.
- Locally drawn line textures, a persistent DOM word and a shader lens.
- A finite opening followed by stillness; new frames respond to interaction or state changes.
- Wine reading space with displaced typography; three preserved discoveries remain accessible.

**OBSERVED in source, 20 October 2026:** `git branch --show-current` returned `feat/refraction-art-slice`. Reads of `src/app/globals.css`, `src/app/page.tsx`, `src/components/experience.tsx`, `src/components/membrane-scene.tsx`, `src/components/membrane-fallback.tsx`, `src/components/optical-word.tsx` and `src/lib/refraction.ts` contain the values and behaviours described here. This extraction does not perform a new browser test. Safari desktop and Chrome responsive observations are documented separately in `docs/REFRACTION-REVIEW.md`; physical iPhone testing and universal compatibility remain unverified. Current owner instructions override historical M1/replacement wording and the exploratory seed `ae3891cc`.

## Colors

Copper retains its interface role in the monogram, focus outline and active switcher underline. Paper is the ground; ink carries essential information, muted carries supporting copy, line separates the RSVP explanation, and popover supplies that explanation's lighter surface.

The final stylesheet replaces the earlier radial background with flat paper and reduces the noise overlay opacity. The optical plate uses fine warm-grey lines; the separate DOM word begins in muted wine and settles into ink in the heading. These artwork-local colours do not establish a new application palette. The three remaining SVG objects are desaturated at rest and gain definition on hover or keyboard focus. Their original gradients remain in their SVG source; the wine-glass SVG is no longer mounted in the wine entry.

**The Legible Ground Rule.** Essential event text stays on the paper ground and remains independent of the optical texture.

## Typography

Manrope is local at `/fonts/manrope-variable.ttf`, with declared weights 200–800 and `font-display: swap`. No external font service is required. Historical font files are not evidence of their use in the current stylesheet.

The event heading retains its light/medium contrast and now includes a separate year. The former invitation supporting line is absent from the current page. The wine title separates “Not the ladies” and “who lunch.” spatially: the second line aligns right and uses weight 550. Its body is inset on desktop and returns to the left on mobile. Other story headings retain the V2 hierarchy. Frontmatter records desktop baselines; the stylesheet contains the responsive overrides.

Wine prose is limited to 40ch and its aside to 44ch. Standard wine prose is 14px on desktop and 13px on mobile, with 12px compact-mobile and short-desktop variants and an 11px short-landscape variant. These are observed sizes, not accessibility certification. The optical word is a persistent DOM span in Manrope, independently transformed through authored rotation and skew. The shader refracts line textures only. On opening, the visible word travels to the measured position and height of the heading’s “lunch.” slot; at rest the travelling span hides and the semantic heading word becomes visible. This handoff lets the reading region scroll normally. The decorative travelling span is aria-hidden. No explanatory subtitle remains in the optical plate.

## Layout

The ordinary composition remains a single small-viewport-height invitation, with the wordmark/title above and the date, venue and event actions below. The artwork occupies the centre/right on desktop and the space between title and details on mobile. The wine button is a transparent optical target over the lens, not a drawn glass. Its prompt appears on hover or keyboard focus; there is no idle exploration instruction or visible plus/dash marker.

Opening wine enlarges the lens circumference, fades its texture and reveals a reading composition across the artwork area. The other three anchors remain interactive at its right edge. The wine title uses offset lines and the prose has a different left edge; the wine state has no four-item switcher. Selecting one of the remaining anchors opens its retained story route, which still uses the earlier story composition and text switcher.

Mobile treatment begins at 760px. Compact mobile height, 360px width, short desktop and short landscape have additional rules. The title compacts while reading; the separately displayed year is hidden in the compact open-story title, while the full date below still contains 2026.

**The Reading Escape Rule.** Compact and mobile stories may scroll internally. At widths of 300px or less the invitation deliberately reflows and may scroll as a document. These preserve reading access outside the ordinary one-viewport composition.

The wine region uses visible overflow on ordinary desktop and internal overflow on mobile/short viewports. The shared region is keyboard-focusable and scroll position resets on a story change. Minimum canvas heights and responsive exceptions preclude a blanket no-scroll or all-device claim.

## Elevation & Depth

A transparent plane shader samples two locally drawn canvas textures containing the same fine parallel lines. Within the lens it rotates, compresses and offsets texture coordinates, adds a mirrored line echo and draws a fine optical circumference. Pointer position is normalised to the actual light-field bounds. The shader has no three-band membrane, photograph sampling, cloth simulation or floating ribbon.

Wine opening changes the lens centre and radius while fading the line texture; the persistent word travels into the HTML reading composition. This combines shader refraction of lines with DOM rotation, skew and measured travel of the word; it does not refract arbitrary document content. The final object filter is desaturation rather than the earlier object drop shadow. The RSVP explanation retains its small box shadow and border. Static screenshots alone cannot prove the dynamic quality or consequence of the transformation.

## Shapes

The wine shape is an optical discontinuity with an invisible, elliptical button target. The visible lens is rendered by the shader; the CSS target's roundness is not a general container radius. The other authored SVG shapes remain a flame, paw-print dog-tag ring and leaf. The dog-tag ring retains the Dogs narrative. Their pointer-driven path/group changes survive, but their perpetual idle animations are disabled by final CSS overrides.

Text controls retain fine underlines and open spacing. No card or rounded-container scale is introduced.

## Components

### Wine refraction

The wine entry remains a real labelled button. Focus or hover energises the lens; a deliberate pointer displacement increases intent after a small dead zone. Tap/click and keyboard activation can open it without requiring a drag. Cancellation and lost capture reset the interaction. When open, its own button is hidden and the other three anchors move outward; the source link and contextual wine-selection disclaimer remain visible within the reading region.

### Other discoveries and reading access

Chef, Dogs and Neighbours keep their sourced narratives, SVG anchors and prior reading routes. They are preserved functionality, not three additional completed artistic slices. A labelled region contains Back, heading, prose, aside and source links. Wine omits the text switcher; other discoveries retain it. Entry focuses Back; Escape or Back restores focus to the originating button. Source links open separately. No modal focus trap is introduced.

`docs/DISCOVERIES.md` remains the source register. The sample wine list does not promise the event's wine. The chef's menu detail is not the event menu; pet arrangements are unconfirmed; Rossetti's number 16 is distinct from the venue at number 50. This documentation update does not recheck those external sources.

### Event actions

“Keep the evening” downloads the calendar entry. “RSVP details” remains a native disclosure explaining that no response is collected. Neither the artwork nor calendar action invents a submission endpoint. The wordmark links home; the footer preserves the collective celebration line.

### Finite motion and static routes

The opening score is zero through 0.5 seconds, rises to its inversion at 1.5 seconds, and settles to a fixed trace by 3 seconds. These are accumulated active renderer seconds after textures load, with delta capped at 0.05 seconds; they are not a guarantee of wall-clock timing from navigation on every device. The shader score is per mounted scene, so remounting after manual pause can replay it. The word has its own once-per-component opening choreography and therefore a separate lifecycle.

Rendering uses `frameloop="demand"`. Frames are invalidated during the opening, input interpolation and open/close convergence; the loop stops requesting further frames when those settle. Hidden-document state prevents active progression. Hover/focus, pointer input and story changes can wake the scene. There is no perpetual shader clock or visible material loop.

The first wine title line enters over 0.95s. The existing word travels/scales into its destination over 1.2s; “who” fades in over 0.6s after a 0.6s delay. Body, aside and sources reveal through clipped masks. A GSAP context reverts these transient story-entry styles on cleanup, including when pause changes the motion state, so interrupted masks do not remain. Reduced motion makes word placement immediate and skips entry choreography. The other stories retain their shorter entry. Resize remeasures the word destination and positions it immediately. Existing object position transitions remain; the slice does not impose one animation on every object.

Reduced motion or manual pause unmounts the WebGL scene and keeps a static SVG line and lens alongside the DOM word. The fallback has no duplicate text and is hidden in the open wine state. Context loss or component failure retains the line/lens fallback; unsupported WebGL alone does not disable the separate DOM word choreography. The pause/resume button has a 44px square target and is omitted under the system reduced-motion preference or hidden in the narrow open-story layout. Event content is server-rendered; the no-script route preserves all story text and source links through native disclosures. Those fallbacks preserve access without claiming to reproduce the interactive optical effect.

## Do's and Don'ts

### Do:

- Do preserve V2’s working content and access while refining the single wine slice.
- Do keep essential event information available before JavaScript and animation.
- Do retain source links and the boundaries recorded in docs/DISCOVERIES.md.
- Do preserve reduced-motion, static fallback, focus restoration and readable overflow routes.
- Do keep work on feat/refraction-art-slice and require review before merging into main or expanding the treatment.

### Don't:

- Don't restore floating ribbons or perpetual decorative material loops.
- Don't reintroduce serif type, the rigid bow or the wedding story.
- Don't reproduce the reference literally or describe concept art as venue photography.
- Don't turn discoveries into dashboard cards or disguise calendar export as RSVP.
- Don't equate source extraction, screenshots or browser checks with creative approval or physical iPhone certification.
