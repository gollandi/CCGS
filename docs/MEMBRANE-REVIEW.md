# Membrane and portal review — 21 October 2026

## Owner direction

The owner requested a transparent locally deformable membrane, photographic discoveries, visible dinner time, and RSVP by reply in the Consultants WhatsApp chat. After seeing the restaurant background and refraction, the owner explicitly said they liked the effect and asked only for better portal placement. This is approval of the effect, not final acceptance of the portal layout or the whole application.

The final placement change preserves the material. Chef, dogs and neighbourhood follow the lower curve in reading order, with independently specified mobile positions. The instruction sits above the photograph and no longer overlaps the leaf.

## Observed implementation

- Actual venue image sampled behind the membrane; a contact-centred displacement changes the transmitted image locally. Continuous open boundaries; no centre crease or first-contact word reveal.
- Dragging wine explores without opening; tap or Enter opens the story. Escape returns to the invitation and restores focus.
- Three photographs and a contextual map shown with credits. Asset sources, SHA-256 hashes and processing recorded in `public/images/chelsea/manifest.json`.
- Date explicitly includes **4 November 2026 · 19:00**. RSVP text asks for a reply in the Consultants WhatsApp chat. No WhatsApp link or message is sent.
- All active text uses Manrope, sans-serif. One viewport for invitation essentials; stories scroll internally when needed.
- `docs/CURIOSITY-CATALOGUE.md` contains 34 candidates with source keys, dated evidence and exclusions. It is separate from the four-story experience.

## Verification observed in this revision

- `pnpm typecheck`, `pnpm test`: successful; seven existing gesture/score tests pass. These tests alone do not establish visual quality or new touch behaviour.
- `pnpm build`: production build succeeds.
- Chrome responsive views inspected at 1440×900, 390×844 and 320×568. At 320px, the open story ends at y=396 and event details start at y=425.7; no horizontal overflow.
- Emulated touch start and move visibly deform the image locally. Touch release after a drag leaves the story hidden. The retired optical word is absent from the DOM. A subsequent tap opens wine.
- All four routes open and their image elements report loaded with nonzero intrinsic width. Keyboard Enter, Escape and pause/resume exercised. Pause reports the still renderer and retains the SVG fallback.
- HTTP readback of all four local images matches the manifest hashes: restaurant 359,220 bytes; chef 70,459; Dog Day 127,296; map 334,604.
- Existing in-app preview reloaded at `http://127.0.0.1:3216/`.

## Limits

Physical iPhone testing and all-device reliability are unverified. Responsive Chrome and emulated touch are not device acceptance. The shader refracts its photograph, not arbitrary page DOM. Historical stories and sample menus do not confirm dinner arrangements. Image sources are recorded; no open licence is inferred. No public deployment or remote push was performed in this revision.

## Saved visual evidence

Saved in this chat’s `outputs/` directory:

- `ccgs-membrane-desktop.jpg`
- `ccgs-membrane-mobile.jpg`
- `ccgs-membrane-touch.jpg`
- `ccgs-membrane-mobile-story.jpg`
- `CCGS-curiosity-catalogue.md`

Earlier fold and line reviews remain historical evidence.
