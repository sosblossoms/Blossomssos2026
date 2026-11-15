import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { HeroBackground } from '@/components/hero/HeroBackground';
import { siteConfig } from '@/data/site-config';
import {
  ArrowRight,
  ExternalLink,
  BookOpen,
  Camera
} from 'lucide-react';
import { EventCategoriesCarouselSkeleton } from '@/components/events/EventCategoriesCarouselSkeleton';
import { WavyDivider } from '@/components/ui/WavyDivider';
import { CampusGreenBoard } from '@/components/notice-board/CampusGreenBoard';
import { UpcomingMainEventsBanner } from '@/components/schedule/UpcomingMainEventsBanner';

// Lazy load the 3D Circular Carousel for peak performance and interactive category ring
const EventCategoriesCarousel = dynamic(
  () => import('@/components/events/EventCategoriesCarousel'),
  {
    loading: () => <EventCategoriesCarouselSkeleton />,
  }
);

const MARQUEE_IMAGES = [
  { src: '/Assets/IMG_0821.webp', alt: 'Blossoms Fest Stage Performance' },
  { src: '/Assets/IMG_0948.webp', alt: 'School of Sciences Cultural Ensemble' },
  { src: '/Assets/sos.webp', alt: 'School of Sciences Team Celebrations' },
  { src: '/Assets/cult1.webp', alt: 'Dance and Theatrical Performance' },
  { src: '/Assets/cult.webp', alt: 'Vibrant Audience & Cheer' },
  { src: '/Assets/Core.webp', alt: 'Blossoms Student Core Committee' },
  { src: '/Assets/cult2.webp', alt: 'Music & Battle of the Bands' },
  { src: '/Assets/cult3.webp', alt: 'Fest Procession & Accolades' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#FFDBC3] text-[#3D246C] selection:bg-[#5C4B99] selection:text-white">
      {/* =========================================================
          1. HERO SECTION (FOCUSED HIERARCHY & 3-SECOND CLARITY)
          ========================================================= */}
      <section aria-labelledby="hero-heading" className="relative">
        <HeroBackground>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-4 sm:gap-5 pt-2 sm:pt-4 pb-4 px-2 sm:px-4">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#FFFCF5]/95 border border-[#3D246C]/20 text-[#4C3C82] text-xs sm:text-sm font-tech font-bold uppercase tracking-[0.14em] shadow-sm">
              <span>CHRIST (Deemed to be University)</span>
            </div>

            {/* Dominant Masthead + Editorial Zine Accent */}
            <div className="space-y-3 max-w-4xl flex flex-col items-center">
              <h1
                id="hero-heading"
                className="font-angular-bold text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.035em] text-[#3D246C] leading-none drop-shadow-[0_2px_0_rgba(255,255,255,0.65)]"
              >
                BLOSSOMS
              </h1>

              {/* Editorial Cormorant Garamond Motto Rule */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md">
                <span className="h-px flex-1 bg-[#3D246C]/25" aria-hidden="true" />
                <span className="font-serif italic text-xl sm:text-2xl font-semibold text-[#4C3C82] tracking-normal">
                  Be the Best
                </span>
                <span className="h-px flex-1 bg-[#3D246C]/25" aria-hidden="true" />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-0.5">
                <p className="font-angular text-xl sm:text-3xl md:text-4xl font-extrabold text-[#3D246C] tracking-tight">
                  School of Sciences &bull; 2026–27
                </p>

                {/* Team Onyx Emblem Badge */}
                <div className="relative h-9 w-32 sm:h-11 sm:w-40 px-2 py-1 rounded-xl bg-[#FFFCF5] border border-[#3D246C]/20 shadow-sm flex items-center justify-center">
                  <Image
                    src="/blossoms_team.webp"
                    alt="Team Onyx Insignia"
                    fill
                    sizes="(max-width: 640px) 128px, 160px"
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Official Slogan Graphic Artwork */}
            <div className="relative w-full max-w-md sm:max-w-2xl md:max-w-3xl h-24 sm:h-32 md:h-40 my-1 flex items-center justify-center">
              <Image
                src="/blossoms_slogan.webp"
                alt="From flames to flights, White Onyx Ignites"
                fill
                sizes="(max-width: 640px) 448px, (max-width: 768px) 672px, 768px"
                className="object-contain drop-shadow-[0_2px_14px_rgba(61,36,108,0.22)]"
                priority
              />
            </div>

            {/* Two Primary Actions - Clear, Focused & Ergonomic on Mobile */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto max-w-xs sm:max-w-none items-stretch sm:items-center justify-center gap-3.5 pt-2">
              {siteConfig.registrationUrl && (
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="register-button"
                  className="clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white font-tech min-h-[48px] px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFDBC3]"
                >
                  <span>Register Now</span>
                </a>
              )}

              <Link
                href="#events"
                className="clay-btn-accent bg-[#9F91CC] hover:bg-[#8D7DBE] text-[#3D246C] font-tech min-h-[48px] px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFDBC3]"
              >
                <span>Explore 31 Events</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </HeroBackground>
      </section>

      {/* Decorative Divider from Hero to Event Categories */}
      <WavyDivider topColor="#FFDBC3" bottomFill="#F1D0C5" />

      {/* =========================================================
          2. EVENT DISCOVERY: THE FIVE FOUNDATIONAL DISCIPLINES
          ========================================================= */}
      <section
        id="events"
        className="py-16 sm:py-24 bg-[#F1D0C5] scroll-mt-24 sm:scroll-mt-28"
        aria-labelledby="disciplines-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-end gap-6 pb-8 mb-10 sm:mb-14 border-b border-[#3D246C]/15">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-[0.2em] text-[#4C3C82] font-tech font-bold block mb-2">
                Foundational Disciplines
              </span>
              <h2
                id="disciplines-heading"
                className="font-angular text-3xl sm:text-5xl font-black text-[#3D246C] tracking-tight"
              >
                Event Categories
              </h2>
            </div>
            <p className="lg:col-span-5 font-body text-sm sm:text-base text-[#3D246C]/90 font-normal leading-relaxed border-l-2 border-[#5C4B99]/45 pl-4">
              Explore rules, evaluation rubrics, and schedules for all 31 official festival competitions across Art, Literary, Music, Theatre, and Dance.
            </p>
          </div>

          {/* Interactive 3D Category Carousel Showcase with Grid Toggle */}
          <div className="w-full">
            <EventCategoriesCarousel initialViewMode="carousel" />
          </div>
        </div>
      </section>

      {/* Decorative Divider from Event Categories to Notice Board */}
      <WavyDivider topColor="#F1D0C5" bottomFill="#FFDBC3" />

      {/* =========================================================
          3. MINI CAMPUS GREEN NOTICE BOARD (WEEKLY UPDATES PREVIEW)
          ========================================================= */}
      <section
        id="notice-board-preview"
        aria-labelledby="mini-notice-board-heading"
        className="py-16 sm:py-20 bg-[#FFDBC3] scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#3D246C]/15">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#4C3C82] block">
                School of Sciences Corridor &bull; Weekly Updates
              </span>
              <h2
                id="mini-notice-board-heading"
                className="font-angular text-3xl sm:text-4xl font-black text-[#3D246C] tracking-tight"
              >
                Campus Notice Board
              </h2>
              <p className="font-body text-sm sm:text-base text-[#3D246C]/90 leading-relaxed">
                Check pinned circulars, theme reveals, deadlines, and what&apos;s happening this week across Blossoms SOS.
              </p>
            </div>

            <Link
              href="/notice-board"
              className="clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white font-tech min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-md self-start md:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFDBC3]"
            >
              <span>Interactive Weekly Radar</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <UpcomingMainEventsBanner />

          <CampusGreenBoard mode="mini" />
        </div>
      </section>

      {/* Decorative Divider from Notice Board to Handouts */}
      <WavyDivider topColor="#FFDBC3" bottomFill="rgba(159, 145, 204, 0.15)" />

      {/* =========================================================
          4. OFFICIAL HANDOUTS & GUIDELINES (ASYMMETRIC ZINE SPREAD)
          ========================================================= */}
      <section
        id="posters-section"
        aria-labelledby="handouts-heading"
        className="py-16 sm:py-24 bg-[#9F91CC]/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Editorial Sticky Rail */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
              <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#4C3C82] block">
                Official Handouts &amp; Guidelines
              </span>
              <h2
                id="handouts-heading"
                className="font-angular text-3xl sm:text-4xl font-black text-[#3D246C] tracking-tight leading-tight"
              >
                Blossoms 2026–27 Handouts
              </h2>
              <div className="w-16 h-0.5 bg-[#5C4B99]/50" aria-hidden="true" />
              <p className="font-body text-sm sm:text-base text-[#3D246C]/90 font-normal leading-relaxed">
                Review official competition formats, judging rubrics, time limits, and registration guidelines across all 31 events.
              </p>
            </div>

            {/* Right Staggered Editorial Folios */}
            <div className="lg:col-span-8 space-y-6">
              {/* 1. Blossoms Rulebook 2026–27 */}
              {siteConfig.rulebookUrl && (
                <a
                  href={siteConfig.rulebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl overflow-hidden bg-[#FFFCF5] border border-[#3D246C]/16 hover:border-[#5C4B99]/45 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] flex flex-col sm:flex-row items-center gap-6 p-5 sm:p-7 text-center sm:text-left"
                >
                  {/* Rulebook Poster Preview */}
                  <div className="relative aspect-[3/4] w-44 sm:w-48 shrink-0 rounded-xl overflow-hidden bg-white border border-[#3D246C]/15 shadow-sm">
                    <Image
                      src="/blossoms_rulebook_2026_27.webp"
                      alt="Blossoms Rulebook 2026–27 Cover"
                      fill
                      sizes="(max-width: 640px) 176px, 192px"
                      className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  </div>

                  {/* Content Alongside Poster */}
                  <div className="flex flex-col items-center sm:items-start space-y-3 flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C4B99]/10 text-[#4C3C82] text-xs font-tech font-bold uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Official Guide &bull; 31 Events</span>
                    </div>

                    <h3 className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C] tracking-tight group-hover:text-[#5C4B99] transition-colors">
                      Blossoms Rulebook 2026–27
                    </h3>

                    <p className="font-body text-sm text-[#3D246C]/90 leading-relaxed max-w-md">
                      Exhaustive competition formats, judging rubrics, time limits, and props guidelines across all 5 cultural pillars.
                    </p>

                    <div className="pt-2">
                      <span className="clay-btn-primary bg-[#5C4B99] group-hover:bg-[#4C3C82] text-white font-tech min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-md transition-colors">
                        <span>Open Rulebook (Google Drive)</span>
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </a>
              )}

              {/* 2. Blossoms Know More 2026–27 (Reversed Zine Composition) */}
              {siteConfig.knowMoreUrl && (
                <a
                  href={siteConfig.knowMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl overflow-hidden bg-white border border-[#3D246C]/16 hover:border-[#5C4B99]/45 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] flex flex-col sm:flex-row-reverse items-center gap-6 p-5 sm:p-7 text-center sm:text-left"
                >
                  {/* Know More Poster Preview */}
                  <div className="relative aspect-[3/4] w-44 sm:w-48 shrink-0 rounded-xl overflow-hidden bg-[#FFFCF5] border border-[#3D246C]/15 shadow-sm">
                    <Image
                      src="/blossoms_knowmore_2026_27.webp"
                      alt="Blossoms Know More 2026–27 Cover"
                      fill
                      sizes="(max-width: 640px) 176px, 192px"
                      className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  </div>

                  {/* Content Alongside Poster */}
                  <div className="flex flex-col items-center sm:items-start space-y-3 flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9F91CC]/25 text-[#3D246C] text-xs font-tech font-bold uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 text-[#4C3C82]" aria-hidden="true" />
                      <span>Official Handbook &bull; Team Onyx</span>
                    </div>

                    <h3 className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C] tracking-tight group-hover:text-[#5C4B99] transition-colors">
                      Blossoms Know More 2026–27
                    </h3>

                    <p className="font-body text-sm text-[#3D246C]/90 leading-relaxed max-w-md">
                      Comprehensive festival handbook with registration QR, Team Onyx identity, and School of Sciences orientation.
                    </p>

                    <div className="pt-2">
                      <span className="clay-btn-primary bg-[#5C4B99] group-hover:bg-[#4C3C82] text-white font-tech min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-md transition-colors">
                        <span>Open Know More (Google Drive)</span>
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. ABOUT BLOSSOMS & TEAM ONYX SECTION
          ========================================================= */}
      <section
        id="team"
        aria-labelledby="about-heading"
        className="pt-4 pb-16 sm:pb-24 bg-[#9F91CC]/15 scroll-mt-24 sm:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#3D246C]/15 pt-14 sm:pt-16">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#4C3C82] block mb-2">
              The Heritage
            </span>
            <h2
              id="about-heading"
              className="font-angular text-3xl sm:text-5xl font-black text-[#3D246C] tracking-tight"
            >
              About Blossoms
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Descriptive Content & Team Onyx Dossier */}
            <div className="lg:col-span-7 space-y-8">
              <p className="font-body text-base sm:text-lg text-[#3D246C] leading-relaxed font-normal max-w-[65ch]">
                Blossoms is the intra-deanery cultural fest at CHRIST (Deemed To Be University) Bangalore with the motto{' '}
                <span className="font-serif italic text-xl sm:text-2xl text-[#4C3C82] font-bold">
                  &lsquo;Be the best&rsquo;
                </span>
                . This is a unique venture where all 7,000 students of the university participate in cultural competitions. The events are divided into five categories—Art, Literary, Music, Theatre, and Dance—celebrating artistic excellence, scientific heritage, and academic distinction.
              </p>

              {/* Team Onyx Identity Dossier */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFCF5] border border-[#3D246C]/18 shadow-md space-y-5">
                <div className="flex items-center justify-between border-b border-[#3D246C]/15 pb-4">
                  <h3 className="font-tech text-lg sm:text-xl font-bold text-[#3D246C]">
                    Representing School of Sciences: Team Onyx
                  </h3>
                </div>

                {/* Divided Editorial Ledger */}
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#3D246C]/15 rounded-xl bg-[#FFDBC3]/45 border border-[#3D246C]/15 overflow-hidden">
                  <div className="p-4 space-y-1.5">
                    <span className="text-xs text-[#4C3C82] font-tech font-bold uppercase tracking-wider block">
                      Team Name
                    </span>
                    <p className="font-tech font-bold text-base text-[#3D246C]">Onyx</p>
                    <p className="font-body text-xs sm:text-sm text-[#3D246C]/90 leading-relaxed">
                      Strength, resilience &amp; polished excellence.
                    </p>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <span className="text-xs text-[#4C3C82] font-tech font-bold uppercase tracking-wider block">
                      Team Color
                    </span>
                    <p className="font-tech font-bold text-base text-[#3D246C]">White</p>
                    <p className="font-body text-xs sm:text-sm text-[#3D246C]/90 leading-relaxed">
                      Clarity, brilliance &amp; empowering unity.
                    </p>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <span className="text-xs text-[#4C3C82] font-tech font-bold uppercase tracking-wider block">
                      Team Slogan
                    </span>
                    <p className="font-tech font-bold text-base text-[#3D246C]">&ldquo;White Onyx Ignites&rdquo;</p>
                    <p className="font-body text-xs sm:text-sm text-[#3D246C]/90 leading-relaxed">
                      From flames to flights, White Onyx Ignites.
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 min-h-[44px] text-xs sm:text-sm font-tech font-bold text-[#4C3C82] hover:text-[#3D246C] transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
                  >
                    <span>Read full School of Sciences Journey</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Autoplay Looping Festival Video */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#3D246C]/20 shadow-xl bg-white aspect-video sm:aspect-[4/5] flex items-center justify-center">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                  poster="/Assets/cult1.webp"
                >
                  <source src="/blossoms-24.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-center text-xs text-[#3D246C]/90 mt-3 font-tech font-semibold">
                Blossoms Festival Reel Highlights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider from About to Photo Marquee */}
      <WavyDivider topColor="rgba(159, 145, 204, 0.15)" bottomFill="#FFDBC3" />

      {/* =========================================================
          6. FESTIVAL HIGHLIGHTS & STAGE ENERGY (PHOTO MARQUEE)
          ========================================================= */}
      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="py-16 sm:py-20 overflow-hidden bg-[#FFDBC3] scroll-mt-24 sm:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#4C3C82] block mb-2">
              Festival Gallery &bull; Moments &amp; Memories
            </span>
            <h2
              id="gallery-heading"
              className="font-angular text-3xl sm:text-4xl font-black text-[#3D246C] tracking-tight"
            >
              Festival Highlights &amp; Stage Energy
            </h2>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#FFFCF5] hover:bg-white text-[#3D246C] border border-[#3D246C]/20 text-xs sm:text-sm font-tech font-bold shadow-sm hover:shadow-md transition-all self-start md:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
          >
            <Camera className="w-4 h-4 text-[#4C3C82]" aria-hidden="true" />
            <span>Explore Full Festival Photo Archives &bull; 31 Events</span>
            <ArrowRight className="w-4 h-4 text-[#4C3C82]" aria-hidden="true" />
          </Link>
        </div>

        {/* Infinite Photo Marquee Track */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="animate-marquee gap-6 flex">
            {/* Set 1 */}
            {MARQUEE_IMAGES.map((img, idx) => (
              <div
                key={`m1-${idx}`}
                className="relative w-72 sm:w-80 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#3D246C]/15 shadow-lg bg-white group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#3D246C]/85 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                  <span className="text-xs text-[#FFDBC3] font-medium font-tech">{img.alt}</span>
                </div>
              </div>
            ))}
            {/* Set 2 (Purely decorative clones for seamless infinite loop) */}
            <div aria-hidden="true" role="presentation" className="flex gap-6">
              {MARQUEE_IMAGES.map((img, idx) => (
                <div
                  key={`m2-${idx}`}
                  className="relative w-72 sm:w-80 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#3D246C]/15 shadow-lg bg-white group"
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 288px, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#3D246C]/85 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                    <span className="text-xs text-[#FFDBC3] font-medium font-tech">{img.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider from Gallery to Registration Banner */}
      <WavyDivider topColor="#FFDBC3" bottomFill="rgba(159, 145, 204, 0.15)" />

      {/* =========================================================
          7. REGISTRATION BOTTOM BANNER
          ========================================================= */}
      {siteConfig.registrationUrl && (
        <section
          aria-labelledby="register-banner-heading"
          className="py-16 sm:py-20 bg-[#9F91CC]/15"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-10 md:p-12 rounded-2xl bg-[#FFFCF5] border border-[#3D246C]/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="text-center sm:text-left space-y-1.5 w-full sm:w-auto">
                <span className="text-xs uppercase tracking-[0.2em] text-[#4C3C82] font-tech font-bold block">
                  Represent the School of Sciences
                </span>
                <h2
                  id="register-banner-heading"
                  className="font-angular text-xl sm:text-3xl font-extrabold text-[#3D246C]"
                >
                  Ready to compete in Blossoms?
                </h2>
                <p className="font-body text-sm sm:text-base text-[#3D246C]/90">
                  Fill the official registration form to confirm your slot in preliminary auditions.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white font-tech min-h-[48px] px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] w-full sm:w-auto text-center"
                >
                  <span>Register Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
