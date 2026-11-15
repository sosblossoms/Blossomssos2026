'use client';

import Image from 'next/image';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { COVERFLOW_SLIDES, CoverflowSlide } from '@/data/gallery-data';

interface GalleryCoverflowProps {
  onSelectImage?: (image: CoverflowSlide) => void;
}

export function GalleryCoverflow({ onSelectImage }: GalleryCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(2); // Start at index 2 (center item)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = COVERFLOW_SLIDES.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const currentSlide = COVERFLOW_SLIDES[activeIndex];

  return (
    <section
      aria-label="Interactive 3D Stage Exhibition"
      className="relative w-full py-10 sm:py-16 overflow-hidden select-none bg-[#FFDBC3]"
      ref={containerRef}
    >
      {/* 1. Giant Background Editorial Watermark (Themed to Deep Purple #3D246C) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-full pointer-events-none z-0 flex flex-col items-center justify-center opacity-[0.06] sm:opacity-[0.07]"
        aria-hidden="true"
      >
        <span className="font-angular text-[18vw] font-black tracking-tighter text-[#3D246C] leading-none whitespace-nowrap text-center">
          BLOSSOMS
        </span>
        <span className="font-tech text-[2vw] tracking-[0.45em] uppercase font-bold text-[#4C3C82] -mt-2">
          CENTRAL CAMPUS STAGE ARCHIVE
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-1.5">
          <span className="font-serif italic text-lg sm:text-xl text-[#4C3C82] block">
            Stage Exhibition
          </span>
          <h2 className="font-angular text-3xl sm:text-5xl font-black text-[#3D246C] tracking-tight">
            The Spotlight Carousel
          </h2>
          <p className="pt-1 text-sm sm:text-base text-[#3D246C]/90 font-body font-medium max-w-[60ch] mx-auto">
            Swipe or use arrow keys to navigate highlighted festival performances and central stage captures.
          </p>
        </div>

        {/* 2. 3D Curved Perspective Carousel Stage */}
        <div
          className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] flex items-center justify-center perspective-[1200px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Navigation Button (Beside Images) */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-1 sm:left-4 md:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 sm:p-3.5 rounded-full bg-white/95 hover:bg-white text-[#3D246C] hover:text-[#4C3C82] border border-[#3D246C]/20 hover:border-[#5C4B99]/50 shadow-lg transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFDBC3]"
            aria-label="Previous Highlight"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </button>

          {/* Right Arrow Navigation Button (Beside Images) */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-1 sm:right-4 md:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 sm:p-3.5 rounded-full bg-white/95 hover:bg-white text-[#3D246C] hover:text-[#4C3C82] border border-[#3D246C]/20 hover:border-[#5C4B99]/50 shadow-lg transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFDBC3]"
            aria-label="Next Highlight"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </button>

          {COVERFLOW_SLIDES.map((slide, idx) => {
            const offset = idx - activeIndex;
            const absOffset = Math.abs(offset);

            // Only render items within 3 steps of active
            if (absOffset > 3) return null;

            // 3D positioning calculations
            const isActive = offset === 0;
            const translateX = offset * 115; // px spacing in desktop
            const translateZ = absOffset * -120; // push side cards back
            const rotateY = offset < 0 ? 32 : offset > 0 ? -32 : 0; // curve flanking cards
            const scale = 1 - absOffset * 0.12;
            const opacity = Math.max(0.2, 1 - absOffset * 0.25);
            const zIndex = 30 - absOffset;

            return (
              <div
                key={slide.id}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                className={`absolute w-[240px] sm:w-[300px] md:w-[350px] aspect-[4/5] rounded-3xl overflow-hidden transition-all duration-500 ease-out will-change-transform shadow-xl focus-within:ring-4 focus-within:ring-[#3D246C] focus-within:ring-offset-2 focus-within:ring-offset-[#FFDBC3] ${
                  isActive
                    ? 'ring-4 ring-[#5C4B99]/40 shadow-2xl shadow-[#5C4B99]/20'
                    : 'hover:opacity-90 hover:brightness-105'
                }`}
              >
                <div className="relative w-full h-full bg-[#3D246C]">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Slide ${idx + 1} of ${total}: ${slide.title}`}
                    aria-pressed={isActive}
                    className={`relative block w-full h-full text-left focus-visible:outline-none ${
                      isActive ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 350px"
                      className="object-cover transition-transform duration-700 ease-out"
                      priority={absOffset <= 1}
                    />
                    {/* Subtle vignette gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3D246C]/90 via-[#3D246C]/25 to-transparent pointer-events-none" />
                  </button>

                  {/* Quick Expand Icon if selected (sibling button, never nested) */}
                  {isActive && onSelectImage && (
                    <button
                      type="button"
                      onClick={() => onSelectImage(slide)}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-full bg-white/95 hover:bg-white text-[#3D246C] hover:text-[#4C3C82] transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#3D246C]"
                      title="View Full Resolution"
                      aria-label={`View full resolution for ${slide.title}`}
                    >
                      <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Active Caption & Slide Indicators */}
        <div className="max-w-2xl mx-auto mt-6 sm:mt-10 flex flex-col items-center text-center" aria-live="polite">
          {/* Active Details Card */}
          <div className="w-full px-3 sm:px-6 mb-3 space-y-1">
            <span className="text-xs font-tech font-bold uppercase tracking-wider text-[#4C3C82] block">
              {currentSlide.pillar} &bull; {activeIndex + 1} / {total}
            </span>
            <h3 className="font-angular text-xl sm:text-2xl font-black text-[#3D246C] tracking-tight">
              {currentSlide.title}
            </h3>
          </div>

          {/* Carousel Slide Indicators */}
          <div className="flex items-center justify-center gap-0.5 mt-2" role="group" aria-label="Slide indicators">
            {COVERFLOW_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="min-h-[44px] min-w-[28px] px-1.5 py-2 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-1 focus-visible:ring-offset-[#FFDBC3]"
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                aria-current={idx === activeIndex ? 'true' : undefined}
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 block ${
                    idx === activeIndex
                      ? 'w-7 bg-[#4C3C82]'
                      : 'w-2 bg-[#3D246C]/30 hover:bg-[#4C3C82]/60'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
