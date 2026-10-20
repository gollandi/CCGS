---
name: CCGS Annual Autumn Event
description: Warm paper, translucent light and four object-led discoveries.
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

**Creative North Star: "Light, tension and discovery"**

The implemented invitation uses warm paper, dark sans serif text and a translucent field of light. Four individually authored SVG objects provide the entry points to sourced stories; restrained text controls leave the objects visible as the principal interaction.

This is the replacement for the rejected serif, rigid bow and wedding concept. The supplied reference contributes conceptual transparency, light and tension only. The current build has not received human creative approval; delight is an intended effect, not an established result.

**Key Characteristics:**
- Warm paper with copper accents and dark text.
- One locally hosted sans serif family, with weight carrying hierarchy.
- Procedural light behind distinct glass, flame, dog-tag ring and leaf objects.
- Persistent event information with one discovery shown at a time.

**Evidence status — OBSERVED in source, 20 October 2026:** extracted from `src/app/globals.css`, `src/app/page.tsx`, `src/components/experience.tsx`, `src/components/membrane-scene.tsx` and `src/components/story-objects.tsx`. Read with `cat` and `tail`; the output contains the tokens, components and responsive overrides described below. This document records implementation, not a new browser validation. `PRODUCT.md` and the latest owner correction define the constraints. The exploratory seed `ae3891cc` is overridden by the user's pinned brief and delegated construction; it is not visual authority.

## Colors

Copper is the single interface accent, used for the monogram dot, focus outline and active discovery underline. Paper is the page ground; ink carries essential information, muted carries supporting text, line separates the RSVP popover, and popover supplies its slightly lighter ground.

The SVG artwork has its own glass, wine, fire and metal gradients. Those are authored materials within each object, not interchangeable interface accents. The procedural membrane mixes warm highlights, copper rims and a subtle wine tint when the wine story is selected. The background has low-opacity radial light and an SVG noise texture.

**The Legible Ground Rule.** Event text sits on the paper ground; the light field must not become the reading surface for essential information.

## Typography

Manrope is declared locally at `/fonts/manrope-variable.ttf`, with weights 200–800 and `font-display: swap`; the fallback is sans serif. The file and `public/fonts/manrope-OFL.txt` are present. Historical serif and DM Sans files remain in the assets directory but are not referenced by the current stylesheet.

The event title pairs a light first line with a medium second line. Story headings use intermediate weight, tight tracking and balanced wrapping. Story prose is limited to 43 characters on desktop and 48 on mobile. The frontmatter records the desktop roles, not every responsive override. At mobile widths the final CSS cascade uses 13px story prose, dropping to 12px in compact-height mode; ancillary copy is smaller. These implemented sizes are not an accessibility certification.

## Layout

The normal composition occupies one small-viewport-height canvas. The wordmark sits above the title, the object field occupies the centre and right, and date, venue and calendar controls anchor the lower edge. Desktop positions are absolute; the event detail group becomes a two-column grid on mobile. The implementation has minimum canvas heights, so a strict no-scroll claim cannot cover every browser, zoom or viewport.

Mobile treatment begins at 760px. Compact mobile height (750px or less) reduces the title to one line while a story is open, hides the invitation line and reserves more room for reading. The selected object is secondary to story text and disappears in tighter layouts. Other source breakpoints handle 360px width, desktop heights up to 760px, and landscape heights up to 500px.

**The Reading Escape Rule.** A story may scroll internally when its content exceeds the available height. At widths of 300px or less, the whole invitation deliberately reflows into normal document flow and may scroll. These are accessibility escape routes, not failures to preserve the ordinary single-viewport composition.

The story region has `tabIndex=0`, thin scrollbars and contained overscroll. No claim is made here about physical iPhone testing, every device, every text scale or assistive-technology combinations.

## Elevation & Depth

Depth comes primarily from the transparent shader layers, drawn reflections, SVG gradients and small object shadows. The membrane is a procedural full-screen plane shader with three curved bands and local pointer interference; it is not a cloth simulation or refraction of a real restaurant photograph. Pointer location and energy alter the nearby wave and band displacement. Pointer coordinates are normalised to the light-field bounds. Static screenshots cannot establish the quality of this dynamic response.

Objects use a low-opacity drop shadow; the RSVP explanation has a light box shadow and border. The source values are recorded in the sidecar. Interface controls otherwise remain flat, with no raised card system.

## Shapes

The object vocabulary comprises a wine glass, a flame above a small holder, a ring with a paw-print dog tag, and an autumn leaf. Each is authored inline SVG with unique gradient identifiers. The dog-tag ring is not a wedding narrative. Pointer input changes object paths or group transforms; each silhouette retains its own material response.

Text controls use fine underlines and open spacing. The implemented controls do not establish a rounded-container scale; no radius scale is invented here.

## Components

### Object discoveries

Four real buttons reveal four sourced stories: Wine, Chef, Dogs and Neighbours. Hover, press and drag affect the relevant object; a reveal recogniser distinguishes completion from cancellation. Opening a story hides the other objects, dims the light field and moves the selected object aside. A visited discovery replaces its plus mark with a dash. Captions and accessible labels describe the discovery without requiring a drag.

### Story and navigation

One in-place, labelled region contains a Back button, heading, body, contextual aside, source links and a four-item text switcher. It is not a modal dialog. Opening it moves focus to Back; Escape or Back closes it and restores focus to the originating object. Source links open separately, and the current switcher item has a copper underline. Source provenance and editorial limits live in `docs/DISCOVERIES.md`; these venue stories do not promise the event menu, wines or pet arrangements.

### Event actions

“Keep the evening” is an underlined calendar download with a small arrow that shifts on hover. “RSVP details” is a native disclosure whose popover explains that a response is not yet collected. No RSVP success or submission state exists. The masthead wordmark links home.

### Motion and fallback

The pause control has an implemented 44px square target. Its final positioning keeps it at the top right of the desktop experience, below the idle mobile field, and above the mobile story. It is omitted when the operating system already requests reduced motion and hidden in the narrow open-story layout. Reduced motion or manual pause stops the object animation and removes the WebGL scene, retaining static membrane artwork. Hidden-tab state stops the frame loop; rendering uses a capped pixel ratio and low-power preference. Errors or context loss retain the static fallback.

Ordinary object transitions use the source's soft deceleration curve; slow material loops differ for wine, flame, tag and leaf. Story entry uses a short opacity and vertical transition. Essential event copy is server-rendered, and a no-script discovery list preserves text and sources. Those are implemented fallbacks, not proof of universal compatibility.

## Do's and Don'ts

### Do:
- Do preserve the current owner correction over historical mockup or M1 instructions.
- Do keep essential event information available before JavaScript and animation.
- Do retain source links and the boundaries recorded in docs/DISCOVERIES.md.
- Do preserve reduced-motion, fallback, focus restoration and readable overflow routes.

### Don't:
- Don't reintroduce serif type, the rigid decorative bow or the wedding story.
- Don't reproduce the reference composition literally or describe concept art as venue photography.
- Don't turn the object field into a dashboard of cards or pills.
- Don't describe calendar export as RSVP, or local implementation as human approval or all-device certification.
