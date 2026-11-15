import React from 'react';
import type { Metadata } from 'next';
import { Trophy, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { WinnersView } from './WinnersView';
import { HISTORICAL_WINNERS_2025 } from '@/content/winners';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Hall of Fame & Competition Winners | Blossoms SOS 2026–27',
  description:
    'Verified student winners and podium standings across 33 preliminary competitions at Blossoms School of Sciences (Team Onyx, 2025–26 cycle).',
  alternates: {
    canonical: '/winners',
  },
  openGraph: {
    title: 'Hall of Fame & Competition Winners | Blossoms SOS',
    description:
      'Celebrating School of Sciences podium finishers across Art, Literary, Music, Theatre, and Dance.',
    url: `${siteConfig.canonicalUrl}/winners`,
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
      name: 'Winners',
      item: `${siteConfig.canonicalUrl}/winners`,
    },
  ],
};

const SHOWCASE_PILLS = [
  { icon: Trophy, label: `${HISTORICAL_WINNERS_2025.length} Verified Events` },
  { icon: Award, label: '5 Cultural Pillars' },
  { icon: Sparkles, label: '2025–26 Prelim Cycle' },
  { icon: ShieldCheck, label: 'Privacy Compliant' },
];

export default function WinnersPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 bg-[#FFDBC3] text-[#3D246C] selection:bg-[#5C4B99] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Experience / Persuade Showcase Header */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#3D246C]/20 text-xs font-tech font-bold uppercase tracking-wider text-[#4C3C82] shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-[#5C4B99]" aria-hidden="true" />
            <span>Team Onyx &bull; Hall of Fame Archives</span>
          </div>

          <span className="font-serif italic text-xl sm:text-2xl text-[#4C3C82] block tracking-wide">
            Honouring Stage &amp; Studio Excellence
          </span>

          <h1 className="font-angular text-4xl sm:text-6xl font-black text-[#3D246C] tracking-tight leading-tight">
            Competition Winners &amp; Standings
          </h1>

          <p className="font-body text-base sm:text-lg text-[#3D246C]/90 leading-relaxed max-w-[65ch] mx-auto">
            Celebrating the School of Sciences artists, speakers, musicians, actors, and dancers who earned podium honours across the Blossoms preliminary cycle.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {SHOWCASE_PILLS.map((pill) => {
              const Icon = pill.icon;
              return (
                <div
                  key={pill.label}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#3D246C]/15 shadow-xs text-xs font-tech font-semibold text-[#3D246C]"
                >
                  <Icon className="w-3.5 h-3.5 text-[#4C3C82]" aria-hidden="true" />
                  <span>{pill.label}</span>
                </div>
              );
            })}
          </div>
        </header>

        {/* Operate / Read Hall-of-Fame Directory */}
        <WinnersView winners={HISTORICAL_WINNERS_2025} />
      </div>
    </div>
  );
}
