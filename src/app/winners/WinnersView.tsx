'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { WinnerEntry } from '@/types/content';
import {
  Trophy,
  Search,
  Award,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Compass,
  Calendar,
  X,
} from 'lucide-react';

interface WinnersViewProps {
  winners: WinnerEntry[];
}

type PillarKey = 'all' | 'art' | 'literary' | 'music' | 'theatre' | 'dance';

const PILLAR_FILTERS: { id: PillarKey; label: string }[] = [
  { id: 'all', label: 'All Pillars' },
  { id: 'art', label: 'Art' },
  { id: 'literary', label: 'Literary' },
  { id: 'music', label: 'Music' },
  { id: 'theatre', label: 'Theatre' },
  { id: 'dance', label: 'Dance' },
];

const PILLAR_LABELS: Record<Exclude<PillarKey, 'all'>, string> = {
  art: 'Art',
  literary: 'Literary',
  music: 'Music',
  theatre: 'Theatre',
  dance: 'Dance',
};

function classifyWinnerEvent(eventName: string): Exclude<PillarKey, 'all'> {
  const n = eventName.toLowerCase();
  if (n.includes('dance')) {
    return 'dance';
  }
  if (n.includes('singing') || n.includes('music') || n.includes('bands')) {
    return 'music';
  }
  if (
    n.includes('mime') ||
    n.includes('film') ||
    n.includes('reel') ||
    n.includes('mono acting') ||
    n.includes('street play') ||
    n.includes('proscenium') ||
    n.includes('theatre')
  ) {
    return 'theatre';
  }
  if (
    n.includes('painting') ||
    n.includes('photography') ||
    n.includes('poster') ||
    n.includes('mehendi') ||
    n.includes('rangoli') ||
    n.includes('sketch') ||
    n.includes('greeting card') ||
    n.includes('collage')
  ) {
    return 'art';
  }
  return 'literary';
}

