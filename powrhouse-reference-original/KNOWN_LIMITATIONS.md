# Known Limitations

- The central plant is intentionally stylized as procedural cut paper, not a photoreal botanical 3D model. That choice follows the supplied reference more accurately than glossy real-time product rendering would.
- The game uses 2D Canvas rather than Three.js/WebGPU. This preserves the collage art direction, fast phone performance and no-build deployment while still delivering a complete playable finale.
- Physical Safari, Firefox and Android hardware were not available inside the build container. The code includes standards-based fallbacks and responsive layouts, but final device sign-off should still be performed on the target hardware before a paid commercial launch.
- The retailer scene is illustrative. No live inventory, map API, age-verified checkout, CMS or dispensary integration is included.
- Flavor cards from the supplied reference are concept content and may not match PowrHouse's current retail menu.
- Audio is procedural and intentionally minimal. It starts only after user interaction and can be muted.
