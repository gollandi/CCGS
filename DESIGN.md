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

## Current direction — transparent membrane, 21 October 2026

The repeated supplied image remains the compositional and material reference: warm pale ground, transparent material crossing space, restrained light and spare sans-serif information. The owner explicitly approved the effect over the restaurant photograph, then requested only better placement of the object portals. Preserve the effect; placement and overall completion remain under review.

### Material and interaction

The full-screen shader samples the same locally stored venue photograph before and after refraction. Two continuous boundaries pass out of frame without meeting; no central crease or closed pointed silhouette remains. A radial Gaussian indentation follows the contact point in aspect-corrected coordinates. Its gradient offsets the image sample locally, while nearby boundaries bend gently. Distant material stays still. Press/drag deforms; release relaxes; dragging wine does not open it. Tap and Enter open the complete wine story. The old OpticalWord component is retained unused; no isolated “Not” is mounted.

Rendering remains demand-driven with a finite three-second entrance. Paused, reduced-motion and renderer-failure views retain a static SVG and venue image. Essential text is semantic HTML, not part of the shader texture. This does not claim arbitrary DOM refraction or physical simulation.

### Portal placement

The three secondary objects follow the lower material curve, ordered chef, dogs, neighbourhood. Desktop centres: 36%/53%, 60%/66%, 83%/75% of the experience. Mobile centres: 23%/49%, 53%/63%, 81%/72%. The exploration instruction occupies the quiet upper-left area; it no longer overlaps the leaf. The wine-reading edge navigation remains available.

### Reading and facts

Each story includes a locally stored, credited image: dining room, Steven Connolly, Chelsea Dog Day, or a contextual neighbourhood map. Pictures are not presented as photographs of this future dinner. Internal story scrolling protects the fixed essentials on small screens. All active typography remains Manrope, sans-serif. The date line explicitly includes 19:00. RSVP asks for a reply in the Consultants WhatsApp chat, without a link or submission simulation.

### Evidence

See docs/MEMBRANE-REVIEW.md. The owner approved the membrane effect, not every subsequent layout choice. Chrome responsive tests and emulated touch are not physical iPhone testing. Earlier fold and broken-line documents are historical records. Photo provenance and hashes are in public/images/chelsea/manifest.json; the complete research selection bank is docs/CURIOSITY-CATALOGUE.md.

## Two information layers — owner update, 21 October 2026

A quiet direct-navigation row now supplies The chef, The restaurant, Getting there and Current menu. These are ordinary explicit controls, separate from the artistic discovery objects. The menu points to the official `/menus/` page, not a dated PDF. Getting there has the contextual map and Google Maps links for the exact venue address, walking and public transport. No origin, location permission or journey duration is inferred.

The six curiosity records carry their catalogue IDs in data, not visible numbering: 1 (wine), 10 (happy kitchen), 14 (open grill), 6 (seasonal pie), 13 (dog welcome), 33 (2019 food review). Six direct object portals now expose all six readings, with slightly stronger colour and opacity and two rows of three on mobile. Opening a story clears the objects from the reading area. Practical navigation remains available. Closing restores focus to the originating practical control or object, including every selected curiosity.

On mobile, practical text and route/source links precede the image; discovery photography retains its editorial position. The approved shader, fallback and photograph treatment are unchanged in this update. Labels and hit areas fit 320px; internal scrolling preserves the dinner facts below. See docs/INFORMATION-LAYERS-REVIEW.md.

## RSVP and guest register — 21 October 2026

**The Practical Continuity Rule.** RSVP and the private guest register extend the invitation's Manrope, warm paper, ink and copper into clear forms and ruled rows. Preserve the approved invitation and membrane; these task surfaces introduce no new visual world.

The pages use normal document flow within a centred container (maximum 1240px), with flat, square-edged controls and no added shadows. RSVP pairs the event details and existing dining-room photograph with the form from 900px; below that width the content stacks and the photograph is hidden to keep the form close to the details. Name fields and guest rows expand into columns from 650px. Page headings use Manrope at weight 400 (clamp 38px–64px), while labelled inputs use 16px text and a minimum 48px height. The ink primary action has paper text, a minimum 52px height and a copper hover state. Text actions retain a minimum 44px height; keyboard focus stays visibly copper.

The RSVP form asks for first name, surname and optional dietary requirements. Entering dietary details reveals the required permission checkbox beside its explanation. Saving disables the fields and primary action; failures appear as text alerts. The confirmation replaces the form only after a successful API response and offers the calendar download and return to the invitation. The Consultants WhatsApp chat remains the help and correction route, superseding the earlier WhatsApp-only RSVP description above.

The organiser view uses a sign-in form, confirmed and dietary counts, search and status filters, then separated guest rows with explicit cancellation/restoration actions. Loading, empty, no-match, error and duplicate-name states use plain text. Names and dietary details belong only in this private view, never in public specimens or the invitation.

OBSERVED in `src/app/guests/guests.css`, `src/app/rsvp/page.tsx`, `src/components/rsvp-form.tsx` and `src/components/guest-manager.tsx`. This source record makes no deployment, browser-acceptance or physical-device claim; operational boundaries remain in `docs/RSVP-OPERATIONS.md`.
