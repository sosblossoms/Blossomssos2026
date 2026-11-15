'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMounted, usePrefersReducedMotion } from '@/lib/hooks';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
  Eye
} from 'lucide-react';
import { eventCount, countsByCategory } from '@/data/events';
import type { CircularCarouselItem } from '@/components/ui/CircularCarousel/CircularCarousel';

// Dynamically import CircularCarousel with ssr: false inside this Client Component
const CircularCarousel = dynamic(
  () => import('@/components/ui/CircularCarousel/CircularCarousel'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-xs text-[#3D246C]/80 font-mono">
        <div className="w-8 h-8 rounded-full border-2 border-t-[#5C4B99] border-[#3D246C]/20 animate-spin" />
        <span>Initializing 3D Stage...</span>
      </div>
    ),
  }
);

export interface CategoryCarouselItem extends CircularCarouselItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  slug: string;
  tagline: string;
  description: string;
  themeColor: string;
  accentColor: string;
  eventCount: number;
  featuredEvents: string[];
}

export const CATEGORY_ITEMS: CategoryCarouselItem[] = [
  {
    slug: 'art',
    title: 'Art',
    subtitle: `${countsByCategory.art} Competitions • Visual & Digital Arts`,
    tagline: 'Colors, Form & Creative Vision',
    description: 'Visual arts competitions ranging from fine brushwork, photography, and digital graphics to traditional floor and body arts.',
    src: '/art.webp',
    alt: `Art Category - ${countsByCategory.art} competitions including photography, painting, digital poster, and rangoli`,
    themeColor: '#3D246C',
    accentColor: '#9F91CC',
    eventCount: countsByCategory.art,
    featuredEvents: ['Photography', 'Painting', 'Digital Poster', 'Rangoli', 'Mehendi']
  },
  {
    slug: 'literary',
    title: 'Literary',
    subtitle: `${countsByCategory.literary} Competitions • Thought & Written Word`,
    tagline: 'Thought, Discourse & Written Word',
    description: 'Intellectual and expressive competitions including formal debate, impromptu speaking, rapid-fire trivia, and written composition.',
    src: '/literary.webp',
    alt: `Literary Category - ${countsByCategory.literary} competitions including debate, quiz, extempore, and jam`,
    themeColor: '#5C4B99',
    accentColor: '#FFDBC3',
    eventCount: countsByCategory.literary,
    featuredEvents: ['Debate', 'Quiz', 'Extempore', 'Creative Writing', 'JAM']
  },
  {
    slug: 'music',
    title: 'Music',
    subtitle: `${countsByCategory.music} Competitions • Melody & Sonic Energy`,
    tagline: 'Melody, Rhythm & Sonic Energy',
    description: 'Solo and ensemble musical contests spanning traditional Indian folk vocalizations, Western acoustic sets, and full band battles.',
    src: '/music.webp',
    alt: `Music Category - ${countsByCategory.music} competitions including folk singing, acoustic, and battle of the bands`,
    themeColor: '#3D246C',
    accentColor: '#5C4B99',
    eventCount: countsByCategory.music,
    featuredEvents: ['Battle of Bands (Western)', 'Indian Folk Singing', 'Acoustic Solo', 'Battle of Bands (Indian)']
  },
  {
    slug: 'theatre',
    title: 'Theatre',
    subtitle: `${countsByCategory.theatre} Competitions • Drama & Cinematic Craft`,
    tagline: 'Drama, Expression & Cinematic Craft',
    description: 'Stage and screen performance disciplines including solo character portrayals, impactful street plays, proscenium drama, and short films.',
    src: '/theater.webp',
    alt: `Theatre Category - ${countsByCategory.theatre} competitions including street play, proscenium, mime, and short film`,
    themeColor: '#5C4B99',
    accentColor: '#9F91CC',
    eventCount: countsByCategory.theatre,
    featuredEvents: ['Street Theatre', 'Proscenium', 'Mono Acting', 'Short Film', 'Mime']
  },
  {
    slug: 'dance',
    title: 'Dance',
    subtitle: `${countsByCategory.dance} Competitions • Rhythm & Choreography`,
    tagline: 'Rhythm, Movement & Choreography',
    description: 'Expressive movement competitions celebrating classical Indian mudras, contemporary duets, and high-energy ensemble formations.',
    src: '/dance.webp',
    alt: `Dance Category - ${countsByCategory.dance} competitions including classical, duet, and group non-themed`,
    themeColor: '#3D246C',
    accentColor: '#9F91CC',
    eventCount: countsByCategory.dance,
    featuredEvents: ['Dance Duet', 'Indian Group (Non-themed)', 'Classical Group']
  }
];

