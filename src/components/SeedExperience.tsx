'use client';

import { useEffect } from 'react';

import ChapterInterface from './experience/ChapterInterface';
import EntryGate from './experience/EntryGate';
import ExperienceCanvas from './experience/ExperienceCanvas';
import LoadingSeed from './experience/LoadingSeed';
import { loadSeedRuntime } from '@/runtime/loadSeedRuntime';
import { useChapterKeyboardNavigation } from '@/runtime/useChapterKeyboardNavigation';

export default function SeedExperience() {
  useChapterKeyboardNavigation();

  useEffect(() => {
    loadSeedRuntime().catch((error: unknown) => {
      console.error('Unable to start the seed experience.', error);
      document.documentElement.classList.remove('is-loading');
      const fallback = document.querySelector<HTMLElement>('[data-fallback]');
      if (fallback) fallback.hidden = false;
    });
  }, []);

  return (
    <main aria-label="The lifecycle of a digital seed">
      <ExperienceCanvas />
      <ChapterInterface />
      <LoadingSeed />
      <EntryGate />
    </main>
  );
}
