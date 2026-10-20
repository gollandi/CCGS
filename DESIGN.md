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

## Current direction — a single transparent fold

The owner found the broken ray too literal and reintroduced the supplied image as a material reference, asking for a more minimal version and reiterating “non serif”. This revision restores one transparent folded surface. The image supplies translucency, light and tension only. Manrope remains the sole active family. Earlier line and refraction review files are historical; see `docs/FOLD-REVIEW.md`.

Warm paper, Manrope, event details, three other discoveries, sources, RSVP explanation and calendar export remain. This is refinement of the surviving V2, not a new visual world. The printed flyer is atmospheric ancestry only. No serif type.

## Artwork and interaction

The idle wine field contains one broad transparent face with a fine perimeter, an internal crease and restrained reflected light. It extends beyond its artwork frame rather than closing into a leaf or circle. A custom shader computes its upper/lower edges, fold, shading and highlights analytically. It contains no photograph or image texture. Pointer intention changes the fold locally, with different deformation amplitudes for its edges, rather than translating the entire object as a rigid unit. Opening the story fades the surface to keep the reading ground clear.

The finite opening score anticipates for 0.5 seconds, peaks at 1.5 seconds and settles by 3 active renderer seconds. This is not a certified wall-clock startup budget. On-demand rendering ceases after convergence. New interaction wakes the scene. Pause can remount and replay the shader score.

A first tap/click or keyboard activation reveals a small “Not” at the fold while keeping the story closed. A screen-reader status announces the second activation. Hover can preview the word; deliberate pulls retain the existing reveal threshold. A second activation carries “Not” into the exact first-word slot of the heading. At rest, the semantic heading takes over so text scrolling behaves normally. Escape cancels the first-contact state or closes the story and restores focus. The first-contact state resets when a different discovery opens.

The travelling word is 24px on desktop and 22px on mobile, regular weight, and invisible at idle. It is decorative/aria-hidden; the semantic heading retains its complete accessible name. Its journey lasts 1.1 seconds with authored acceleration and deceleration. It has no independent idle choreography. Reduced motion places it immediately. Resize recalculates its destination.

## Reading and typography

The wine heading is smaller than the rejected version: clamp(27px, 2.6vw, 38px) on desktop, 28px on mobile and 24px on narrow screens. Both lines use regular weight; the second is slightly indented rather than right-aligned. The source and factual boundaries remain unchanged. Prose is 14px desktop, 13px mobile, with inherited compact variants. It is inset on desktop and aligned left on mobile.

The other story routes retain their prior typography and navigation. Only the wine event is being developed further. No assertion of artistic acceptance is made.

## Layout, control and fallbacks

Essential information remains independent of the artwork in one ordinary viewport. The central wine target is a transparent rectangular button, at least 100px tall, over the fold. Its redundant visible instruction is removed; its accessible name remains. The remaining three anchors stay at the edge during wine reading. No new modal, card or navigation menu is introduced.

Small reading regions scroll internally. At extreme widths the inherited accessibility reflow permits document scrolling. These are deliberate reading escapes, not a universal no-scroll claim.

Reduced motion, pause or renderer failure keeps an SVG folded-surface approximation. The fallback is hidden during wine reading. No duplicate word appears in the fallback. GSAP context cleanup restores content when interrupted. The 44px pause control and keyboard routes remain. Server-rendered facts and the no-script story disclosures remain available.

Calendar export is not RSVP. The RSVP disclosure accurately states that no response is collected. Original assets and source provenance remain untouched. Local browser testing is not physical iPhone certification or creative approval.
