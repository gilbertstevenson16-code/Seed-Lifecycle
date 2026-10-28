# Product form draft

## Form fields

**Template name**  
Seed Lifecycle — Interactive WebGL Story

**URL slug**  
`seed-lifecycle-webgl-story`

**Category**  
Templates

**Access**  
Premium

**Tags (comma separated)**  
`webgl, 3d, react, typescript, interactive, scroll animation, storytelling, creative development, responsive, premium template`

**Tech stack (comma separated)**  
`React, TypeScript, Vite, WebGL2, GLSL, KTX2, Basis Universal, Playwright, Cloudflare R2`

## Product files

**Demo video**  
Recommended filename: `seed-lifecycle-demo.mp4`. Record desktop at 1440 × 900 for 20–30 seconds, showing the loader, seed entry, several chapter transitions, scroll interaction, and one mobile cut. Keep the final MP4 below 32 MB.

**Cover image**  
Recommended filename: `seed-lifecycle-cover.png`. Use a clean 16:10 frame from the seed or early-growth scene, without browser chrome or debug UI.

**Prompt (Markdown)**  
Upload or paste the complete contents of [`PROMPT.md`](../PROMPT.md). Do not use the migration prompt here: the product already contains the finished source, so the customer-facing prompt must require a user-visible interactive preview, then validate and customize that source. A build report or remote sandbox localhost URL does not satisfy the prompt.

**Source code ZIP**  
Recommended filename: `seed-lifecycle-source-v1.0.0.zip`. Include the repository source at tag `template-v1.0.0`; exclude `.git`, `node_modules`, `dist`, local validation captures, credentials, and media binaries. The runtime retrieves canonical media from R2, while the prompt documents the GitHub Release fallback for restricted browser panels.

## Showcase placement

- Homepage wall: enabled
- Gallery before login: enabled

Both placements are appropriate because the template has a strong visual cover and the prompt/source package can produce a working preview without requiring private credentials.

## Prompt strategy

Use one canonical prompt for Claude, GPT, and coding agents. The prompt branches based on available capabilities:

- attached product source is always preferred;
- terminal agents install, build, test, and expose the Vite preview;
- browser artifacts import the same source and package release assets locally only if CSP blocks R2;
- environments with neither source access nor release access must report the exact restriction instead of approximating the site.

This keeps the result consistent across AI products while avoiding separate prompts that drift from one another.