// Dual-pass ring (10 items) so 3D cylinder/orbit wraps smoothly with rich depth
const RING_ITEMS = [...CATEGORY_ITEMS, ...CATEGORY_ITEMS];

interface EventCategoriesCarouselProps {
  initialViewMode?: 'carousel' | 'grid';
  showHeading?: boolean;
}

export default function EventCategoriesCarousel({
  initialViewMode = 'carousel',
  showHeading = false
}: EventCategoriesCarouselProps) {
  const router = useRouter();
  const isMounted = useMounted();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [userViewMode, setUserViewMode] = useState<'carousel' | 'grid' | null>(null);
  const [cardWidth, setCardWidth] = useState(250);

  const viewMode = userViewMode ?? (prefersReducedMotion ? 'grid' : initialViewMode);

  // Normalize active index to 0..4
  const normalizedIndex = useMemo(() => {
    return ((activeIndex % CATEGORY_ITEMS.length) + CATEGORY_ITEMS.length) % CATEGORY_ITEMS.length;
  }, [activeIndex]);

  const currentCategory = CATEGORY_ITEMS[normalizedIndex];

  const handleStepCategory = useCallback((delta: number) => {
    setActiveIndex((prev) => {
      const len = CATEGORY_ITEMS.length;
      const current = ((prev % len) + len) % len;
      return (current + delta + len) % len;
    });
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 480) {
          setCardWidth(180);
        } else if (window.innerWidth < 768) {
          setCardWidth(215);
        } else {
          setCardWidth(260);
        }
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleIndexChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleItemClick = useCallback((item: CircularCarouselItem) => {
    const categoryItem = item as CategoryCarouselItem;
    if (categoryItem && typeof categoryItem.slug === 'string') {
      router.push(`/events/${categoryItem.slug}`);
    }
  }, [router]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Accessible semantic navigation landmark for screen readers and SEO */}
      <nav aria-label="Event Categories Overview" className="sr-only">
        <h2>Festival Disciplines &amp; Event Categories</h2>
        <ul>
          {CATEGORY_ITEMS.map((cat) => (
            <li key={`sr-${cat.slug}`}>
              <Link href={`/events/${cat.slug}`}>
                {cat.title} ({cat.eventCount} Competitions) — {cat.tagline}. {cat.description}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* No-JavaScript Static HTML Fallback */}
      <noscript>
        <div className="w-full max-w-6xl my-8 p-6 rounded-3xl bg-white/90 border border-[#3D246C]/20 text-[#3D246C]">
          <h2 className="text-xl font-bold font-tech text-[#3D246C] mb-4">
            Festival Disciplines (Static HTML Overview)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORY_ITEMS.map((cat) => (
              <div key={`nojs-${cat.slug}`} className="p-6 rounded-2xl bg-[#FFDBC3]/50 border border-[#3D246C]/15 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#3D246C]">{cat.title}</h3>
                    <span className="text-xs font-mono text-[#5C4B99]">({cat.eventCount} Events)</span>
                  </div>
                  <p className="text-xs text-[#5C4B99] mb-2">{cat.tagline}</p>
                  <p className="text-xs text-[#3D246C]/80 mb-4">{cat.description}</p>
                </div>
                <a
                  href={`/events/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C4B99] hover:underline"
                >
                  <span>Explore {cat.title} Guidelines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </noscript>

      {showHeading && (
        <div className="max-w-3xl text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] text-xs font-tech font-bold uppercase tracking-wider text-[#3D246C] mb-3 shadow-xs">
            <span>Curated Disciplines • {eventCount} Competitions</span>
          </div>
          <h2 className="font-angular-bold text-3xl sm:text-5xl text-[#3D246C] tracking-tight">
            Event Categories
          </h2>
          <p className="mt-2 font-serif italic text-lg sm:text-xl font-medium text-[#5C4B99]">
            Five expressive arenas of Team Onyx.
          </p>
          <p className="mt-2.5 text-sm sm:text-base text-[#3D246C]/85 font-normal leading-relaxed max-w-2xl mx-auto">
            Drag, spin, or use arrow keys on the stage to inspect competition guidelines across Art, Literary, Music, Theatre, and Dance.
          </p>
        </div>
      )}

      {/* Control Bar: View Mode Switcher (3D Carousel vs. Accessible Grid) & Quick Jump */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-2">
        {/* Category Quick Jump Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Jump to discipline">
          {CATEGORY_ITEMS.map((cat, idx) => {
            const isActive = currentCategory.slug === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                }}
                className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-tech font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] ${
                  isActive
                    ? 'bg-[#5C4B99] text-white shadow-md shadow-[#5C4B99]/30'
                    : 'bg-[#FFFCF5] text-[#3D246C] hover:bg-white border border-[rgba(61,36,108,0.16)]'
                }`}
                aria-pressed={isActive}
              >
                <CategoryIcon category={cat.slug} size={15} />
                <span>{cat.title}</span>
                <span className="text-xs opacity-90 font-tech">({cat.eventCount})</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: 3D vs. Accessible Grid */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] shrink-0">
          <button
            type="button"
            onClick={() => setUserViewMode('carousel')}
            aria-pressed={viewMode === 'carousel'}
            className={`min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-tech font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] ${
              viewMode === 'carousel'
                ? 'bg-[#5C4B99] text-white shadow-sm'
                : 'text-[#3D246C] hover:bg-[#FFDBC3]/40'
            }`}
            title="Switch to 3D Rotating Stage"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>3D Stage</span>
          </button>
          <button
            type="button"
            onClick={() => setUserViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
            className={`min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-tech font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] ${
              viewMode === 'grid'
                ? 'bg-[#5C4B99] text-white shadow-sm'
                : 'text-[#3D246C] hover:bg-[#FFDBC3]/40'
            }`}
            title="Switch to Accessible Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'carousel' ? (
        <div className="w-full max-w-6xl flex flex-col items-center">
          {/* 3D Circular Carousel Stage */}
          <div 
            className="w-full h-[380px] sm:h-[480px] md:h-[540px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#9F91CC]/30 via-white/85 to-[#FFDBC3] border border-[rgba(61,36,108,0.16)] shadow-2xl"
          >
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#9F91CC]/25 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[250px] bg-[#5C4B99]/15 rounded-full blur-[90px] pointer-events-none" />

            {/* Prompt Hint */}
            <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none z-10 px-4">
              <span className="px-3.5 py-1.5 rounded-full bg-[#FFFCF5]/95 border border-[rgba(61,36,108,0.16)] text-xs text-[#3D246C] font-tech font-semibold flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#5C4B99]" aria-hidden="true" />
                <span>Drag to spin • Focus stage &amp; press ← → • Click card to open</span>
              </span>
            </div>

            {/* React Bits CircularCarousel */}
            {isMounted && (
              <CircularCarousel
                items={RING_ITEMS}
                preset="cylinder"
                intro="rise"
                cardWidth={cardWidth}
                aspectRatio={1.3}
                speed={14}
                gap={cardWidth < 200 ? 16 : 28}
                draggable={true}
                momentum={0.65}
                snap={false}
                pauseOnHover={true}
                focusOnClick={false}
                captions={true}
                fadeColor="#FFDBC3"
                innerShade={0.25}
                cornerRadius={16}
                direction="left"
                autoplay="drift"
                onChange={handleIndexChange}
                onItemClick={handleItemClick}
              />
            )}
          </div>

          {/* Active Category Details Spotlight Card */}
          <div className="w-full max-w-4xl mt-6 p-6 sm:p-8 rounded-3xl bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] shadow-lg transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Category Info */}
              <div className="space-y-3 flex-1">
                <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#9F91CC]/25 border border-[rgba(61,36,108,0.16)] text-[#5C4B99] shadow-inner shrink-0">
                      <CategoryIcon category={currentCategory.slug} size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-angular-bold text-2xl sm:text-3xl text-[#3D246C] tracking-tight">
                          {currentCategory.title}
                        </h3>
                        <span 
                          className="px-3 py-0.5 rounded-full text-xs font-tech font-bold border border-[rgba(61,36,108,0.16)] bg-[#FFDBC3] text-[#3D246C]"
                        >
                          {currentCategory.eventCount} Competitions
                        </span>
                      </div>
                      <p className="font-serif italic text-base sm:text-lg text-[#5C4B99] mt-0.5 font-semibold">
                        {currentCategory.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Active Slide Stepper Controls */}
                  <div className="flex items-center gap-1.5" role="group" aria-label="Cycle active discipline">
                    <button
                      type="button"
                      onClick={() => handleStepCategory(-1)}
                      aria-label={`Previous discipline (currently ${currentCategory.title})`}
                      className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl bg-white hover:bg-[#FFDBC3]/50 text-[#3D246C] border border-[rgba(61,36,108,0.16)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-2.5 text-xs font-tech font-bold text-[#3D246C] tabular-nums" aria-live="polite">
                      {String(normalizedIndex + 1).padStart(2, '0')} / {String(CATEGORY_ITEMS.length).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStepCategory(1)}
                      aria-label={`Next discipline (currently ${currentCategory.title})`}
                      className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl bg-white hover:bg-[#FFDBC3]/50 text-[#3D246C] border border-[rgba(61,36,108,0.16)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-[#3D246C]/85 leading-relaxed font-normal max-w-[65ch]">
                  {currentCategory.description}
                </p>

                {/* Sub-event tags */}
                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-tech text-[#5C4B99] font-bold uppercase tracking-wider mr-1">
                    Featured:
                  </span>
                  {currentCategory.featuredEvents.map((ev) => (
                    <span
                      key={ev}
                      className="px-2.5 py-1 rounded-lg bg-[#FFDBC3]/65 border border-[rgba(61,36,108,0.16)] text-xs font-tech font-medium text-[#3D246C]"
                    >
                      {ev}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <Link
                  href={`/events/${currentCategory.slug}`}
                  className="clay-btn-primary min-h-[48px] bg-[#5C4B99] hover:bg-[#4C3C82] text-white px-6 py-3 rounded-xl font-tech font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
                >
                  <span>Explore {currentCategory.title} Competitions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/schedule"
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-white hover:bg-[#FFDBC3]/40 text-[#3D246C] border border-[rgba(61,36,108,0.16)] text-xs font-tech font-semibold flex items-center justify-center gap-2 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
                >
                  <Layers className="w-3.5 h-3.5 text-[#5C4B99]" />
                  <span>Check Category Timings</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      ) : (
        /* Accessible Responsive Card Grid View (Full semantic HTML fallback) */
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_ITEMS.map((cat) => (
            <div
              key={`grid-${cat.slug}`}
              className="p-6 sm:p-7 rounded-3xl bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] hover:border-[rgba(92,75,153,0.40)] shadow-md flex flex-col justify-between transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#9F91CC]/25 border border-[rgba(61,36,108,0.16)] text-[#5C4B99] shadow-inner">
                    <CategoryIcon category={cat.slug} size={26} />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-tech bg-[#FFDBC3] text-[#3D246C] border border-[rgba(61,36,108,0.16)]">
                    {cat.eventCount} Events
                  </span>
                </div>

                <div>
                  <h3 className="font-angular-bold text-xl text-[#3D246C]">{cat.title}</h3>
                  <p className="font-serif italic text-base text-[#5C4B99] font-semibold mt-0.5">{cat.tagline}</p>
                </div>

                <p className="text-sm text-[#3D246C]/85 leading-relaxed font-normal">
                  {cat.description}
                </p>

                <div className="pt-1 flex flex-wrap gap-1.5">
                  {cat.featuredEvents.map((fe) => (
                    <span key={fe} className="px-2.5 py-1 rounded-lg bg-[#FFDBC3]/65 border border-[rgba(61,36,108,0.16)] text-xs text-[#3D246C] font-tech font-medium">
                      {fe}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(61,36,108,0.16)] flex items-center justify-between gap-2">
                <Link
                  href={`/events/${cat.slug}`}
                  className="clay-btn-primary min-h-[44px] bg-[#5C4B99] hover:bg-[#4C3C82] text-white px-4 py-2 rounded-xl text-xs font-tech font-bold flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
                >
                  <span>Explore Guidelines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/schedule"
                  className="min-h-[44px] inline-flex items-center px-2 text-xs font-tech font-semibold text-[#3D246C] hover:text-[#5C4B99] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded-lg"
                >
                  Timings &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
