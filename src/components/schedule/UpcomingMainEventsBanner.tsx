'use client';

import React, { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarClock,
  Clock,
  ExternalLink,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { getNextUpcomingDayEvents, toLocalIsoDate } from '@/data/notice-board';
import { BLOSSOMS_SCHEDULE_2026, SCHEDULE_CATEGORY_CONFIG } from '@/data/schedule-2026-27';
import { ScheduleEvent } from '@/types/schedule';
import { EventDetailModal } from './EventDetailModal';

const SERVER_FALLBACK_BUCKET = Math.floor(
  new Date('2026-11-15T20:00:00+05:30').getTime() / 30000
);

function subscribeClock(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const interval = window.setInterval(callback, 30000);
  return () => window.clearInterval(interval);
}

function getClientClockBucket(): number {
  return Math.floor(Date.now() / 30000);
}

function getServerClockBucket(): number {
  return SERVER_FALLBACK_BUCKET;
}

interface UpcomingMainEventsBannerProps {
  onSelectEvent?: (event: ScheduleEvent) => void;
  showFullScheduleLink?: boolean;
}

/**
 * Highlights all main events on the next upcoming festival day (e.g. Monday 16 Nov:
 * Potpourri & Western Acoustic Music Group) with a crisp neo-brutalist card grid
 * and side-by-side Drive poster artwork.
 */
export function UpcomingMainEventsBanner({
  onSelectEvent,
  showFullScheduleLink = true,
}: UpcomingMainEventsBannerProps) {
  const clockBucket = useSyncExternalStore(
    subscribeClock,
    getClientClockBucket,
    getServerClockBucket
  );
  const [internalModalEvent, setInternalModalEvent] = useState<ScheduleEvent | null>(null);
  const [fallbackIds, setFallbackIds] = useState<Record<string, boolean>>({});

  const nowDate = useMemo(() => new Date(clockBucket * 30000), [clockBucket]);
  const upcomingDay = useMemo(
    () => getNextUpcomingDayEvents(nowDate, BLOSSOMS_SCHEDULE_2026),
    [nowDate]
  );

  const dayRelationLabel = useMemo(() => {
    if (!upcomingDay) return '';
    const todayIso = toLocalIsoDate(nowDate);
    const tomorrow = new Date(nowDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowIso = toLocalIsoDate(tomorrow);

    if (upcomingDay.dateIso === todayIso) return "TODAY'S MAIN EVENTS";
    if (upcomingDay.dateIso === tomorrowIso) return "TOMORROW'S MAIN EVENTS";
    return 'NEXT UPCOMING EVENTS';
  }, [nowDate, upcomingDay]);

  const countdown = useMemo(() => {
    if (!upcomingDay) return null;
    const diffMs = Math.max(0, upcomingDay.targetDate.getTime() - nowDate.getTime());
    const totalMinutes = Math.floor(diffMs / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const mins = totalMinutes % 60;
    return { days, hours, mins };
  }, [upcomingDay, nowDate]);

  if (!upcomingDay || upcomingDay.events.length === 0) return null;

  const formattedDay = new Date(`${upcomingDay.dateIso}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const handleInspect = (event: ScheduleEvent) => {
    if (onSelectEvent) {
      onSelectEvent(event);
    } else {
      setInternalModalEvent(event);
    }
  };

  return (
    <>
      <section
        aria-label="Next Upcoming Main Events"
        className="rounded-2xl bg-[#FFF9DB] border-2 border-[#3D246C] shadow-[6px_6px_0px_#3D246C] p-5 sm:p-7 space-y-5"
      >
        {/* Top Neo-Brutalist Header Strip */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b-2 border-[#3D246C]">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#3D246C] text-[#FFDBC3] text-[11px] font-mono font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dayRelationLabel}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border-2 border-[#3D246C] text-[#3D246C] text-xs font-mono font-bold">
                <CalendarClock className="w-3.5 h-3.5 text-[#5C4B99]" />
                <span>{formattedDay}</span>
              </span>
            </div>
            <h2 className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C] tracking-tight leading-tight">
              Up Next: {upcomingDay.events.map((e) => e.title).join(' & ')}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {countdown && (
              <div className="flex items-center gap-1.5">
                {[
                  { val: countdown.days, unit: 'D' },
                  { val: countdown.hours, unit: 'H' },
                  { val: countdown.mins, unit: 'M' },
                ].map((slot) => (
                  <div
                    key={slot.unit}
                    className="px-2.5 py-1.5 rounded-lg bg-white border-2 border-[#3D246C] shadow-[2px_2px_0px_#3D246C] text-center min-w-[46px]"
                  >
                    <span className="font-angular text-base sm:text-lg font-black text-[#3D246C] leading-none">
                      {slot.val}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#5C4B99] ml-0.5">
                      {slot.unit}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {showFullScheduleLink && (
              <Link
                href={`/schedule?date=${upcomingDay.dateIso}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5C4B99] hover:bg-[#3D246C] text-white border-2 border-[#3D246C] shadow-[3px_3px_0px_#3D246C] font-tech font-bold text-xs transition-all hover:-translate-y-0.5"
              >
                <span>Open Day Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Main Event Cards with Drive Poster Art Laid Out Side-by-Side */}
        <div
          className={`grid grid-cols-1 ${
            upcomingDay.events.length > 1 ? 'md:grid-cols-2' : ''
          } gap-5`}
        >
          {upcomingDay.events.map((ev) => {
            const categoryConfig = SCHEDULE_CATEGORY_CONFIG[ev.category];
            const posterSrc = fallbackIds[ev.id]
              ? ev.posterFallbackUrl || ev.posterUrl
              : ev.posterUrl || ev.posterFallbackUrl;

            return (
              <div
                key={ev.id}
                role="button"
                tabIndex={0}
                onClick={() => handleInspect(ev)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleInspect(ev);
                  }
                }}
                className="group cursor-pointer rounded-2xl bg-[#FFFCF5] border-2 border-[#3D246C] shadow-[5px_5px_0px_#3D246C] hover:shadow-[7px_7px_0px_#5C4B99] hover:-translate-y-0.5 transition-all p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
              >
                {/* Left Poster Artwork Frame */}
                {posterSrc && (
                  <div className="sm:col-span-5">
                    <div className="relative w-full max-w-[200px] sm:max-w-none mx-auto aspect-[3/4] rounded-xl overflow-hidden bg-white border-2 border-[#3D246C] shadow-[3px_3px_0px_#3D246C]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={posterSrc}
                        alt={`${ev.title} Poster`}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        loading="eager"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          if (!fallbackIds[ev.id] && ev.posterFallbackUrl) {
                            setFallbackIds((prev) => ({ ...prev, [ev.id]: true }));
                          }
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Right Event Copy & Logistics */}
                <div
                  className={`${
                    posterSrc ? 'sm:col-span-7' : 'sm:col-span-12'
                  } flex flex-col justify-between h-full gap-3`}
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold uppercase tracking-wider border border-[#3D246C]"
                        style={{
                          backgroundColor: `${categoryConfig.accentColor}22`,
                          color: '#3D246C',
                        }}
                      >
                        {ev.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-[#FFDBC3] text-[#3D246C] border border-[#3D246C]/40">
                        {ev.dayOfWeek} • {ev.date.slice(5)}
                      </span>
                    </div>

                    <h3 className="font-angular text-xl sm:text-2xl font-black text-[#3D246C] group-hover:text-[#5C4B99] transition-colors leading-snug">
                      {ev.title}
                    </h3>

                    <div className="space-y-1.5 text-xs font-medium text-[#3D246C]">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" />
                        <span className="font-mono font-bold">{ev.timeDisplay}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" />
                        <span>{ev.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#3D246C]/15 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-tech font-extrabold text-[#5C4B99] group-hover:text-[#3D246C]">
                      <span>Inspect Poster &amp; Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    {ev.posterDriveUrl && (
                      <a
                        href={ev.posterDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Open full poster in Google Drive"
                        className="p-1.5 rounded-lg bg-white hover:bg-[#FFDBC3] border border-[#3D246C]/30 text-[#3D246C]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {!onSelectEvent && (
        <EventDetailModal
          event={internalModalEvent}
          isOpen={Boolean(internalModalEvent)}
          onClose={() => setInternalModalEvent(null)}
        />
      )}
    </>
  );
}
