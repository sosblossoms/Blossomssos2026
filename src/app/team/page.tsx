import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Website Developers & Core Team | Blossoms SOS 2026–27',
  description:
    'Meet the Website Designers & Developers from the Department of Computer Science representing the School of Sciences at Blossoms, CHRIST (Deemed to be University), Bangalore.',
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Website Developers & Core Team | Blossoms SOS',
    description:
      'Meet the Website Designers & Developers from the Department of Computer Science representing the School of Sciences at Blossoms, CHRIST (Deemed to be University), Bangalore.',
    url: `${siteConfig.canonicalUrl}/team`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.canonicalUrl },
    { '@type': 'ListItem', position: 2, name: 'Team', item: `${siteConfig.canonicalUrl}/team` },
  ],
};

interface TeamDevMember {
  name: string;
  classCode: string;
  role: string;
  department: string;
  image: string;
  email?: string;
  linkedin?: string;
  github?: string;
}

const DEV_TEAM: TeamDevMember[] = [
  {
    name: 'Bhargav Shree Raj G',
    classCode: '3BScCM',
    role: 'WEBSITE DESIGNER & DEVELOPER',
    department: 'DEPARTMENT OF COMPUTER SCIENCE',
    image: '/team/bhargav.webp',
    email: 'mailto:bhargav.g@science.christuniversity.in',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Suryachalam V M',
    classCode: '3BScCM',
    role: 'WEBSITE DESIGNER & DEVELOPER',
    department: 'DEPARTMENT OF COMPUTER SCIENCE',
    image: '/team/suryachalam.webp',
    email: 'mailto:suryachalam.vm@science.christuniversity.in',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Dhinesh Karthik R',
    classCode: '3BScCM',
    role: 'WEBSITE DESIGNER & DEVELOPER',
    department: 'DEPARTMENT OF COMPUTER SCIENCE',
    image: '/team/dhinesh.webp',
    email: 'mailto:dhinesh.karthik.r@science.christuniversity.in',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
];

/* Clean SVG Social Icons matching reference card */
function MailIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div
        className="min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FFDBC3] text-[#3D246C] selection:bg-[#5C4B99] selection:text-white"
        style={{ backgroundColor: '#FFDBC3' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* ── Page Header (Clean, Pure Theme Typography — No Sparkles or Decorative Symbols) ── */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-[#3D246C]/15 text-xs font-semibold text-[#5C4B99] shadow-xs font-tech">
              <span>School of Sciences &bull; Technical &amp; Digital Media</span>
            </div>

            <h1 className="font-angular text-4xl sm:text-5xl md:text-6xl font-black text-[#3D246C] tracking-tight leading-tight">
              Website Development Team
            </h1>

            <p className="font-body text-sm sm:text-base text-[#3D246C]/85 leading-relaxed font-normal">
              Meet the student engineers and UI/UX developers from the School of Sciences who architected and built the official Blossoms SOS platform.
            </p>
          </div>

          {/* ── Reference Component Cards Grid (Responsive 1/2/3 Columns) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {DEV_TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-[32px] sm:rounded-[36px] border border-[#3D246C]/12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 sm:p-9 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_16px_40px_rgba(61,36,108,0.12)] hover:-translate-y-1"
              >
                {/* 1. Rounded Square Portrait with Smooth Corner Radius */}
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-[28px] overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-inner mb-6 shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 176px, (max-width: 1024px) 192px, 220px"
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* 2. Member Name & Class Code */}
                <h2 className="text-xl sm:text-[21px] font-extrabold text-[#0F172A] tracking-tight mb-2 leading-snug">
                  {member.name} <span className="font-bold text-[#1E293B]">({member.classCode})</span>
                </h2>

                {/* 3. Role Title (Accent Red / Crimson) */}
                <div className="text-[13px] sm:text-sm font-black uppercase tracking-wider text-[#DC2626] mb-1.5">
                  {member.role}
                </div>

                {/* 4. Department Name (Subtle Muted Slate) */}
                <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-8">
                  {member.department}
                </div>

                {/* 5. Separator Line */}
                <div className="w-full border-t border-neutral-200/70 mt-auto pt-6">
                  {/* 6. Social Action Icons (Mail, LinkedIn, GitHub) */}
                  <div className="flex items-center justify-center gap-6 text-[#64748B]">
                    {member.email && (
                      <a
                        href={member.email}
                        aria-label={`Email ${member.name}`}
                        className="p-1 text-[#64748B] hover:text-[#0F172A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded"
                      >
                        <MailIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} LinkedIn Profile`}
                        className="p-1 text-[#64748B] hover:text-[#0A66C2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded"
                      >
                        <LinkedInIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} GitHub Profile`}
                        className="p-1 text-[#64748B] hover:text-[#0F172A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded"
                      >
                        <GitHubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Subtitle / Institutional Notice ── */}
          <footer className="border-t border-[#3D246C]/15 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-[#5C4B99]">
            <p className="font-serif italic text-sm text-[#3D246C]">
              &ldquo;From Flames to Flights, White Onyx Ignites&rdquo;
            </p>
            <div className="flex items-center gap-4 text-xs font-tech">
              <span className="text-[#3D246C]/75">CHRIST (Deemed to be University), Bangalore</span>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-[#3D246C] hover:text-[#5C4B99] hover:underline flex items-center gap-1 font-semibold"
              >
                <Mail className="w-3.5 h-3.5 text-[#5C4B99]" />
                <span>{siteConfig.contactEmail}</span>
              </a>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}
