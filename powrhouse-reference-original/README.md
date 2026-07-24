# PowrHouse — Cultivate. Validate. Showcase.

A new, original, code-built interactive campaign website created from the supplied PowrHouse collage reference. It does **not** reuse the previous agent's website or payload.

## Experience

- 21+ age gate
- Scroll-driven nine-part narrative
- Procedural SVG paper-cut cannabis cola
- Illustrated grow room, validation cards, combustion test, flavor rail, storefront and map
- Responsive desktop, tablet and phone layouts
- Reduced-motion support
- Procedural Web Audio with mute controls
- Fully playable fixed-screen arcade finale
- Keyboard, touch and one-thumb mobile controls
- Five waves, four enemy archetypes, boss, score, combo, health, weapon modes, pause, restart and local best score
- Static ending for visitors who skip gameplay

## Run locally

The simplest method:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

The project has no package manager, build step or server-side dependency.

## Files

The hosted GitHub version uses `index.html` as a small verified loader and stores the fresh standalone build in three compressed text payloads. This is solely to work within the connected GitHub uploader's text-size limits.

The downloadable source package contains the normal editable project:

- `index.html` — semantic page structure and inline SVG definitions
- `styles.css` — layout, collage art direction, responsive behavior and accessibility states
- `app.js` — procedural art, interactions, audio and arcade game
- `standalone.html` — one-file version for direct preview
- `CREATIVE_DIRECTION.md` — concept and section specification
- `SOURCE_LEDGER.md` — factual sourcing and creative interpretation notes
- `QA_REPORT.md` — completed review passes and test matrix
- `KNOWN_LIMITATIONS.md` — honest limitations

## Controls

Desktop:

- Move: WASD or Arrow keys
- Fire: Space; automatic baseline fire is enabled
- Switch cultivation system: Q / E
- White Ash Protocol: C
- Pause: P or Escape

Mobile:

- Drag in the left movement zone
- Automatic fire
- Switch button
- White Ash button

## Deployment

This is a static site. Upload the editable source folder unchanged to GitHub Pages, Netlify, Cloudflare Pages, Vercel static hosting or any ordinary HTTP server.
