'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Users,
  GraduationCap,
  Mail,
  X,
  Building2,
} from 'lucide-react';
import { BlossomTeamMember, BLOSSOMS_TEAM_MEMBERS } from '@/data/team-departments';
import { siteConfig } from '@/data/site-config';

const STUDENT_SUB_TEAMS = [
  { id: 'all', label: 'All Teams' },
  { id: 'core', label: 'Core Committee' },
  { id: 'logistics', label: 'Logistics Team' },
  { id: 'hospitality', label: 'Hospitality Team' },
  { id: 'media', label: 'Media Team' },
  { id: 'discipline', label: 'Discipline Team' },
  { id: 'pr', label: 'Registration Team' },
] as const;

export function OurTeamsSection() {
  const [activeSection, setActiveSection] = useState<'faculty' | 'student'>('student');
  const [selectedSubTeam, setSelectedSubTeam] = useState<string>('all');
  const [activeMember, setActiveMember] = useState<BlossomTeamMember | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!activeMember) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    modalCloseBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMember(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      lastFocusedRef.current?.focus?.();
    };
  }, [activeMember]);

  // Filter members based on section & working team
  const displayedMembers = useMemo(() => {
    if (activeSection === 'faculty') {
      return BLOSSOMS_TEAM_MEMBERS.filter((m) => m.category === 'faculty');
    }
    return BLOSSOMS_TEAM_MEMBERS.filter((m) => {
      if (m.category !== 'student') return false;
      if (selectedSubTeam === 'all') return true;
      return m.departmentKey === selectedSubTeam;
    });
  }, [activeSection, selectedSubTeam]);

  return (
    <div className="relative w-full rounded-3xl bg-[#FFDBC3] text-[#3D246C] py-12 px-4 sm:px-6 lg:px-10 overflow-hidden shadow-sm border border-[#3D246C]/15">

      {/* ── Subtle Ambient Refractions (Homepage Palette: Lavender #9F91CC & Royal Purple #5C4B99) ── */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9F91CC]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5C4B99]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">

        {/* ── Two-Section Top Switcher (Faculty Advisors vs Core & Student Team) ── */}
        <div className="flex items-center justify-center">
          <div
            className="inline-flex p-1.5 rounded-2xl bg-[#FFDBC3]/50 border border-[#3D246C]/15 shadow-xs gap-2"
            role="tablist"
            aria-label="Team Sections"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeSection === 'faculty'}
              onClick={() => {
                setActiveSection('faculty');
                setSelectedSubTeam('all');
              }}
              className={`min-h-[44px] font-tech text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] ${activeSection === 'faculty'
                  ? 'bg-[#5C4B99] text-white shadow-md shadow-[#5C4B99]/25 font-bold'
                  : 'bg-transparent text-[#4C3C82] hover:text-[#3D246C] hover:bg-white/80'
                }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Faculty Advisors</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeSection === 'student'}
              onClick={() => setActiveSection('student')}
              className={`min-h-[44px] font-tech text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] ${activeSection === 'student'
                  ? 'bg-[#5C4B99] text-white shadow-md shadow-[#5C4B99]/25 font-bold'
                  : 'bg-transparent text-[#4C3C82] hover:text-[#3D246C] hover:bg-white/80'
                }`}
            >
              <Users className="w-4 h-4" />
              <span>Core Team &amp; Working Groups</span>
            </button>
          </div>
        </div>

        {/* ── Symmetrical Diamond Ornamental Header (Exact Vector Flourish in Brand Palette) ── */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">

          {/* Symmetrical Spearhead Diamond Flourish Row */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-[#5C4B99]">
            {/* Left Wing Flourish */}
            <svg
              className="w-14 sm:w-24 h-4.5 text-[#5C4B99]"
              viewBox="0 0 100 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <line x1="0" y1="8" x2="62" y2="8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
              <circle cx="68" cy="8" r="2.2" fill="currentColor" />
              <path d="M 74 8 L 84 2 L 96 8 L 84 14 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 84 4.5 L 90 8 L 84 11.5 L 78 8 Z" fill="currentColor" />
            </svg>

            {/* Title: "Our Team" in Luxury Cormorant Garamond Serif */}
            <h2 id="our-teams-heading" className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold italic text-[#3D246C] tracking-wide whitespace-nowrap drop-shadow-sm">
              Our Team
            </h2>

            {/* Right Wing Flourish */}
            <svg
              className="w-14 sm:w-24 h-4.5 text-[#5C4B99] rotate-180"
              viewBox="0 0 100 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <line x1="0" y1="8" x2="62" y2="8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
              <circle cx="68" cy="8" r="2.2" fill="currentColor" />
              <path d="M 74 8 L 84 2 L 96 8 L 84 14 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 84 4.5 L 90 8 L 84 11.5 L 78 8 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Subtitle in Brand Primary Royal Purple Serif */}
          <p className="font-serif text-sm sm:text-base text-[#5C4B99] italic leading-relaxed">
            {activeSection === 'faculty'
              ? 'Deanery of Science Cultural Coordinators & Advisory Mentors'
              : 'School of Sciences Student Coordinators & Working Committees'}
          </p>

          <p className="font-tech text-xs text-[#4C3C82] uppercase tracking-[0.2em] font-semibold pt-0.5">
            CHRIST (Deemed to be University) &bull; Team Onyx
          </p>
        </div>

        {/* ── Sub-Team Category Filter Pills (Logistics, Hospitality, Media, etc.) ── */}
        {activeSection === 'student' && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {STUDENT_SUB_TEAMS.map((sub) => {
              const isActive = selectedSubTeam === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubTeam(sub.id)}
                  aria-pressed={isActive}
                  className={`min-h-[44px] font-tech text-xs px-4 py-2 rounded-full border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] ${isActive
                      ? 'bg-[#5C4B99] text-white border-[#5C4B99] font-bold shadow-xs'
                      : 'bg-white text-[#3D246C] border-[#3D246C]/15 hover:bg-[#FFDBC3]/40 hover:border-[#5C4B99]/40 hover:text-[#5C4B99] font-medium'
                    }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Result Status Counter ── */}
        <div className="flex items-center justify-between text-xs font-tech text-[#4C3C82] px-2 max-w-6xl mx-auto border-b border-[#3D246C]/15 pb-3">
          <span>
            Displaying <strong className="text-[#3D246C]">{displayedMembers.length}</strong> {activeSection === 'faculty' ? 'faculty advisors' : 'team coordinators'}
          </span>
          {activeSection === 'student' && selectedSubTeam !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedSubTeam('all')}
              className="min-h-[44px] px-2 text-[#4C3C82] hover:text-[#3D246C] hover:underline font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] rounded"
            >
              View All Teams
            </button>
          )}
        </div>

        {/* ── Arched Silhouette Card Grid in Homepage Palette (Peach / Lavender / Royal Purple / Deep Purple) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 max-w-6xl mx-auto">
          {displayedMembers.map((member, index) => (
            <button
              key={member.id}
              type="button"
              onClick={() => setActiveMember(member)}
              aria-label={`Inspect profile for ${member.name}, ${member.role}`}
              className="group relative flex flex-col items-center pt-5 cursor-pointer text-center w-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFDBC3]"
            >
              {/* 
                THE ARCHED PORTRAIT:
                - Sits centered at the top
                - Arch dome top: rounded-t-[40px]
                - Surface: bg-[#FFDBC3]/30
                - Delicate border: ring-2 ring-white
                - Protrudes over the card pediment shoulder
              */}
              <div className="relative z-10 w-28 sm:w-32 h-36 sm:h-40 rounded-t-[40px] rounded-b-md overflow-hidden bg-[#FFDBC3]/30 border-2 border-white shadow-md ring-1 ring-[#5C4B99]/20 group-hover:scale-105 group-hover:ring-[#5C4B99]/45 transition-all duration-300">
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#9F91CC]/25 to-white">
                  <span className="font-serif text-3xl font-bold text-[#5C4B99] select-none">
                    {member.initials || `MN${index + 1}`}
                  </span>
                </div>
              </div>

              {/* 
                THE PEDIMENT CARD BODY (Styled in Homepage Theme):
                - Clean white surface with subtle deep purple border
                - Member name in Deep Purple font-serif
                - Role in Royal Purple font-serif italic
                - Class code in letterspaced uppercase font-tech
              */}
              <div className="w-full -mt-8 pt-12 pb-6 px-4 rounded-3xl bg-white border border-[#3D246C]/15 shadow-2xs hover:shadow-xl group-hover:border-[#5C4B99]/40 transition-all duration-300 space-y-1.5 flex flex-col justify-center">

                {/* Member Name */}
                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#3D246C] leading-snug group-hover:text-[#5C4B99] transition-colors">
                  {member.name}
                </h3>

                {/* Subtitle / Role in Royal Purple */}
                <p className="font-serif text-xs sm:text-sm text-[#4C3C82] italic leading-tight">
                  {member.role}
                </p>

                {/* Class Code & Committee Tag */}
                <p className="font-tech text-xs font-semibold uppercase tracking-[0.18em] text-[#4C3C82] pt-1">
                  {member.classCode} &bull; {member.committee}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* ── Interactive Member Profile Details Modal (Homepage Theme) ── */}
        {activeMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3D246C]/60 backdrop-blur-sm animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-modal-title"
          >
            <div
              className="fixed inset-0"
              onClick={() => setActiveMember(null)}
              aria-hidden="true"
            />

            <div className="relative w-full max-w-md bg-white border border-[#3D246C]/15 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 text-center animate-in fade-in duration-150">
              {/* Close Button */}
              <button
                ref={modalCloseBtnRef}
                type="button"
                onClick={() => setActiveMember(null)}
                className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full text-[#4C3C82] hover:text-[#3D246C] hover:bg-[#FFDBC3]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Arched Portrait in Modal */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative w-28 h-36 rounded-t-[36px] rounded-b-md overflow-hidden bg-[#FFDBC3]/30 border-2 border-white shadow-md ring-1 ring-[#5C4B99]/25">
                  <div className="w-full h-full flex items-center justify-center font-serif font-bold text-3xl text-[#5C4B99] bg-gradient-to-b from-[#9F91CC]/25 to-white">
                    {activeMember.initials}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 id="member-modal-title" className="font-serif text-2xl font-normal text-[#3D246C]">
                    {activeMember.name}
                  </h3>
                  <p className="font-serif text-sm sm:text-base text-[#4C3C82] italic">
                    {activeMember.role}
                  </p>
                  <p className="font-tech text-xs text-[#4C3C82] uppercase tracking-[0.2em]">
                    {activeMember.classCode} &bull; {activeMember.committee}
                  </p>
                </div>
              </div>

              {/* Institutional Details */}
              <div className="p-4 rounded-2xl bg-[#FFDBC3]/35 border border-[#3D246C]/15 text-xs font-body text-[#3D246C] space-y-2 text-left">
                <div className="flex items-center gap-2 text-[#3D246C] font-serif text-sm">
                  <Building2 className="w-4 h-4 text-[#5C4B99]" />
                  <span className="font-semibold">CHRIST (Deemed to be University)</span>
                </div>
                <p className="text-xs font-tech text-[#4C3C82] leading-relaxed">
                  School of Sciences Cultural Delegation &bull; Blossoms SOS 2026–27. Coordination desk under the Deanery Secretariat.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="min-h-[44px] px-2 -ml-2 inline-flex items-center gap-1.5 font-tech text-[#4C3C82] hover:text-[#3D246C] hover:underline font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Secretariat</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveMember(null)}
                  className="min-h-[44px] font-tech px-5 py-2.5 rounded-xl bg-[#5C4B99] hover:bg-[#4C3C82] text-white font-semibold transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
