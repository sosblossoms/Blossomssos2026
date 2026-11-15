'use client';

import { useEffect, useState } from 'react';
import type { ScheduleEvent } from '@/types/schedule';
import type { DrivePosterEntry } from '@/app/api/drive-posters/route';

let cachedPostersPromise: Promise<DrivePosterEntry[]> | null = null;

function fetchDrivePostersOnce(): Promise<DrivePosterEntry[]> {
  if (!cachedPostersPromise) {
    cachedPostersPromise = fetch('/api/drive-posters')
      .then((res) => (res.ok ? res.json() : { posters: [] }))
      .then((data) => (Array.isArray(data?.posters) ? data.posters : []))
      .catch(() => []);
  }
  return cachedPostersPromise;
}

function normalizeTitle(value: string): string {
  return value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function matchPosterEntry(
  eventTitle: string,
  entries: DrivePosterEntry[]
): DrivePosterEntry | null {
  const normEvent = normalizeTitle(eventTitle);
  if (!normEvent) return null;

  // Prefer exact normalized match first, then prefix/inclusion matches with longest name first
  const exact = entries.find((e) => normalizeTitle(e.name) === normEvent);
  if (exact) return exact;

  const eventCompact = normEvent.replace(/\s+/g, '');
  const compactMatch = entries.find(
    (e) => normalizeTitle(e.name).replace(/\s+/g, '') === eventCompact
  );
  if (compactMatch) return compactMatch;

  const sortedByLen = [...entries].sort(
    (a, b) => normalizeTitle(b.name).length - normalizeTitle(a.name).length
  );

  return (
    sortedByLen.find((e) => {
      const normFile = normalizeTitle(e.name);
      return (
        normFile.length >= 4 &&
        (normEvent.includes(normFile) || normFile.includes(normEvent))
      );
    }) ?? null
  );
}

/**
 * Resolves the Google Drive poster URL for a schedule event, using its static mapping first
 * and checking the live Drive folder listing if no static poster is attached yet.
 */
export function useEventDrivePoster(event: ScheduleEvent | null) {
  const [dynamicEntry, setDynamicEntry] = useState<DrivePosterEntry | null>(null);
  const [checkedEventId, setCheckedEventId] = useState<string | null>(null);

  const hasStatic = Boolean(event?.posterUrl);

  useEffect(() => {
    if (!event || hasStatic) return;

    let cancelled = false;
    fetchDrivePostersOnce().then((entries) => {
      if (cancelled) return;
      setDynamicEntry(matchPosterEntry(event.title, entries));
      setCheckedEventId(event.id);
    });

    return () => {
      cancelled = true;
    };
  }, [event, hasStatic]);

  if (!event) {
    return {
      imageUrl: null as string | null,
      fallbackImageUrl: null as string | null,
      driveUrl: null as string | null,
      isResolving: false,
    };
  }

  if (event.posterUrl) {
    return {
      imageUrl: event.posterUrl,
      fallbackImageUrl: event.posterFallbackUrl ?? null,
      driveUrl: event.posterDriveUrl ?? null,
      isResolving: false,
    };
  }

  const isCurrentResolved = checkedEventId === event.id;
  return {
    imageUrl: isCurrentResolved ? (dynamicEntry?.imageUrl ?? null) : null,
    fallbackImageUrl: isCurrentResolved ? (dynamicEntry?.fallbackImageUrl ?? null) : null,
    driveUrl: isCurrentResolved ? (dynamicEntry?.driveUrl ?? null) : null,
    isResolving: !isCurrentResolved,
  };
}
