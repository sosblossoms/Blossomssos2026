'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  RotateCw,
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
  const [imgLoaded, setImgLoaded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const eventId = event?.id ?? null;
  if (eventId !== prevEventId) {
    setPrevEventId(eventId);
    setUseFallbackImg(false);
    setImgFailed(false);
    setImgLoaded(false);
  }

  const poster = useEventDrivePoster(isOpen ? event : null);

  // Close on Escape key press, lock background scroll, and restore focus on close
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previouslyFocused && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
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
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto overscroll-contain"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#3D246C]/65 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Split Two-Column Modal Dialog Card */}
      <div className="relative w-full max-w-4xl rounded-t-2xl sm:rounded-2xl bg-[#FFFCF5] border-2 border-[#3D246C] shadow-[8px_8px_0px_#3D246C] p-4 sm:p-6 z-10 my-auto text-[#3D246C] max-h-[92dvh] overflow-y-auto overscroll-contain">
        {/* Persistent Top-Right Close Button (accessible on both mobile stacked & desktop split) */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close event details"
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 inline-flex items-center justify-center min-w-[40px] min-h-[40px] rounded-xl bg-[#FFDBC3] border-2 border-[#3D246C] text-[#3D246C] hover:bg-[#5C4B99] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF5]"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* LEFT COLUMN: Official Event Poster directly fetched from Google Drive */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2 px-1 pr-12 md:pr-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#5C4B99] leading-snug">
                <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Event Poster • Drive</span>
              </span>
              {poster.driveUrl && (
                <a
                  href={poster.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-[#3D246C] hover:text-[#5C4B99] inline-flex items-center gap-1 underline rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] px-1"
                >
                  <span>Open File</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              )}
            </div>

            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-none mx-auto aspect-[3/4] rounded-xl overflow-hidden bg-white border-2 border-[#3D246C] shadow-[4px_4px_0px_#3D246C] flex items-center justify-center">
              {activePosterSrc && !imgFailed ? (
                <>
                  {!imgLoaded && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center bg-[#FFFCF5]"
                    >
                      <div className="w-8 h-8 rounded-full border-2 border-[#5C4B99] border-t-transparent animate-spin" />
                      <p className="text-xs font-mono font-semibold text-[#3D246C]/85">
                        Loading official poster...
                      </p>
                    </div>
                  )}
                  {/* Direct Drive CDN image for instant multi-host fallback */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activePosterSrc}
                    alt={`${event.title} Official Event Poster`}
                    className="relative z-10 w-full h-full object-contain bg-white"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onLoad={() => setImgLoaded(true)}
                    onError={() => {
                      if (!useFallbackImg && poster.fallbackImageUrl && activePosterSrc !== poster.fallbackImageUrl) {
                        setImgLoaded(false);
                        setUseFallbackImg(true);
                      } else {
                        setImgFailed(true);
                      }
                    }}
                  />
                </>
              ) : poster.isResolving ? (
                <div className="flex flex-col items-center justify-center gap-2.5 p-6 text-center bg-[#FFFCF5] w-full h-full">
                  <div className="w-8 h-8 rounded-full border-2 border-[#5C4B99] border-t-transparent animate-spin" />
                  <p className="text-xs font-mono font-semibold text-[#3D246C]/85">
                    Checking Drive posters folder...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 p-6 text-center bg-[#FFF9DB] w-full h-full">
                  <div className="p-3 rounded-xl bg-white border-2 border-[#3D246C] shadow-[3px_3px_0px_#3D246C] text-[#5C4B99]">
                    <FolderOpen className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-1.5 max-w-[240px]">
                    <p className="font-tech font-extrabold text-sm text-[#3D246C]">
                      {imgFailed ? 'Poster Preview Unavailable' : 'Poster Uploading Soon'}
                    </p>
                    <p className="text-xs font-body text-[#3D246C]/85 leading-relaxed">
                      {imgFailed
                        ? 'The Drive preview could not be rendered inline. Open the file or folder directly below.'
                        : "Official event posters are synced live from Team Onyx's Google Drive folder as each graphic is released."}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {imgFailed && activePosterSrc && (
                      <button
                        type="button"
                        onClick={() => {
                          setImgFailed(false);
                          setUseFallbackImg(false);
                          setImgLoaded(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] rounded-lg bg-[#FFDBC3] hover:bg-[#9F91CC]/40 border-2 border-[#3D246C] text-xs font-mono font-bold text-[#3D246C] transition-colors shadow-[2px_2px_0px_#3D246C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
                      >
                        <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Retry</span>
                      </button>
                    )}
                    <a
                      href={poster.driveUrl || DRIVE_POSTER_FOLDER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] rounded-lg bg-white hover:bg-[#FFDBC3] border-2 border-[#3D246C] text-xs font-mono font-bold text-[#3D246C] transition-colors shadow-[2px_2px_0px_#3D246C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
                    >
                      <span>{poster.driveUrl ? 'Open Poster in Drive' : 'Browse Drive Folder'}</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Event Logistics, Badges & Actions */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Header with Category Badge */}
              <div className="flex items-start justify-between gap-3 pb-3.5 md:pr-12 border-b-2 border-[rgba(61,36,108,0.16)]">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider font-mono border leading-snug"
                    style={{
                      backgroundColor: `${categoryConfig.accentColor}18`,
                      color: '#3D246C',
                      borderColor: `${categoryConfig.accentColor}50`,
                    }}
                  >
                    {event.categoryLabel}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold font-mono uppercase tracking-wider bg-[#FFF9DB] text-[#3D246C] border border-[#3D246C]/30 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5C4B99]" aria-hidden="true" />
                    Tentative Schedule
                  </span>
                </div>
              </div>

              {/* Event Title */}
              <div className="mt-4 mb-4">
                <h2
                  id="event-modal-title"
                  className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C] tracking-tight leading-tight"
                >
                  {event.title}
                </h2>
                <p className="text-xs text-[#3D246C]/85 mt-1.5 font-mono font-medium">
                  Event ID: {event.id} • School of Sciences Prelims
                </p>
              </div>

              {/* Verification Alert Callout if time/venue is questioned */}
              {event.needsVerification && (
                <div className="mb-4 p-3.5 rounded-xl bg-[#9F91CC]/20 border border-[#5C4B99]/40 flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-[#3D246C]">
                  <ShieldAlert className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-bold text-[#3D246C]">
                      Time Needs Administrative Confirmation
                    </div>
                    <p className="text-[#3D246C]/90 mt-0.5">
                      {event.verificationReason ||
                        `Listed as ${event.timeDisplay} in the tentative schedule document. Official timing will be finalized by festival conveners.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Submission Deadline Callout (e.g. for Short Film Screening) */}
              {event.submissionDeadline && (
                <div className="mb-4 p-3.5 rounded-xl bg-[#FFDBC3]/65 border-2 border-[#3D246C] flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed shadow-[3px_3px_0px_#3D246C]">
                  <FileText className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-bold text-[#3D246C] uppercase font-mono tracking-wider text-xs">
                      Submission Deadline
                    </div>
                    <p className="text-[#3D246C] font-bold mt-0.5">
                      {event.submissionDeadline.label}
                    </p>
                    <p className="text-[#3D246C]/90 text-xs mt-1 leading-relaxed">
                      Submissions must be received before the deadline prior to the live screening on {event.dayOfWeek}.
                    </p>
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="space-y-3 p-4 rounded-xl bg-white border border-[rgba(61,36,108,0.16)] text-xs sm:text-sm shadow-xs">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <span className="text-[#5C4B99] text-xs font-semibold block font-mono uppercase tracking-wider leading-snug">
                      Date &amp; Day
                    </span>
                    <span className="font-bold text-[#3D246C]">{formattedDate}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2.5 border-t border-[rgba(61,36,108,0.12)]">
                  <Clock className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <span className="text-[#5C4B99] text-xs font-semibold block font-mono uppercase tracking-wider leading-snug">
                      Listed Time
                    </span>
                    <span className="font-bold text-[#3D246C]">{event.timeDisplay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2.5 border-t border-[rgba(61,36,108,0.12)]">
                  <MapPin className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <span className="text-[#5C4B99] text-xs font-semibold block font-mono uppercase tracking-wider leading-snug">
                      Venue Location
                    </span>
                    <span className="font-bold text-[#3D246C]">{event.venue}</span>
                  </div>
                </div>

                {event.notes && (
                  <div className="flex items-start gap-3 pt-2.5 border-t border-[rgba(61,36,108,0.12)]">
                    <Tag className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <span className="text-[#5C4B99] text-xs font-semibold block font-mono uppercase tracking-wider leading-snug">
                        Special Notes
                      </span>
                      <span className="text-[#3D246C] leading-relaxed">{event.notes}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2.5 border-t border-[rgba(61,36,108,0.12)] text-xs text-[#3D246C]/85 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold">Source:</span>
                  <span className="font-mono text-[#3D246C]">{event.sourceReference}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-4 border-t-2 border-[rgba(61,36,108,0.16)]">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold bg-white hover:bg-[#FFDBC3] text-[#3D246C] border-2 border-[#3D246C] shadow-[3px_3px_0px_#3D246C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                    <span className="text-emerald-700 font-bold">Details Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#5C4B99]" aria-hidden="true" />
                    <span>Share Event</span>
                  </>
                )}
              </button>

              {siteConfig.registrationUrl && (
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#5C4B99] hover:bg-[#4C3C82] text-white px-5 py-2.5 min-h-[44px] rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 border-2 border-[#3D246C] shadow-[3px_3px_0px_#3D246C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
                >
                  <span>Register Now</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
