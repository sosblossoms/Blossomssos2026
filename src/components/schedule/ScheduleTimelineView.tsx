'use client';

import React from 'react';
import { Clock, MapPin, AlertTriangle, FileText, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { ScheduleEvent } from '@/types/schedule';
import { SCHEDULE_CATEGORY_CONFIG } from '@/data/schedule-2026-27';

interface ScheduleTimelineViewProps {
  groupedEvents: Record<string, ScheduleEvent[]>;
  onSelectEvent: (event: ScheduleEvent) => void;
}

export function ScheduleTimelineView({
  groupedEvents,
  onSelectEvent,
}: ScheduleTimelineViewProps) {
  const dates = Object.keys(groupedEvents);

  if (dates.length === 0) {
    return null; // Empty state handled by parent
  }

  return (
    <div className="space-y-10">
      {dates.map((dateStr) => {
        const events = groupedEvents[dateStr];
        const dateObj = new Date(`${dateStr}T00:00:00`);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        const dayOfWeek = events[0]?.dayOfWeek || dateObj.toLocaleDateString('en-US', { weekday: 'long' });

        return (
          <section
            key={dateStr}
            aria-labelledby={`date-heading-${dateStr}`}
            className="space-y-4"
          >
            {/* Date Group Header */}
            <div className="flex items-center gap-3 sm:gap-4 sticky top-20 z-20 py-2.5 bg-[#FFDBC3]">
              <div className="flex items-baseline gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[rgba(61,36,108,0.16)] shadow-xs">
                <span className="text-xs font-bold text-[#5C4B99] font-mono uppercase tracking-wider">
                  {dayOfWeek}
                </span>
                <span className="text-xs font-bold text-[#5C4B99]" aria-hidden="true">
                  •
                </span>
                <h2
                  id={`date-heading-${dateStr}`}
                  className="text-xs sm:text-sm font-black text-[#3D246C] font-mono tracking-tight"
                >
                  {formattedDate}
                </h2>
              </div>
              <span className="text-xs font-mono font-semibold text-[#3D246C]/85 px-2.5 py-1 rounded-lg bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)]">
                {events.length} {events.length === 1 ? 'event' : 'events'}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#3D246C]/25 to-transparent" />
            </div>

            {/* Events Grid for this Date */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {events.map((event) => {
                const categoryConfig = SCHEDULE_CATEGORY_CONFIG[event.category];

                return (
                  <div
                    key={event.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectEvent(event)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectEvent(event);
                      }
                    }}
                    className="group relative p-5 rounded-2xl bg-white hover:bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] hover:border-[rgba(92,75,153,0.45)] transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] flex flex-col justify-between gap-4"
                  >
                    {/* Top Row: Category + Verification/Deadline Pill */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider font-mono border leading-snug"
                          style={{
                            backgroundColor: `${categoryConfig.accentColor}18`,
                            color: '#3D246C',
                            borderColor: `${categoryConfig.accentColor}40`,
                          }}
                        >
                          {event.categoryLabel}
                        </span>

                        {event.posterUrl && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold font-mono tracking-wider bg-[#FFF9DB] text-[#3D246C] border border-[#3D246C]/30 leading-snug">
                            <ImageIcon className="w-3.5 h-3.5 text-[#5C4B99]" aria-hidden="true" />
                            <span>Poster</span>
                          </span>
                        )}

                        {event.needsVerification && (
                          <span
                            title="Time listed as 11:45 PM in source tentative schedule; needs official confirmation"
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold font-mono bg-[#5C4B99]/15 text-[#3D246C] border border-[#5C4B99]/35 leading-snug"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-[#5C4B99]" aria-hidden="true" />
                            <span>Time unconfirmed</span>
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-mono text-[#5C4B99] opacity-85 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 shrink-0 font-bold">
                        Details <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>

                    {/* Middle: Title & Special Notes */}
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-[#3D246C] group-hover:text-[#5C4B99] transition-colors leading-snug">
                        {event.title}
                      </h3>

                      {event.notes && (
                        <p className="text-xs sm:text-sm text-[#3D246C]/85 line-clamp-1 italic leading-relaxed">
                          {event.notes}
                        </p>
                      )}
                    </div>

                    {/* Distinct Submission Deadline if applicable */}
                    {event.submissionDeadline && (
                      <div className="p-2.5 rounded-xl bg-[#FFDBC3]/55 border border-[rgba(61,36,108,0.16)] flex items-center gap-2 text-xs text-[#3D246C]">
                        <FileText className="w-4 h-4 shrink-0 text-[#5C4B99]" aria-hidden="true" />
                        <div className="truncate">
                          <span className="font-bold text-[#3D246C] font-mono mr-1.5">DEADLINE:</span>
                          <span className="text-[#3D246C]">{event.submissionDeadline.label}</span>
                        </div>
                      </div>
                    )}

                    {/* Bottom Metadata: Time & Venue */}
                    <div className="pt-3 border-t border-[rgba(61,36,108,0.12)] flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-[#3D246C]/90 font-medium">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" aria-hidden="true" />
                        <span className={event.needsVerification ? 'text-[#3D246C] font-bold' : ''}>
                          {event.timeDisplay}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 max-w-[60%] truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" aria-hidden="true" />
                        <span className="truncate" title={event.venue}>
                          {event.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
