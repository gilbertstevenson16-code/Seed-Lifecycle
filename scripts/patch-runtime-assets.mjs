import fs from 'node:fs/promises';

const manifest = JSON.parse(await fs.readFile('src/config/assets.json', 'utf8'));
const versioned = (path) => `${manifest.baseUrl}/${path}?v=${manifest.release}`;

const runtimePath = 'public/_/Ht9OtKgI.js';
let runtime = await fs.readFile(runtimePath, 'utf8');
const replacements = {
  '/_/CYqRJ20K.ktx2': versioned('textures/ash/albedo.ktx2'),
  '/_/DQeYoibJ.ktx2': versioned('textures/ash/arm.ktx2'),
  '/_/OClkCGt-.ktx2': versioned('textures/ash/normal.ktx2'),
  '/_/CNXPcU_l.ktx2': versioned('textures/soil/1k/albedo.ktx2'),
  '/_/NLFM7BSr.ktx2': versioned('textures/soil/1k/arm.ktx2'),
  '/_/COsrGiKp.ktx2': versioned('textures/soil/1k/normal.ktx2'),
  '/_/C8khoYW9.ktx2': versioned('textures/soil/2k/albedo.ktx2'),
  '/_/BM6NaMMk.ktx2': versioned('textures/soil/2k/arm.ktx2'),
  '/_/DN_mHK3W.ktx2': versioned('textures/soil/2k/normal.ktx2'),
  '/_/LnDGH9GY.ktx2': versioned('textures/trees/fir-albedo.ktx2'),
  '/_/DZxeZQcn.ktx2': versioned('textures/trees/fir-normal.ktx2'),
};

for (const [from, to] of Object.entries(replacements)) {
  if (runtime.includes(from)) runtime = runtime.replaceAll(from, to);
  else if (!runtime.includes(to)) throw new Error(`Runtime asset reference missing: ${from}`);
}
await fs.writeFile(runtimePath, runtime);

const localTranscoder = "setTranscoderPath']('/basis/')";
const remoteTranscoder = `setTranscoderPath']('${manifest.baseUrl}/decoders/basis/')`;
if (runtime.includes(localTranscoder)) {
  runtime = runtime.replace(localTranscoder, remoteTranscoder);
  await fs.writeFile(runtimePath, runtime);
} else if (!runtime.includes(remoteTranscoder)) {
  throw new Error('Basis transcoder path was not recognized.');
}

const decoderRuntimePath = 'public/_/DDJP6AVa.js';
let decoderRuntime = await fs.readFile(decoderRuntimePath, 'utf8');
const localZstd = '/_/VXdx5NbI.wasm';
const remoteZstd = versioned('decoders/ktx-zstd.wasm');
if (decoderRuntime.includes(localZstd)) {
  decoderRuntime = decoderRuntime.replaceAll(localZstd, remoteZstd);
} else if (!decoderRuntime.includes(remoteZstd)) {
  throw new Error(`Decoder asset reference missing: ${localZstd}`);
}
await fs.writeFile(decoderRuntimePath, decoderRuntime);

const entryRuntimePath = 'public/_/DenPkkVr.js';
let entryRuntime = await fs.readFile(entryRuntimePath, 'utf8');
const plantResolver = `async function B(){let plant=Number(new URLSearchParams(location.search).get('plant'));if(Number.isInteger(plant)&&plant>=1&&plant<=99999999)return{number:plant,shared:true};try{let response=await fetch('/api/plant',{method:'POST',signal:AbortSignal.timeout?.(3000)}),payload=await response.json();if(Number.isInteger(payload.number)&&payload.number>=1)return{number:payload.number,shared:false}}catch{}return{number:2+Math.floor(Math.random()*99999),shared:false}}`;
const plantResolverStart = entryRuntime.indexOf('async function B(){');
const runtimeBootStart = entryRuntime.indexOf('_0x1f9f1f(),', plantResolverStart);
if (plantResolverStart < 0 || runtimeBootStart < 0) {
  throw new Error('Runtime plant resolver was not recognized.');
}
if (!entryRuntime.includes(plantResolver)) {
  entryRuntime = entryRuntime.slice(0, plantResolverStart) + plantResolver + entryRuntime.slice(runtimeBootStart);
}
const analyticsBoot = '_0x1f9f1f(),_0x4c9897(),_0x352076()';
const cleanBoot = '_0x1f9f1f(),_0x4c9897()';
if (entryRuntime.includes(analyticsBoot)) {
  entryRuntime = entryRuntime.replace(analyticsBoot, cleanBoot);
} else if (!entryRuntime.includes(cleanBoot)) {
  throw new Error('Runtime boot sequence was not recognized.');
}
await fs.writeFile(entryRuntimePath, entryRuntime);

const cssPath = 'src/styles/experience.css';
let css = await fs.readFile(cssPath, 'utf8');
for (const [from, to] of Object.entries({
  '/_/1yDAgP4V.woff2': versioned('fonts/saol-display.woff2'),
  '/_/D5uFGrrU.woff2': versioned('fonts/suisse-intl.woff2'),
  '/_/LVQ7Mwuh.woff2': versioned('fonts/suisse-intl-mono.woff2'),
})) {
  if (css.includes(from)) css = css.replaceAll(from, to);
  else if (!css.includes(to)) throw new Error(`CSS asset reference missing: ${from}`);
}
await fs.writeFile(cssPath, css);

console.log(`Patched runtime and fonts for media release ${manifest.release}.`);
