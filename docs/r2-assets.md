# R2 media release

- Bucket: `media`
- Project prefix: `templates/seed-lifecycle/releases/630f0ebbe7097b45`
- Public base URL: `https://cdn.promptedsite.com/templates/seed-lifecycle/releases/630f0ebbe7097b45`
- Manifest: `src/config/assets.json`
- Files: 18
- Total bytes: 6,768,136

Structure:

```text
branding/
decoders/basis/
fonts/
textures/ash/
textures/soil/1k/
textures/soil/2k/
textures/trees/
```

Every object was checked by CDN download, SHA-256, Content-Type, and CORS. Runtime URLs are patched reproducibly with `npm run assets:patch`. Upload credentials are read only from an explicit external environment file by `scripts/assets-r2.mjs`; they never enter the browser bundle or Git history.

## Preview fallback

Some hosted AI artifact panels block third-party CDN requests even when R2 CORS is correct. A byte-identical fallback package is published as the GitHub Release [`artifact-assets-630f0ebbe7097b45`](https://github.com/gilbertstevenson16-code/Seed-Lifecycle/releases/tag/artifact-assets-630f0ebbe7097b45).

- Archive: `seed-lifecycle-assets-630f0ebbe7097b45.zip`
- SHA-256: `c2111860d3f9b9fe9116e7704e1ea353260eb3e6ad933913d27ff4b42852ac2e`
- Purpose: companion files for sandboxed preview artifacts only

The fallback is not part of Git history and does not replace the canonical R2 release.

The organized local administration copy is outside the repository at `/Users/mahezadaud/projects/.promptedsite-assets/template-03`.
