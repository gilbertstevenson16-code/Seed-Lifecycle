# Seed Lifecycle — universal AI build and preview prompt

You are continuing an existing, authorized React + TypeScript project named **Seed Lifecycle**. Your primary deliverable is a real, interactive, user-visible preview of the project. A text report, internal localhost address, filesystem path, screenshot, or statement that the build succeeded is not a preview. Run and present the real project faithfully, then apply only the customizations explicitly requested by the user. Do not recreate the design from screenshots and do not substitute the WebGL scene with an approximation.

## Authoritative sources

Use the first source available in this order:

1. The source project or ZIP attached to this conversation/product.
2. The tagged repository source: `https://github.com/gilbertstevenson16-code/Seed-Lifecycle.git`, tag `template-v1.0.1`.
3. The repository's `main` branch only when the tag is unavailable.

After obtaining the source, read `AI_START_HERE.md`, `README.md`, and `docs/r2-assets.md` before changing anything. Existing source files are authoritative. Do not regenerate components, CSS, shaders, chapter data, or interactions from visual inference.

## Detect the environment and choose the workflow automatically

Before doing implementation work, determine which capability is available:

- **Local coding agent:** terminal and browser run on the user's computer.
- **Remote coding agent:** terminal runs remotely and supports port forwarding or a preview URL.
- **Browser artifact environment:** the AI can create and attach an interactive Artifact/Preview but its localhost is not visible to the user.

Do not ask the user to choose a workflow when the environment can be detected from available tools.

### Local or remote coding agent

1. Use the attached source when present. Otherwise clone the repository and check out `template-v1.0.1`.
2. Run `npm ci`.
3. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
4. Start the site with `npm run dev -- --host 0.0.0.0 --port 3140`.
5. If local, open the page in the available browser and provide the working local URL. If remote, expose/forward port 3140 and provide the externally reachable preview URL. An internal `127.0.0.1` URL from a remote sandbox is not a valid deliverable.
6. Open `/?plant=4242` for deterministic inspection.
7. Run `npm test` when Chromium is available. Run `npm run assets:verify` when the environment permits outbound access to the R2 CDN.

### Browser artifact or preview environment

1. Import the attached source or the tagged GitHub source; do not rewrite it as a single-file mockup.
2. Try the canonical R2 assets first.
3. If the panel blocks `cdn.promptedsite.com`, download this fallback package yourself—do not ask the user to upload a ZIP:
   `https://github.com/gilbertstevenson16-code/Seed-Lifecycle/releases/download/artifact-assets-630f0ebbe7097b45/seed-lifecycle-assets-630f0ebbe7097b45.zip`
4. Verify the archive SHA-256:
   `c2111860d3f9b9fe9116e7704e1ea353260eb3e6ad933913d27ff4b42852ac2e`
5. Extract the archive as companion files inside the artifact and map the manifest paths to relative URLs. Keep this as preview-only packaging; do not commit the binaries or replace the canonical R2 configuration.
6. Build or package the project using the environment's native Artifact/Preview system. If a dev-server port cannot be exposed, serve the production build through the Artifact's own file/preview mechanism instead of returning an internal localhost address.
7. Open the result inside the visible Artifact/Preview panel. Verify that the user-facing panel—not merely an internal browser session—shows the loader or entry gate.
8. Preserve WebGL2, KTX2/Basis decoding, fonts, shaders, the entry gate, all 17 chapters, responsive behavior, and keyboard navigation.

The browser workflow is incomplete until an interactive preview is visibly attached to the conversation. Do not stop after creating a scratchpad copy, starting an internal server, taking screenshots, or describing successful checks.

If the environment cannot access either the tagged source or the fallback release, report the exact blocked URL and restriction. If the environment has no Artifact/Preview capability and cannot expose a port, explicitly state that this environment cannot satisfy the preview deliverable. Do not claim success and do not fabricate a partial visual substitute.

## Implementation rules

- Keep user-facing markup, state, metadata, and lifecycle code in `src/`.
- Treat `public/_/` as isolated rendering internals. Do not prettify, rename, or broadly rewrite those modules unless the user's requested change truly requires it.
- Preserve the component boundaries in `src/components/experience/`.
- Preserve the immutable asset mapping in `src/config/assets.json`.
- Never request, expose, or commit R2 credentials, tokens, cookies, `.env` files, or private endpoints.
- Do not add an iframe, proxy, `dangerouslySetInnerHTML`, analytics, trackers, base64 media bundles, placeholder models, or replacement textures.
- Keep event listener, timer, animation-frame, and WebGL cleanup correct.
- Do not remove accessibility behavior: pointer/touch entry, Space/Enter entry, silent entry, PageUp/PageDown chapter navigation, progress semantics, reduced motion, and the WebGL fallback.
- Do not claim a check passed unless you actually ran it.

## Customization behavior

First make the unchanged project run successfully. If the user supplied a customization brief, apply it after the baseline works. Prefer changing React components, chapter configuration, metadata, and maintainable styles. Preserve the renderer and media pipeline unless the request explicitly concerns them.

If no customization brief was supplied, present the faithful interactive preview and stop; do not invent redesigns. “Present” means the preview is visible to the user in an Artifact/Preview panel or reachable through a valid local/forwarded URL.

## Mandatory preview acceptance check

Before writing the completion report, confirm all of the following:

- the user can open or already see the preview;
- the preview is interactive, not a screenshot or video;
- the entry gate is visible and **Continue in silence** enters the experience;
- chapter 01 renders after entry;
- scrolling or PageDown advances to another chapter;
- no required asset request is unresolved;
- the preview URL is not an unreachable localhost belonging to a remote sandbox.

If any item fails, continue working on the preview. Do not return a success report.

## Required completion report

Only after the mandatory preview acceptance check passes, report:

- which source was used (attached source, tag, or `main`);
- whether the preview used canonical R2 URLs or the GitHub Release fallback;
- commands and checks actually completed;
- desktop and mobile behavior inspected;
- any exact environment restriction that remains;
- files changed, or explicitly state that no files were changed;
- the visible Artifact/Preview attachment or the exact reachable preview URL.

Success means the real Seed Lifecycle project is running with its original WebGL experience and assets—not a screenshot, video-only substitute, simplified remake, or guessed approximation.
