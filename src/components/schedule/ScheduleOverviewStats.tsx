import React from 'react';
import { Calendar, Clock, MapPin, Layers } from 'lucide-react';
import { getScheduleOverview } from '@/data/schedule-2026-27';
import { ScheduleEvent } from '@/types/schedule';


interface ScheduleOverviewStatsProps {
  events: ScheduleEvent[];
  filteredCount: number;
}

export function ScheduleOverviewStats({
  events,
  filteredCount,
}: ScheduleOverviewStatsProps) {
  const overview = getScheduleOverview(events);

  return (
    <div className="space-y-4">
      {/* Calculated Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Timeline Span */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-[rgba(61,36,108,0.16)] flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between gap-2 text-xs text-[#3D246C]/85 mb-2">
            <span className="font-mono uppercase tracking-wider font-semibold leading-snug">
              Festival Window
            </span>
            <Calendar className="w-4 h-4 text-[#5C4B99] shrink-0" aria-hidden="true" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold text-[#3D246C] tracking-tight leading-snug">
              {overview.startDateFormatted.split(',')[0]} – {overview.endDateFormatted.split(',')[0]}
            </div>
            <div className="text-xs text-[#5C4B99] font-mono mt-1 font-semibold leading-snug">
              2026 Prelims Period
            </div>
          </div>
        </div>

        {/* Metric 2: Scheduled Dates */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-[rgba(61,36,108,0.16)] flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between gap-2 text-xs text-[#3D246C]/85 mb-2">
            <span className="font-mono uppercase tracking-wider font-semibold leading-snug">
              Active Dates
            </span>
            <Clock className="w-4 h-4 text-[#5C4B99] shrink-0" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#3D246C] tracking-tight leading-tight">
              {overview.totalEventDays}
              <span className="text-xs font-medium text-[#3D246C]/85 ml-1.5 font-sans">
                Days with Events
              </span>
            </div>
            <div className="text-xs text-[#5C4B99] font-mono mt-1 font-semibold leading-snug">
              Nov 12 – Dec 19
            </div>
          </div>
        </div>

        {/* Metric 3: Total Events */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-[rgba(61,36,108,0.16)] flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between gap-2 text-xs text-[#3D246C]/85 mb-2">
            <span className="font-mono uppercase tracking-wider font-semibold leading-snug">
              Events Listed
            </span>
            <Layers className="w-4 h-4 text-[#5C4B99] shrink-0" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#3D246C] tracking-tight leading-tight">
              {overview.totalEvents}
              <span className="text-xs font-medium text-[#3D246C]/85 ml-1.5 font-sans">
                {filteredCount !== overview.totalEvents ? `(${filteredCount} matching)` : 'Prelims Events'}
              </span>
            </div>
            <div className="text-xs text-[#5C4B99] font-mono mt-1 font-semibold leading-snug">
              Across 6 Major Arenas
            </div>
          </div>
        </div>

        {/* Metric 4: Campus Venues */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-[rgba(61,36,108,0.16)] flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between gap-2 text-xs text-[#3D246C]/85 mb-2">
            <span className="font-mono uppercase tracking-wider font-semibold leading-snug">
              Campus Venues
            </span>
            <MapPin className="w-4 h-4 text-[#5C4B99] shrink-0" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#3D246C] tracking-tight leading-tight">
              {overview.uniqueVenuesCount}
              <span className="text-xs font-medium text-[#3D246C]/85 ml-1.5 font-sans">
                Unique Locations
              </span>
            </div>
            <div className="text-xs text-[#5C4B99] font-mono mt-1 font-semibold leading-snug">
              Blocks 1 &amp; 2, Campus View, KE Aud.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
