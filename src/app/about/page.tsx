import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { 
  Compass, 
  Building2, 
  Award, 
  Users, 
  Palette, 
  Flame, 
  Gem, 
  ArrowRight,
  ExternalLink, 
  Calendar
} from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'About Blossoms & Team Onyx | School of Sciences',
  description: 'The journey, identity, and achievements of Team Onyx representing the School of Sciences at Blossoms, CHRIST (Deemed to be University), Bangalore.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Blossoms & Team Onyx | School of Sciences',
    description: 'The journey, identity, and achievements of Team Onyx representing the School of Sciences at Blossoms, CHRIST (Deemed to be University), Bangalore.',
    url: `${siteConfig.canonicalUrl}/about`,
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
      name: 'About',
      item: `${siteConfig.canonicalUrl}/about`,
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFDBC3] text-[#3D246C] selection:bg-[#5C4B99] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* Header Banner */}
      <header className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#3D246C]/20 text-xs font-semibold text-[#4C3C82] shadow-xs font-tech uppercase tracking-wider">
          <span>School of Sciences &bull; Team Onyx</span>
        </div>

        <span className="font-serif italic text-xl sm:text-2xl text-[#4C3C82] block tracking-wide">
          The Cultural Heritage &amp; Spirit
        </span>

        <h1 className="font-angular text-4xl sm:text-6xl font-black text-[#3D246C] tracking-tight leading-tight">
          About Blossoms &amp; The School of Sciences Legacy
        </h1>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <div className="relative h-11 w-44 px-2 py-1 rounded-xl bg-white border border-[#3D246C]/20 shadow-sm flex items-center justify-center">
            <Image
              src="/blossoms_team.webp"
              alt="Team Onyx Insignia"
              fill
              sizes="176px"
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="font-serif italic text-base sm:text-lg px-4 py-1.5 rounded-full bg-white/90 text-[#3D246C] border border-[#3D246C]/20 font-medium shadow-xs">
            &ldquo;From flames to flights, White Onyx Ignites&rdquo;
          </span>
        </div>
      </header>

      {/* Main Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column: Narrative & Sections */}
        <div className="lg:col-span-8 space-y-14">

          {/* Section 1: The Blossoms Mandate & Video */}
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="font-serif italic text-lg text-[#4C3C82] block">
                Chapter I &bull; The Festival Mandate
              </span>
              <h2 className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C] flex items-center gap-3">
                <Compass className="w-6 h-6 text-[#5C4B99] shrink-0" aria-hidden="true" />
                <span>What is Blossoms?</span>
              </h2>
            </div>

            <p className="font-body text-base sm:text-lg text-[#3D246C]/90 leading-relaxed font-normal max-w-[65ch]">
              Blossoms is the premier intra-deanery cultural and creative celebration of CHRIST (Deemed to be University) Bangalore, anchored by the foundational motto <span className="text-[#3D246C] font-bold">&lsquo;Be the best&rsquo;</span>. Across five core pillars—Art, Theatre, Music, Literary, and Dance—over 7,000 students participate in rigorous competitive arenas, celebrating artistic excellence, unity, and scientific heritage across disciplines.
            </p>

            {/* Video Feature */}
            <div className="rounded-3xl overflow-hidden border border-[#3D246C]/20 shadow-lg bg-white">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full aspect-video object-cover"
                poster="/Assets/cult1.webp"
              >
                <source src="/blossoms-24.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4 bg-[#FFFCF5] border-t border-[#3D246C]/15 flex items-center justify-between text-xs font-tech text-[#3D246C]">
                <span className="font-semibold text-[#3D246C]">Blossoms Official Video Highlights</span>
                <span className="font-tech text-[#4C3C82] font-bold">7,000+ Participants</span>
              </div>
            </div>
          </section>

          {/* Section 2: The Journey Through Blossoms */}
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="font-serif italic text-lg text-[#4C3C82] block">
                Chapter II &bull; Competition Arc
              </span>
              <h2 className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C] flex items-center gap-3">
                <Building2 className="w-6 h-6 text-[#5C4B99] shrink-0" aria-hidden="true" />
                <span>The Journey Through Blossoms</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-[#3D246C]/15 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFDBC3]/70 border border-[#3D246C]/20 flex items-center justify-center text-[#4C3C82]">
                  <Users className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-tech font-bold text-[#4C3C82] uppercase tracking-wider">Phase I</span>
                  <h3 className="font-tech text-lg font-bold text-[#3D246C]">Intra-Deanery Prelims</h3>
                </div>
                <p className="font-body text-sm text-[#3D246C]/90 leading-relaxed max-w-[60ch]">
                  The initial round sees vibrant competition within individual deaneries, identifying the brightest talents and strongest contenders across departments.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#3D246C]/15 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFDBC3]/70 border border-[#3D246C]/20 flex items-center justify-center text-[#4C3C82]">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-tech font-bold text-[#4C3C82] uppercase tracking-wider">Phase II</span>
                  <h3 className="font-tech text-lg font-bold text-[#3D246C]">Inter-Deanery Finals</h3>
                </div>
                <p className="font-body text-sm text-[#3D246C]/90 leading-relaxed max-w-[60ch]">
                  The champions from each deanery advance to the university-wide stage, competing at an inter-deanery level for the prestigious Blossoms overall championship.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Team Onyx Identity */}
          <section id="team" className="space-y-6 scroll-mt-24 sm:scroll-mt-28">
            <div className="space-y-1">
              <span className="font-serif italic text-lg text-[#4C3C82] block">
                Chapter III &bull; Our Contingent
              </span>
              <h2 className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C] flex items-center gap-3">
                <span>Representing the School of Sciences: Team Onyx</span>
              </h2>
            </div>

            <p className="font-body text-base text-[#3D246C]/90 leading-relaxed max-w-[65ch]">
              As part of the vibrant tapestry of Blossoms, the School of Sciences proudly fields its own dedicated delegation. We are Team Onyx, embodying the spirit of analytical precision, resilience, and boundless artistic expression inherent to the sciences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-white border border-[#3D246C]/15 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFDBC3]/70 border border-[#3D246C]/20 flex items-center justify-center text-[#4C3C82]">
                  <Palette className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="font-tech font-bold text-sm text-[#3D246C]">Team Color: White</h3>
                <p className="font-body text-xs sm:text-sm text-[#3D246C]/85 leading-relaxed">
                  Symbolizing clarity, brilliance, and the unity that empowers our entire student body.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#3D246C]/15 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFDBC3]/70 border border-[#3D246C]/20 flex items-center justify-center text-[#4C3C82]">
                  <Gem className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="font-tech font-bold text-sm text-[#3D246C]">Team Name: Onyx</h3>
                <p className="font-body text-xs sm:text-sm text-[#3D246C]/85 leading-relaxed">
                  Representing strength, resilience, and the polished excellence we bring to every challenge.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#3D246C]/15 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFDBC3]/70 border border-[#3D246C]/20 flex items-center justify-center text-[#4C3C82]">
                  <Flame className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="font-tech font-bold text-sm text-[#3D246C]">Team Slogan</h3>
                <p className="font-body text-xs sm:text-sm text-[#3D246C]/85 leading-relaxed">
                  &ldquo;From flames to flights, White Onyx Ignites.&rdquo; Transforming passion into soaring stagecraft.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFCF5] border border-[#5C4B99]/25 text-sm sm:text-base text-[#3D246C] leading-relaxed space-y-3 font-body shadow-xs">
              <p className="max-w-[65ch]">
                At Blossoms SOS, Team Onyx aims not just to participate, but to lead. We encourage all our students to embrace this opportunity—to audition actively across all events and help us maintain a commanding presence in the inter-deanery finals.
              </p>
              <p className="max-w-[65ch] font-serif italic text-lg text-[#4C3C82]">
                This is more than a competition; it&apos;s a celebration of talent, camaraderie, and intellectual vigor within the School of Sciences.
              </p>
            </div>
          </section>

          {/* Section 4: The Five Disciplines Summary */}
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="font-serif italic text-lg text-[#4C3C82] block">
                Chapter IV &bull; Cultural Arenas
              </span>
              <h2 className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C]">
                The Five Foundational Pillars
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Art', count: '9 Competitions', desc: 'Painting, Photography, Digital Poster Making, Rangoli Design, Mehendi Design, Pot Painting, Pencil Sketching, Greeting Card, Collage Making', slug: 'art' as const },
                { name: 'Literary', count: '8 Competitions', desc: 'Debate, Extempore, Creative Writing, Quiz, Just A Minute (JAM), Pot Pourri, Dumb Charades, Air Crash', slug: 'literary' as const },
                { name: 'Music', count: '5 Competitions', desc: 'Indian Folk & Film Singing (Solo), Western Singing (Solo), Acoustic Music Group (Western), Battle of the Bands (Western & Indian)', slug: 'music' as const },
                { name: 'Theatre', count: '6 Competitions', desc: 'Mono Acting, Street Theatre (Nukkad Natak), Proscenium Stage Play, Mime, Short Film Making, Reel Making', slug: 'theatre' as const },
                { name: 'Dance', count: '3 Competitions', desc: 'Dance Duet, Indian Dance Group (Non-Theme), Indian Classical Dance Group', slug: 'dance' as const },
              ].map((p) => (
                <Link
                  key={p.name}
                  href={`/events/${p.slug}`}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-[#3D246C]/15 flex items-start gap-4 hover:border-[#5C4B99] hover:bg-[#FFFCF5] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFDBC3] shadow-xs"
                >
                  <div className="p-2.5 rounded-xl bg-[#FFDBC3]/70 text-[#4C3C82] shrink-0 border border-[#3D246C]/15">
                    <CategoryIcon category={p.slug} size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-tech font-bold text-base text-[#3D246C] group-hover:text-[#4C3C82] transition-colors flex items-center gap-1.5">
                        <span>{p.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#5C4B99]" aria-hidden="true" />
                      </h3>
                      <span className="text-xs font-tech text-[#4C3C82] font-bold">{p.count}</span>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-[#3D246C]/85 font-normal leading-relaxed max-w-[65ch]">{p.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/events"
                className="clay-btn-primary font-tech min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white inline-flex items-center gap-2 shadow-sm hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFDBC3]"
              >
                <span>Explore All 31 Competitions</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/schedule"
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white hover:bg-[#FFFCF5] text-[#3D246C] border border-[#3D246C]/20 text-xs sm:text-sm font-tech font-semibold inline-flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFDBC3]"
              >
                <Calendar className="w-4 h-4 text-[#4C3C82]" aria-hidden="true" />
                <span>View Festival Schedule</span>
              </Link>
            </div>
          </section>

        </div>

        {/* Right Column: Achievements & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">

          {/* Official Accolades Card (2025–2026 Legacy) */}
          <div className="p-6 rounded-3xl bg-white border border-[#3D246C]/15 shadow-lg space-y-6">
            <div className="flex items-center justify-between text-xs font-bold font-tech text-[#3D246C] uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#4C3C82]" aria-hidden="true" />
                <span>Official Accolades</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFDBC3]/80 border border-[#3D246C]/20 text-[#3D246C] font-bold">
                2025–2026
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FFFCF5] border border-[#3D246C]/15 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0">
                  <Image src="/2nd.webp" alt="2nd Place Trophy - 'We the Best' Overall Trophy" fill sizes="56px" className="object-contain" />
                </div>
                <div>
                  <span className="text-xs font-tech font-bold text-[#4C3C82] uppercase">Second Place &bull; 2025–2026</span>
                  <h4 className="font-tech font-bold text-sm text-[#3D246C]">&lsquo;We the Best&rsquo; Trophy</h4>
                  <p className="font-body text-xs text-[#3D246C]/85">Inter-Deanery Overall Excellence</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFCF5] border border-[#3D246C]/15 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0">
                  <Image src="/2nd.webp" alt="2nd Place Trophy - Inauguration Ceremony" fill sizes="56px" className="object-contain" />
                </div>
                <div>
                  <span className="text-xs font-tech font-bold text-[#4C3C82] uppercase">Second Place &bull; 2025–2026</span>
                  <h4 className="font-tech font-bold text-sm text-[#3D246C]">Inauguration Ceremony</h4>
                  <p className="font-body text-xs text-[#3D246C]/85">Stage Presentation</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFCF5] border border-[#3D246C]/15 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0">
                  <Image src="/3rd.webp" alt="3rd Place Trophy - Deanery Procession" fill sizes="56px" className="object-contain" />
                </div>
                <div>
                  <span className="text-xs font-tech font-bold text-[#4C3C82] uppercase">Third Place &bull; 2025–2026</span>
                  <h4 className="font-tech font-bold text-sm text-[#3D246C]">Deanery Procession</h4>
                  <p className="font-body text-xs text-[#3D246C]/85">March &amp; Display</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Registration / Handouts CTA */}
          <div className="p-6 rounded-3xl bg-white border border-[#3D246C]/15 shadow-lg space-y-4">
            <h3 className="font-tech text-lg font-bold text-[#3D246C]">Join Team Onyx</h3>
            <p className="font-body text-sm text-[#3D246C]/85 leading-relaxed">
              Represent the School of Sciences across 31 competitive formats. Slots are open for preliminary auditions!
            </p>
            {siteConfig.registrationUrl && (
              <a
                href={siteConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full clay-btn-primary font-tech min-h-[44px] py-3 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center justify-center shadow-md hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] focus-visible:ring-offset-2"
              >
                <span>Register for Events</span>
              </a>
            )}
            {siteConfig.rulebookUrl && (
              <a
                href={siteConfig.rulebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-2.5 rounded-xl bg-white hover:bg-[#FFFCF5] text-[#3D246C] border border-[#3D246C]/20 text-xs sm:text-sm font-tech font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
              >
                <span>View Blossoms Rulebook 2026–27</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#4C3C82]" aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Institution Notice */}
          <div className="p-5 rounded-2xl bg-white/95 border border-[#3D246C]/15 text-xs text-[#3D246C]/90 space-y-1.5 font-body shadow-xs">
            <p className="font-tech font-semibold text-[#3D246C]">CHRIST (Deemed to be University)</p>
            <p className="text-xs text-[#3D246C]/85">Bangalore Central Campus &bull; Hosur Road, Bengaluru 560029</p>
          </div>

        </div>

      </div>
    </div>
  );
}
