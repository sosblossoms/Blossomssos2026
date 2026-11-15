'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Share2,
  Check,
  FileText,
  ShieldAlert,
  ExternalLink,
  Image as ImageIcon,
  FolderOpen,
} from 'lucide-react';
import { ScheduleEvent } from '@/types/schedule';
import {
  DRIVE_POSTER_FOLDER_URL,
  SCHEDULE_CATEGORY_CONFIG,
} from '@/data/schedule-2026-27';
import { siteConfig } from '@/data/site-config';
import { useEventDrivePoster } from '@/lib/drive-posters';

interface EventDetailModalProps {
  event: ScheduleEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [prevEventId, setPrevEventId] = useState<string | null>(event?.id ?? null);
  const [useFallbackImg, setUseFallbackImg] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const eventId = event?.id ?? null;
  if (eventId !== prevEventId) {
    setPrevEventId(eventId);
    setUseFallbackImg(false);
    setImgFailed(false);
  }

  const poster = useEventDrivePoster(isOpen ? event : null);

  // Close on Escape key press and lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const categoryConfig = SCHEDULE_CATEGORY_CONFIG[event.category];
  const activePosterSrc = useFallbackImg ? poster.fallbackImageUrl : poster.imageUrl;

  // Format date nicely: "Monday, 16 November 2026"
  const formattedDate = new Date(`${event.date}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleShare = async () => {
    const shareData = {
      title: `Blossoms 2026: ${event.title}`,
      text: `${event.title} (${event.categoryLabel}) at Blossoms SOS Prelims.\nDate: ${event.dayOfWeek}, ${event.date}\nTime: ${event.timeDisplay}\nVenue: ${event.venue}\nStatus: Tentative`,
      url:
        typeof window !== 'undefined'
          ? `${window.location.origin}/schedule?search=${encodeURIComponent(event.title)}`
          : '',
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or share failed, fallback to copy
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(
        `Blossoms 2026: ${event.title}\nDate: ${event.dayOfWeek}, ${event.date}\nTime: ${event.timeDisplay}\nVenue: ${event.venue}\nStatus: Tentative Schedule\nExplore: ${window.location.href}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore copy error
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#3D246C]/65 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Split Two-Column Modal Dialog Card */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#FFFCF5] border-2 border-[#3D246C] shadow-[8px_8px_0px_#3D246C] p-4 sm:p-6 z-10 my-auto text-[#3D246C] animate-in fade-in duration-150 max-h-[92vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* LEFT COLUMN: Official Event Poster directly fetched from Google Drive */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#5C4B99]">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Event Poster • Google Drive</span>
              </span>
              {poster.driveUrl && (
                <a
                  href={poster.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono font-bold text-[#3D246C] hover:text-[#5C4B99] inline-flex items-center gap-1 underline"
                >
                  <span>Open File</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-white border-2 border-[#3D246C] shadow-[4px_4px_0px_#3D246C] flex items-center justify-center">
              {activePosterSrc && !imgFailed ? (
                /* Direct Drive CDN image for instant multi-host fallback */
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activePosterSrc}
                  alt={`${event.title} Official Event Poster`}
                  className="w-full h-full object-contain bg-white"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (!useFallbackImg && poster.fallbackImageUrl) {
                      setUseFallbackImg(true);
                    } else {
                      setImgFailed(true);
                    }
                  }}
                />
              ) : poster.isResolving ? (
                <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#5C4B99] border-t-transparent animate-spin" />
                  <p className="text-xs font-mono text-[#3D246C]/70">
                    Checking Drive posters folder...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 p-6 text-center bg-[#FFF9DB]/70 w-full h-full">
                  <div className="p-3 rounded-xl bg-white border-2 border-[#3D246C] shadow-[3px_3px_0px_#3D246C] text-[#5C4B99]">
                    <FolderOpen className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 max-w-[230px]">
                    <p className="font-tech font-extrabold text-sm text-[#3D246C]">
                      Poster Uploading Soon
                    </p>
                    <p className="text-[11px] font-body text-[#3D246C]/75 leading-relaxed">
                      Official event posters are synced live from Team Onyx&apos;s Google Drive folder as each graphic is released.
                    </p>
                  </div>
                  <a
                    href={DRIVE_POSTER_FOLDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#FFDBC3] border-2 border-[#3D246C] text-[11px] font-mono font-bold text-[#3D246C] transition-colors shadow-[2px_2px_0px_#3D246C]"
                  >
                    <span>Browse Drive Folder</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Event Logistics, Badges & Actions */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Header with Category Badge and Close Button */}
              <div className="flex items-start justify-between gap-3 pb-3.5 border-b-2 border-[#3D246C]/15">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider font-mono border"
                    style={{
                      backgroundColor: `${categoryConfig.accentColor}18`,
                      color: '#3D246C',
                      borderColor: `${categoryConfig.accentColor}50`,
                    }}
                  >
                    {event.categoryLabel}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono uppercase bg-[#FFF9DB] text-[#3D246C] border border-[#3D246C]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5C4B99]" />
                    Tentative Schedule
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close event details"
                  className="p-1.5 rounded-xl bg-[#FFDBC3] border-2 border-[#3D246C] text-[#3D246C] hover:bg-[#5C4B99] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Event Title */}
              <div className="mt-4 mb-4">
                <h2
                  id="event-modal-title"
                  className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C] tracking-tight leading-tight"
                >
                  {event.title}
                </h2>
                <p className="text-xs text-[#3D246C]/70 mt-1 font-mono">
                  Event ID: {event.id} • School of Sciences Prelims
                </p>
              </div>

              {/* Verification Alert Callout if time/venue is questioned */}
              {event.needsVerification && (
                <div className="mb-4 p-3 rounded-xl bg-[#9F91CC]/20 border border-[#5C4B99]/35 flex items-start gap-2.5 text-xs leading-relaxed text-[#3D246C]">
                  <ShieldAlert className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#3D246C]">
                      Time Needs Administrative Confirmation
                    </div>
                    <p className="text-[#3D246C]/80 mt-0.5">
                      {event.verificationReason ||
                        `Listed as ${event.timeDisplay} in the tentative schedule document. Official timing will be finalized by festival conveners.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Submission Deadline Callout (e.g. for Short Film Screening) */}
              {event.submissionDeadline && (
                <div className="mb-4 p-3 rounded-xl bg-[#FFDBC3]/60 border-2 border-[#3D246C] flex items-start gap-2.5 text-xs leading-relaxed shadow-[3px_3px_0px_#3D246C]">
                  <FileText className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#3D246C] uppercase font-mono tracking-wider">
                      Submission Deadline
                    </div>
                    <p className="text-[#3D246C] font-semibold mt-0.5">
                      {event.submissionDeadline.label}
                    </p>
                    <p className="text-[#3D246C]/75 text-[11px] mt-0.5">
                      Submissions must be received before the deadline prior to the live screening on {event.dayOfWeek}.
                    </p>
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="space-y-3 p-4 rounded-xl bg-white border-2 border-[#3D246C]/20 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-[#3D246C]/65 text-[11px] block font-mono uppercase tracking-wider">
                      Date &amp; Day
                    </span>
                    <span className="font-bold text-[#3D246C]">{formattedDate}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2.5 border-t border-[#3D246C]/15">
                  <Clock className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-[#3D246C]/65 text-[11px] block font-mono uppercase tracking-wider">
                      Listed Time
                    </span>
                    <span className="font-bold text-[#3D246C]">{event.timeDisplay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2.5 border-t border-[#3D246C]/15">
                  <MapPin className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-[#3D246C]/65 text-[11px] block font-mono uppercase tracking-wider">
                      Venue Location
                    </span>
                    <span className="font-bold text-[#3D246C]">{event.venue}</span>
                  </div>
                </div>

                {event.notes && (
                  <div className="flex items-start gap-3 pt-2.5 border-t border-[#3D246C]/15">
                    <Tag className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-[#3D246C]/65 text-[11px] block font-mono uppercase tracking-wider">
                        Special Notes
                      </span>
                      <span className="text-[#3D246C]/90">{event.notes}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2.5 border-t border-[#3D246C]/15 text-[11px] text-[#3D246C]/65 flex flex-wrap items-center justify-between gap-2">
                  <span>Source:</span>
                  <span className="font-mono text-[#3D246C]/85">{event.sourceReference}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-4 border-t-2 border-[#3D246C]/15">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-[#FFDBC3] text-[#3D246C] border-2 border-[#3D246C] shadow-[3px_3px_0px_#3D246C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span className="text-emerald-700 font-bold">Details Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#5C4B99]" />
                    <span>Share Event</span>
                  </>
                )}
              </button>

              {siteConfig.registrationUrl && (
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#5C4B99] hover:bg-[#4C3C82] text-white px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 border-2 border-[#3D246C] shadow-[3px_3px_0px_#3D246C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
                >
                  <span>Register Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
