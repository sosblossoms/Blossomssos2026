import React from 'react';
import { SubEvent } from '@/types/content';
import { siteConfig } from '@/data/site-config';
import { Users, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface SubEventCardProps {
  event: SubEvent;
  accentColor?: string;
}

export function SubEventCard({ event }: SubEventCardProps) {
  return (
    <article
      className="p-6 rounded-2xl bg-white border border-[rgba(61,36,108,0.16)] hover:border-[rgba(92,75,153,0.38)] transition-all duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md"
      aria-labelledby={`event-${event.id}-title`}
    >
      <div>
        {/* Top Metadata Pills (>= 12px) */}
        <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-tech font-bold tracking-wider uppercase border border-[rgba(61,36,108,0.16)] bg-[#FFDBC3] text-[#3D246C]"
          >
            {event.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#3D246C] font-tech font-semibold bg-[#FFFCF5] px-3 py-1 rounded-full border border-[rgba(61,36,108,0.16)]">
            <Users className="w-3.5 h-3.5 text-[#5C4B99]" />
            <span>{event.teamSize}</span>
          </span>
        </div>

        {/* Title */}
        <h3
          id={`event-${event.id}-title`}
          className="font-tech text-lg sm:text-xl font-bold text-[#3D246C] mb-2 group-hover:text-[#5C4B99] transition-colors leading-snug"
        >
          {event.name}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-[#3D246C]/85 leading-relaxed mb-4 font-normal">
          {event.shortDescription}
        </p>

        {/* Evaluation Criteria Checklist */}
        <div className="rounded-xl bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] p-4">
          <span className="text-xs font-tech font-bold text-[#5C4B99] uppercase tracking-wider block mb-2.5">
            Judging Criteria &amp; Rules
          </span>
          <ul className="space-y-2 text-xs sm:text-sm text-[#3D246C]">
            {event.points.slice(0, 4).map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" />
                <span className="leading-snug">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Venue, Slot & Registration CTA Footer */}
      <div className="mt-5 pt-4 border-t border-[rgba(61,36,108,0.16)] flex flex-col gap-2.5 text-xs">
        {(event.historicalVenue || event.historicalTiming) && (
          <div className="flex flex-col gap-2">
            {event.historicalVenue && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] text-xs text-[#3D246C]">
                <MapPin className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" />
                <span>
                  Venue: <strong className="font-tech font-bold text-[#3D246C]">{event.historicalVenue}</strong>
                </span>
              </div>
            )}
            {event.historicalTiming && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] text-xs text-[#3D246C]">
                <Clock className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" />
                <span>
                  Slot: <strong className="font-tech font-bold text-[#3D246C]">{event.historicalTiming}</strong>
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        {siteConfig.registrationUrl && (
          <div className="pt-1.5">
            <a
              href={siteConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn-primary min-h-[44px] bg-[#5C4B99] hover:bg-[#4C3C82] text-white inline-flex items-center justify-center w-full text-center py-2.5 px-4 rounded-xl text-xs sm:text-sm font-tech font-bold transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
            >
              <span>Register for {event.name}</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