export function WinnersView({ winners }: WinnersViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<PillarKey>('all');

  const pillarCounts = useMemo(() => {
    const counts: Record<PillarKey, number> = {
      all: winners.length,
      art: 0,
      literary: 0,
      music: 0,
      theatre: 0,
      dance: 0,
    };
    for (const entry of winners) {
      counts[classifyWinnerEvent(entry.eventName)] += 1;
    }
    return counts;
  }, [winners]);

  const filteredWinners = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return winners.filter((entry) => {
      const pillar = classifyWinnerEvent(entry.eventName);
      if (selectedPillar !== 'all' && pillar !== selectedPillar) {
        return false;
      }
      if (!q) return true;
      return (
        entry.eventName.toLowerCase().includes(q) ||
        (entry.dateAndVenue && entry.dateAndVenue.toLowerCase().includes(q)) ||
        entry.firstPlace.toLowerCase().includes(q) ||
        entry.secondPlace.toLowerCase().includes(q) ||
        entry.thirdPlace.toLowerCase().includes(q)
      );
    });
  }, [winners, searchQuery, selectedPillar]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPillar('all');
  };

  return (
    <section aria-label="Searchable Competition Winners Directory" className="space-y-8">
      {/* Integrity & Privacy Callout (Solid Paper Ivory Surface) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFCF5] border border-[#3D246C]/16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3 text-xs sm:text-sm font-body text-[#3D246C]/90 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-[#4C3C82] shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong className="text-[#3D246C]">Privacy Compliance &amp; Record Notice:</strong> All results below document the{' '}
            <strong className="text-[#3D246C]">Blossoms School of Sciences (Team Onyx) preliminary cycle</strong>. Personal student contact details have been permanently excised.
          </p>
        </div>
        <span className="shrink-0 text-xs font-tech font-bold px-3 py-1 rounded-full bg-[#FFDBC3] text-[#3D246C] border border-[#3D246C]/20">
          Verified Records
        </span>
      </div>

      {/* Operate Toolbar: Search + Pillar Filters */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#3D246C]/16 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <label htmlFor="winners-search" className="sr-only">
              Search winners by event name, student name, class, or register ID
            </label>
            <Search
              className="w-4 h-4 text-[#4C3C82] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="winners-search"
              type="search"
              placeholder="Search event, student name, class, or register ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-xl bg-[#FFFCF5] border border-[#3D246C]/20 text-sm font-body text-[#3D246C] placeholder:text-[#3D246C]/65 focus:outline-none focus:ring-2 focus:ring-[#5C4B99] focus:border-[#5C4B99]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#4C3C82] hover:text-[#3D246C] hover:bg-[#FFDBC3]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Live Results Count */}
          <div className="text-xs sm:text-sm text-[#4C3C82] font-tech font-medium" aria-live="polite">
            Showing <strong className="text-[#3D246C] font-bold">{filteredWinners.length}</strong> of{' '}
            <strong className="text-[#3D246C] font-bold">{winners.length}</strong> competitions
          </div>
        </div>

        {/* Accessible Category Filter Pills */}
        <div
          role="group"
          aria-label="Filter results by cultural pillar"
          className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#3D246C]/12"
        >
          {PILLAR_FILTERS.map((filter) => {
            const isSelected = selectedPillar === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedPillar(filter.id)}
                aria-pressed={isSelected}
                className={`min-h-[40px] px-3.5 py-2 rounded-full text-xs font-tech font-bold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isSelected
                    ? 'bg-[#5C4B99] text-white border-[#5C4B99] shadow-xs'
                    : 'bg-[#FFFCF5] text-[#3D246C] border-[#3D246C]/20 hover:border-[#5C4B99] hover:bg-[#FFDBC3]/40'
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`ml-1.5 text-xs ${
                    isSelected ? 'text-[#FFDBC3]' : 'text-[#4C3C82]'
                  }`}
                >
                  ({pillarCounts[filter.id]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Cards / Grid */}
      {filteredWinners.length === 0 ? (
        <div className="p-10 sm:p-12 text-center bg-white rounded-2xl border border-[#3D246C]/16 shadow-xs space-y-4">
          <p className="font-body text-sm sm:text-base text-[#3D246C] font-medium">
            No competition results match{searchQuery ? ` "${searchQuery}"` : ' the selected filter'}.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#5C4B99] hover:bg-[#4C3C82] text-white text-xs sm:text-sm font-tech font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWinners.map((entry) => {
            const pillar = classifyWinnerEvent(entry.eventName);
            return (
              <article
                key={entry.eventName}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#3D246C]/16 hover:border-[#5C4B99]/50 transition-all flex flex-col justify-between space-y-5 shadow-xs"
              >
                <div>
                  {/* Pillar Badge & Trophy Header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="space-y-1.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFDBC3] text-[#3D246C] border border-[#3D246C]/15 text-xs font-tech font-bold uppercase tracking-wider">
                        {PILLAR_LABELS[pillar]}
                      </span>
                      <h2 className="font-tech text-lg sm:text-xl font-bold text-[#3D246C] leading-snug">
                        {entry.eventName}
                      </h2>
                    </div>
                    <span
                      className="shrink-0 p-2 rounded-xl bg-[#FFFCF5] text-[#4C3C82] border border-[#3D246C]/15"
                      aria-hidden="true"
                    >
                      <Trophy className="w-4 h-4" />
                    </span>
                  </div>

                  {entry.dateAndVenue && (
                    <p className="text-xs sm:text-sm font-body font-medium text-[#4C3C82] flex items-center gap-1.5 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" aria-hidden="true" />
                      <span>{entry.dateAndVenue}</span>
                    </p>
                  )}

                  {/* Podium Standings */}
                  <div className="space-y-3 pt-4 border-t border-[#3D246C]/15 font-body">
                    {/* First Place */}
                    <div className="p-3.5 rounded-xl bg-[#FFFCF5] border border-[#5C4B99]/35 space-y-2 shadow-xs">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#5C4B99] text-white text-xs font-tech font-bold">
                          <Award className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>1st Place &bull; Winner</span>
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3D246C] whitespace-pre-line leading-relaxed font-semibold">
                        {entry.firstPlace || '—'}
                      </p>
                    </div>

                    {/* Second Place */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#3D246C]/18 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFDBC3] text-[#3D246C] border border-[#3D246C]/20 text-xs font-tech font-bold">
                          <Award className="w-3.5 h-3.5 text-[#4C3C82]" aria-hidden="true" />
                          <span>2nd Place &bull; Runner-up</span>
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3D246C] whitespace-pre-line leading-relaxed font-medium">
                        {entry.secondPlace || '—'}
                      </p>
                    </div>

                    {/* Third Place */}
                    <div className="p-3.5 rounded-xl bg-[#FFFCF5]/80 border border-[#3D246C]/15 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#9F91CC]/30 text-[#3D246C] border border-[#3D246C]/20 text-xs font-tech font-bold">
                          <Award className="w-3.5 h-3.5 text-[#4C3C82]" aria-hidden="true" />
                          <span>3rd Place</span>
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3D246C]/90 whitespace-pre-line leading-relaxed font-normal">
                        {entry.thirdPlace || '—'}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Navigation Footer Callout (Solid Paper White) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#3D246C]/16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-tech text-base sm:text-lg font-bold text-[#3D246C]">
            Looking for Upcoming 2026–27 Competition Formats?
          </h3>
          <p className="font-body text-xs sm:text-sm text-[#3D246C]/85 max-w-[60ch]">
            Explore the 31 official competitions, evaluation criteria, and tentative prelim schedule timelines for the active cycle.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/events"
            className="clay-btn-primary font-tech min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white inline-flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2"
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>Explore 5 Disciplines</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/schedule"
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#FFFCF5] hover:bg-[#FFDBC3]/50 text-[#3D246C] border border-[#3D246C]/20 text-xs sm:text-sm font-tech font-semibold inline-flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
          >
            <Calendar className="w-4 h-4 text-[#4C3C82]" aria-hidden="true" />
            <span>View Schedule</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
