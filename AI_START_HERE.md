# AI start here

This is the maintained source for the Seed Lifecycle template. Do not reconstruct it from screenshots and do not replace the WebGL scene with an approximation.

1. Run `npm ci`.
2. Read `README.md`, `src/components/experience/`, and `docs/r2-assets.md`.
3. Run `npm run typecheck`, `npm run lint`, and `npm run build` before making changes.
4. Start the site with `npm run dev -- --host 127.0.0.1 --port 3140`.
5. Use `?plant=4242` when deterministic screenshots are needed.
6. Preserve the React component boundaries and the 17-chapter keyboard-accessible navigation.
7. Preserve R2 URLs and the media manifest. Never add media binaries or credentials to the repository.
8. Do not add analytics, iframes, proxies, `dangerouslySetInnerHTML`, or external trackers.

The WebGL renderer is isolated under `public/_/` because it was recovered from the authorized production build. Treat those modules as rendering internals. User-facing markup, loading/error states, metadata, and runtime initialization belong in `src/`.

The private R2 administration environment is outside this repository. Never request or commit it. `npm run assets:verify` is public and needs no credentials.

## Sandboxed browser preview

Try the R2 release first. If the preview panel blocks `cdn.promptedsite.com`, do not approximate the scene and do not ask the user to upload assets. Download the checksum-verified fallback package from the repository's [asset release](https://github.com/gilbertstevenson16-code/Seed-Lifecycle/releases/tag/artifact-assets-630f0ebbe7097b45). Its SHA-256 is `c2111860d3f9b9fe9116e7704e1ea353260eb3e6ad933913d27ff4b42852ac2e`.

Extract that package as companion files inside the preview artifact and map the manifest paths to relative URLs. This is a preview-only packaging adjustment: do not change components, shaders, interactions, chapter data, or the canonical R2 configuration, and do not commit the extracted binaries.
