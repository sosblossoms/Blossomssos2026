import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/data/site-config';
import { eventCount } from '@/data/events';
import { Info, ArrowRight } from 'lucide-react';
import { EventCategoriesCarouselSkeleton } from '@/components/events/EventCategoriesCarouselSkeleton';

// Lazy load the 3D CircularCarousel for optimal initial page performance
const EventCategoriesCarousel = dynamic(
  () => import('@/components/events/EventCategoriesCarousel'),
  {
    loading: () => <EventCategoriesCarouselSkeleton />
  }
);

export const metadata: Metadata = {
  title: 'Festival Disciplines & Arenas | Blossoms SOS 2026–27',
  description: `Explore the ${eventCount} competition events across Art, Literary, Music, Theatre, and Dance at Blossoms School of Sciences with interactive 3D carousel view.`,
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Festival Disciplines & Arenas | Blossoms SOS 2026–27',
    description: `Explore the ${eventCount} competition events across Art, Literary, Music, Theatre, and Dance at Blossoms School of Sciences with interactive 3D carousel view.`,
    url: `${siteConfig.canonicalUrl}/events`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteConfig.canonicalUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Events',
      item: `${siteConfig.canonicalUrl}/events`,
    },
  ],
};

export default function EventsPage() {
  const totalEvents = eventCount;

  return (
    <div className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFDBC3] text-[#3D246C] selection:bg-[#5C4B99] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] text-xs font-tech font-bold uppercase tracking-wider text-[#3D246C] mb-5 shadow-xs">
          <span>School of Sciences • {totalEvents} Official Competitions</span>
        </div>
        <h1 className="font-angular-bold text-4xl sm:text-5xl md:text-6xl text-[#3D246C] tracking-tight leading-none">
          Festival Disciplines
        </h1>
        <p className="mt-3 font-serif italic text-xl sm:text-2xl font-medium text-[#5C4B99] leading-snug">
          Five expressive arenas across Art, Literary, Music, Theatre, and Dance — from flames to flights.
        </p>
        <p className="mt-4 text-sm sm:text-base text-[#3D246C]/85 leading-relaxed font-normal max-w-2xl mx-auto">
          Interact with the 3D discipline ring below or toggle the grid view to explore competition formats, evaluation criteria, and performance guidelines.
        </p>

        {/* Registration Notice */}
        <div className="mt-7 p-4 sm:p-5 rounded-2xl bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] shadow-sm text-xs sm:text-sm text-[#3D246C] flex items-center justify-between flex-wrap gap-4 max-w-2xl mx-auto text-left">
          <p className="leading-relaxed">
            <strong className="font-tech font-bold text-[#3D246C]">Registration Open:</strong>{' '}
            <span className="text-[#3D246C]/85">Slots for School of Sciences preliminary rounds are active. Submit the official form to participate.</span>
          </p>
          {siteConfig.registrationUrl && (
            <a
              href={siteConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn-primary min-h-[44px] inline-flex items-center justify-center bg-[#5C4B99] hover:bg-[#4C3C82] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-tech font-bold shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
            >
              Register Now
            </a>
          )}
        </div>
      </div>

      {/* Interactive Circular Carousel & Category Showcase */}
      <div className="mb-16">
        <EventCategoriesCarousel initialViewMode="carousel" />
      </div>

      {/* Informational Callout */}
      <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[#FFDBC3] border border-[rgba(61,36,108,0.16)] text-[#5C4B99] shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-tech text-lg sm:text-xl font-bold text-[#3D246C]">
              Looking for Competition Timelines?
            </h2>
            <p className="text-sm text-[#3D246C]/85 mt-1 max-w-xl leading-relaxed font-normal">
              Event venues, timings, and tentative prelims schedules for all {totalEvents} competitions are available in the festival schedule view.
            </p>
          </div>
        </div>
        <Link
          href="/schedule"
          className="shrink-0 clay-btn-primary min-h-[48px] bg-[#5C4B99] hover:bg-[#4C3C82] text-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-tech font-bold transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
        >
          <span>View Schedule</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
