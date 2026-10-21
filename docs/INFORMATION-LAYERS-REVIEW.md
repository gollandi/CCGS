# Two information layers — 21 October 2026

## Implemented owner request

Direct practical navigation: executive chef Steven Connolly and his cooking philosophy; restaurant overview and setting; location/map plus walking and public transport directions; current menu linking to the official https://fiftycheyne.com/menus/ page.

The separate discovery layer contains exactly catalogue entries **10, 14, 6, 1, 13, 33**. Six visible objects provide six direct readings: wine glass → wine (1); flame → happy kitchen (10); grill → open grill (14); collar → dog welcome (13); leaf → seasonal pie (6); flower → historical menu (33). No selected curiosity requires opening another story first. The 2019 dishes are explicitly historical, not current offerings. The former wombat and chef-origin stories remain in the research catalogue, not the live selection.

The approved membrane shader, fallback and background-photograph effect are unchanged. Direct controls remain visible while reading; object controls clear the reading area. Closing restores focus to the originating navigation item or object. On mobile, practical text and directions precede the image. Dinner date/time and WhatsApp reply instruction remain separate from the internally scrolling story.

## Observed validation

- `pnpm typecheck`: passed before build.
- `pnpm test`: ten tests passed, including exact six-item selection, complete portal reachability, separation of practical information, official menu URL and address/mode checks for map links.
- `pnpm build`: passed after the final narrow-screen adjustments.
- Chrome UI: opened all three practical routes and all six curiosity routes. Browser readback yielded catalogue IDs 1, 10, 14, 13, 6, 33. Menu link readback is the current official page.
- Responsive inspection: 1440×900, 390×844 and 320×568. At 320px there is no horizontal overflow; practical controls occupy x=20…300 with 44px height. In the open location view, navigation ends at y=174, story starts at y=185 and ends at y=396, event details start at y=425.7. Map and both direction actions remain available.
- Escape closes the practical story and returns focus to Getting there. Active typography remains Manrope, sans-serif.
- Google Maps links encode the confirmed venue address. No origin, live journey duration or location permission is assumed. Route-provider interaction and physical iPhone testing are not claimed.

Saved screenshots in this chat's outputs: `ccgs-information-mobile.jpg`, `ccgs-information-location-mobile.jpg`, `ccgs-information-desktop.jpg`. No remote push, merge or public deployment in this update.

## Direct discoveries and portrait correction

The owner requested all selected curiosities to be more visible on the membrane. Each now has its own object, with modestly stronger saturation, opacity and caption colour. Mobile uses two rows of three. The existing large wine touch surface still supports local membrane deformation; the visible glass gives its story a clear entry point. No shader or photographic-material change was made.

The chef image now keeps its original 1024:598 ratio with `object-fit: contain`, preserving the entire portrait in practical and discovery views. Browser inspection confirmed this on mobile and desktop.

Observed follow-up checks: all six direct story openings yielded catalogue IDs 1, 10, 13, 6, 14 and 33; the wine route was tested by clicking the visible glass. Layouts were inspected at 390×844, 320×568 and 1440×900, with no horizontal overflow at 320px. Ten tests pass, including six distinct single-story portals; production build passes. The local preview was restarted and refreshed. Physical-device testing remains unverified.

Additional saved evidence: `ccgs-six-discoveries-mobile.jpg`, `ccgs-six-discoveries-desktop.jpg`, `ccgs-chef-portrait-mobile.jpg`, `ccgs-chef-portrait-desktop.jpg` in this chat's outputs directory.
