import manifest from './assets.json';

export const MEDIA_RELEASE = manifest.release;
export const MEDIA_BASE_URL = manifest.baseUrl;

export function mediaUrl(path: keyof typeof manifest.files): string {
  return `${MEDIA_BASE_URL}/${path}?v=${MEDIA_RELEASE}`;
}
