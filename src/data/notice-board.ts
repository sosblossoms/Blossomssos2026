import { BLOSSOMS_SCHEDULE_2026 } from '@/data/schedule-2026-27';
import { siteConfig } from '@/data/site-config';
import { ScheduleEvent, ScheduleCategory } from '@/types/schedule';
import {
  FestivalWeek,
  NoticeCategory,
  NoticeItem,
  WeekDaySlot,
} from '@/types/notice-board';

export const NOTICE_CATEGORY_META: Record<
  NoticeCategory,
  { label: string; badgeBg: string; badgeText: string; badgeBorder: string }
> = {
  'weekly-update': {
    label: 'Weekly Update',
    badgeBg: 'bg-[#5C4B99]/12',
    badgeText: 'text-[#3D246C]',
    badgeBorder: 'border-[#5C4B99]/30',
  },
  registration: {
    label: 'Registration & Rules',
    badgeBg: 'bg-emerald-500/12',
    badgeText: 'text-emerald-900',
    badgeBorder: 'border-emerald-600/30',
  },
  'theme-reveal': {
    label: 'Theme Reveal',
    badgeBg: 'bg-[#9F91CC]/25',
    badgeText: 'text-[#3D246C]',
    badgeBorder: 'border-[#5C4B99]/35',
  },
  deadline: {
    label: 'Submission Deadline',
    badgeBg: 'bg-rose-500/12',
    badgeText: 'text-rose-900',
    badgeBorder: 'border-rose-600/30',
  },
  'venue-alert': {
    label: 'Venue & Timing Note',
    badgeBg: 'bg-amber-500/15',
    badgeText: 'text-amber-950',
    badgeBorder: 'border-amber-600/35',
  },
};

export const FESTIVAL_WEEKS_2026: FestivalWeek[] = [
  {
    id: 'week-0',
    weekNumber: 0,
    shortLabel: 'Pre-Fest',
    title: 'Registration & Rulebook Briefing',
    subtitle: 'Pre-Festival Preparation Window • School of Sciences',
    startDate: '2026-10-26',
    endDate: '2026-11-08',
    displayRange: '26 Oct – 8 Nov 2026',
    weeklyHighlight:
      'Flash Mob alert: Come at 12:45 at Block 1 Island on Friday, 6 Nov! Prelims registration slots are live ahead of the 12 Nov Inauguration at Block 1 Quadrangle.',
  },
  {
    id: 'week-1',
    weekNumber: 1,
    shortLabel: 'Week 1',
    title: 'Blossoms Inauguration & Launch',
    subtitle: 'Opening Ceremony Week • Block 1 Quadrangle',
    startDate: '2026-11-09',
    endDate: '2026-11-15',
    displayRange: '9 Nov – 15 Nov 2026',
    weeklyHighlight:
      'Blossoms 2026–27 officially opens on Thursday, 12 November with the grand Inauguration Dance by Team Onyx at 12:45 PM in Quadrangle, Block I before competitive prelims begin Monday.',
  },
  {
    id: 'week-2',
    weekNumber: 2,
    shortLabel: 'Week 2',
    title: 'Literary, Art & Acoustic Openers',
    subtitle: '6 Prelims Events • Panel Room & Block 2',
    startDate: '2026-11-16',
    endDate: '2026-11-22',
    displayRange: '16 Nov – 22 Nov 2026',
    weeklyHighlight:
      'Opening prelims week features Potpourri, Western Acoustic Music Group at Panel Room, Greeting Card Competition, Air Crash, Reel Making Theme Reveal, and Collage Making.',
  },
  {
    id: 'week-3',
    weekNumber: 3,
    shortLabel: 'Week 3',
    title: 'Theme Reveals, Debate, Mime & Bands',
    subtitle: '6 Prelims Events • Block 2 & Campus View',
    startDate: '2026-11-23',
    endDate: '2026-11-29',
    displayRange: '23 Nov – 29 Nov 2026',
    weeklyHighlight:
      'Mid-fest momentum brings Mixed Media Pot Art, Photography Theme Reveal, Debate, Painting, Mime, and Western & Indian Battle of Bands at Campus View.',
  },
  {
    id: 'week-4',
    weekNumber: 4,
    shortLabel: 'Week 4',
    title: 'Birds Park Dance, Sketching & Street Theatre',
    subtitle: '8 Prelims Events • Block 2, Birds Park & Garden Street',
    startDate: '2026-11-30',
    endDate: '2026-12-06',
    displayRange: '30 Nov – 6 Dec 2026',
    weeklyHighlight:
      'Dumb Charades, Pencil Sketching, Mono Acting, Digital Poster Making, Dance Duet, Mehendi & IMPULSE Solo Dance at Birds Park, plus Street Theatre at Garden Street.',
  },
  {
    id: 'week-5',
    weekNumber: 5,
    shortLabel: 'Week 5',
    title: 'Quiz Batches, Literary Prelims & K.E. Dance',
    subtitle: '8 Prelims Events • Block 2, Assembly Hall & K.E. Auditorium',
    startDate: '2026-12-07',
    endDate: '2026-12-13',
    displayRange: '7 Dec – 13 Dec 2026',
    weeklyHighlight:
      'Two-batch Quiz, Indian Folk & Film Solo Singing at Assembly Hall, Extempore, Creative Writing, Rangoli, JAM, plus Classical & Non-Theme Group Dance at K.E. Auditorium.',
  },
  {
    id: 'week-6',
    weekNumber: 6,
    shortLabel: 'Week 6',
    title: 'Screenings, Solo Singing & Proscenium Finale',
    subtitle: '3 Finale-Week Events • Room 623 & K.E. Auditorium',
    startDate: '2026-12-14',
    endDate: '2026-12-20',
    displayRange: '14 Dec – 20 Dec 2026',
    weeklyHighlight:
      'Western Singing Solo (14 Dec), Short Film Screening (16 Dec, submission deadline 11:59 PM on 13 Dec), and Proscenium Theatre Finale at K.E. Auditorium on Saturday, 19 Dec.',
  },
];

export const NOTICE_BOARD_ITEMS: NoticeItem[] = [
  {
    id: 'nb-2026-the-prelude',
    refCode: 'SOS/BLSM/26-27/PRELUDE',
    weekId: 'week-2',
    category: 'venue-alert',
    categoryLabel: 'Inauguration • The Prelude',
    title: 'Inauguration: The Prelude — Team Onyx',
    summary:
      'Team Onyx presents Blossoms 2026–27 Inauguration: The Prelude on 16th November at 12:45 PM in front of Block 2!',
    details: [
      'Event: Blossoms 2026–27 Inauguration — The Prelude.',
      'Presented By: School of Sciences (SOS) • Team Onyx.',
      'Date: Monday, 16th November 2026.',
      'Time: 12:45 PM.',
      'Venue: In Front of Block 2, CHRIST (Deemed to be University), Central Campus.',
      'Join the School of Sciences community in front of Block 2 as Team Onyx kicks off Blossoms 2026–27!',
    ],
    postedLabel: 'Nov 2026 • Team Onyx',
    departmentStamp: 'SCHOOL OF SCIENCES • TEAM ONYX',
    stampBadge: '16 NOV • 12:45 PM',
    pinColor: 'crimson',
    paperTone: 'peach-memo',
    tiltDeg: -1.0,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: false,
    imageUrl: '/prelude_inauguration_poster.jpg',
    imageAlt:
      'Blossoms 2026-27 Inauguration: The Prelude Poster — Team Onyx, 16th November at 12:45 PM in front of Block 2',
    actionLabel: 'View 16 Nov Schedule',
    actionHref: '/schedule?date=2026-11-16',
  },
  {
    id: 'nb-2026-blossoms-stall',
    refCode: 'SOS/BLSM/26-27/STALL',
    weekId: 'week-2',
    category: 'weekly-update',
    categoryLabel: 'SOS Blossoms Stall',
    title: 'SOS Blossoms Stall — Come Visit Our Stall!',
    summary:
      'Come visit the SOS Blossoms Stall by Team Onyx on 16th November from 9:00 AM onward at Garden Street!',
    details: [
      'Event: Official School of Sciences Blossoms 2026–27 Campus Stall.',
      'Presented By: School of Sciences (SOS) • Team Onyx.',
      'Date: Monday, 16th November 2026.',
      'Time: 9:00 AM Onward.',
      'Venue: Garden Street, CHRIST (Deemed to be University), Central Campus.',
      'Drop by Garden Street for fest updates, interactive games, music vibes, and Blossoms 2026–27 spirit!',
    ],
    postedLabel: 'Nov 2026 • Team Onyx',
    departmentStamp: 'SCHOOL OF SCIENCES • TEAM ONYX',
    stampBadge: '16 NOV • 9:00 AM+',
    pinColor: 'amber',
    paperTone: 'sticky-yellow',
    tiltDeg: 0.9,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: false,
    imageUrl: '/blossoms_stall_poster.jpg',
    imageAlt:
      'SOS Blossoms Stall Poster — Team Onyx, 16th November from 9:00 AM onward at Garden Street',
    actionLabel: 'Explore Festival Events',
    actionHref: '/events',
  },
  {
    id: 'nb-2026-inauguration-dance',
    refCode: 'SOS/BLSM/26-27/02-DANCE',
    weekId: 'week-1',
    category: 'venue-alert',
    categoryLabel: 'Inauguration Dance',
    title: 'Inauguration Dance — Team Onyx',
    summary:
      'SOS presents Blossoms 2026–27: Witness the grand Inauguration Dance by Team Onyx this Thursday, 12 November 2026 at Quadrangle, Block I!',
    details: [
      'Event: Official Blossoms 2026–27 Inauguration Dance & Opening Ceremony.',
      'Presented By: School of Sciences (SOS) • Team Onyx ("From Flames to Flight, White Onyx Ignites!").',
      'Date & Venue: Thursday, 12th November 2026 at Quadrangle, Block I, CHRIST (Deemed to be University), Central Campus.',
      'Time: 12:45 PM sharp.',
      'Performers: School of Sciences Cultural & Dance Troupe (Team Onyx).',
      'Theme & Aesthetic: Playing cards motif — "From Flames to Flight, White Onyx Ignites!".',
      'All students, faculty members, and supporters across all disciplines are invited to gather at Block 1 Quadrangle to witness the grand opening celebration live!',
    ],
    postedLabel: 'Week 1 Dispatch • Cultural & Dance Desk',
    departmentStamp: 'SCHOOL OF SCIENCES • TEAM ONYX',
    stampBadge: '12 NOV • QUADRANGLE',
    pinColor: 'crimson',
    paperTone: 'sticky-yellow',
    tiltDeg: -1.2,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: false,
    linkedEventId: 'sch-2026-01',
    discipline: 'dance',
    imageUrl: '/inauguration_dance_poster.jpg',
    imageAlt: 'Blossoms 2026-27 Inauguration Dance Poster - Team Onyx, 12 Nov at Quadrangle, Block I',
    taggedHandles: [
      '@computer_science_bangalore',
      '@stds.christ.bangalore',
      '@swo_centralcampus',
      '@chemistry.christuniversity',
      '@lifesciences.christ.bangalore',
    ],
    actionLabel: 'View on Schedule',
    actionHref: '/schedule?date=2026-11-12',
  },
  {
    id: 'nb-2026-flash-mob',
    refCode: 'SOS/BLSM/26-27/FLASH-MOB',
    weekId: 'week-0',
    category: 'venue-alert',
    categoryLabel: 'Flash Mob Alert',
    title: 'Flash Mob: Come at 12:45 at Block 1 Island',
    summary:
      'Come at 12:45 at Block 1 Island! Get ready for an electrifying live performance by School of Sciences dancers as Team Onyx brings the energy.',
    details: [
      'Event: Official Blossoms 2026–27 Campus Flash Mob.',
      'Date & Time: Friday, 6th November 2026 at 12:45 PM sharp.',
      'Venue: Block 1 Island, CHRIST (Deemed to be University), Central Campus.',
      'Theme & Spirit: From Flames to Flight, White Onyx Ignites!',
      'Performers: School of Sciences Cultural & Dance Troupe (Team Onyx).',
      'All students, faculty members, and supporters are invited to gather at Block 1 Island at 12:45 PM to witness the action live!',
    ],
    postedLabel: 'Pre-Fest Dispatch • Cultural & Dance Desk',
    departmentStamp: 'SCHOOL OF SCIENCES • TEAM ONYX',
    stampBadge: '6 NOV • 12:45 PM',
    pinColor: 'amber',
    paperTone: 'sticky-yellow',
    tiltDeg: -1.2,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: false,
    discipline: 'dance',
    imageUrl: '/flash_mob_poster.jpg',
    imageAlt: 'Blossoms 2026-27 Flash Mob Poster - 6th November 2026 at Block 1 Island',
    taggedHandles: [
      '@computer_science_bangalore',
      '@stds.christ.bangalore',
      '@swo_centralcampus',
      '@chemistry.christuniversity',
      '@lifesciences.christ.bangalore',
    ],
    actionLabel: 'Explore Prelims Schedule',
    actionHref: '/schedule',
  },
  {
    id: 'nb-2026-reel-2',
    refCode: 'SOS/BLSM/26-27/REEL-02',
    weekId: 'week-0',
    category: 'weekly-update',
    categoryLabel: 'Official Reel',
    title: 'Blossoms 2026–27 Official Reel — Part 1',
    summary: 'Watch the latest Blossoms 2026–27 reel from the School of Sciences, now live on Instagram.',
    details: [
      'Official Blossoms 2026–27 reel from Team Onyx.',
      'Stream the reel in the player above or tap below to watch directly on Instagram.',
    ],
    postedLabel: 'Pre-Fest Dispatch • Media Desk',
    departmentStamp: 'SCHOOL OF SCIENCES • MEDIA DESK',
    stampBadge: 'NEW REEL',
    pinColor: 'purple',
    paperTone: 'lavender-slip',
    tiltDeg: 0.8,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: false,
    embedUrl: 'https://www.instagram.com/reel/DfXZrdSSe0c/embed',
    actionLabel: 'Watch Reel on Instagram',
    actionHref: 'https://www.instagram.com/reel/DfXZrdSSe0c/',
    isExternalAction: true,
  },
  {
    id: 'nb-2026-reel-3',
    refCode: 'SOS/BLSM/26-27/REEL-03',
    weekId: 'week-0',
    category: 'weekly-update',
    categoryLabel: 'Official Reel',
    title: 'Blossoms 2026–27 Official Reel — Part 2',
    summary: 'Another Blossoms 2026–27 reel from the School of Sciences is live on Instagram.',
    details: [
      'Official Blossoms 2026–27 reel from Team Onyx.',
      'Stream the reel in the player above or tap below to watch directly on Instagram.',
    ],
    postedLabel: 'Pre-Fest Dispatch • Media Desk',
    departmentStamp: 'SCHOOL OF SCIENCES • MEDIA DESK',
    stampBadge: 'NEW REEL',
    pinColor: 'teal',
    paperTone: 'ivory',
    tiltDeg: -0.8,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: false,
    embedUrl: 'https://www.instagram.com/reel/DfXaqH7SCBb/embed',
    actionLabel: 'Watch Reel on Instagram',
    actionHref: 'https://www.instagram.com/reel/DfXaqH7SCBb/',
    isExternalAction: true,
  },
  {
    id: 'nb-2026-inauguration-dancers',
    refCode: 'SOS/BLSM/26-27/01-DANCE',
    weekId: 'week-0',
    category: 'registration',
    categoryLabel: 'Auditions & Call',
    title: 'Call for Inauguration Dancers — Team Onyx',
    summary:
      'Reignite the flame with Team Onyx! Auditions are now officially open for School of Sciences students to perform at the grand Blossoms 2026–27 Inauguration Ceremony.',
    details: [
      'Call for Inauguration Dancers: Represent the School of Sciences in the grand opening ceremony.',
      'Slogan & Spirit: Reignite the flame with Team Onyx — "From Flames to Flight, White Onyx Ignites!".',
      'Eligibility: Open to all undergraduate & postgraduate students from the School of Sciences, CHRIST (Deemed to be University), Central Campus.',
      'Performance Arena: Blossoms Inauguration Ceremony at Block 1 Quadrangle.',
      'Audition Registration: Scan the QR code on the official poster or tap the registration link below to submit your audition form.',
    ],
    postedLabel: 'Pre-Fest Dispatch • Cultural & Dance Desk',
    departmentStamp: 'SCHOOL OF SCIENCES • TEAM ONYX',
    stampBadge: 'AUDITIONS OPEN',
    pinColor: 'purple',
    paperTone: 'lavender-slip',
    tiltDeg: 1.2,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: false,
    discipline: 'dance',
    imageUrl: '/inauguration_dancers_poster.jpg',
    imageAlt: 'Call for Inauguration Dancers - Blossoms 2026-27 School of Sciences Poster',
    actionLabel: 'Register for Dance Auditions',
    actionHref:
      'https://docs.google.com/forms/d/e/1FAIpQLScM5__rFar9JAQAiNgRN0RSv6KB6oCWS_W4CC_CFwVCvGeZbg/viewform',
    isExternalAction: true,
  },
    {
    id: 'nb-2026-reel-wind',
    refCode: 'SOS/BLSM/26-27/DANCE-REEL',
    weekId: 'week-0',
    category: 'weekly-update',
    categoryLabel: 'Official Dance Reel',
    title: 'Dance Reel — "The Wind Knows What It’s Doing"',
    summary:
      'Feel the rhythm, energy, and elegance of Team Onyx. The official Blossoms 2026–27 Dance Reel is live — celebrating movement, choreography, and dancers taking flight.',
    details: [
      'Official Dance Reel: The premier dance performance teaser for Blossoms 2026–27.',
      'Theme & Choreography: "The wind knows what its doing" — Expressive choreography, fluid motion, and high-energy stage performance representing Team Onyx.',
      'Inauguration Dancers Spotlight: Showcases the dedication and graceful synchronization of our School of Sciences dancers preparing for the grand opening ceremony.',
      'Collaborating Handles: @computer_science_bangalore, @stds.christ.bangalore, @swo_centralcampus, @chemistry.christuniversity, and @lifesciences.christ.bangalore.',
      'Watch & Stream: Stream the dance reel in the player above or tap below to watch directly on Instagram.',
    ],
    postedLabel: 'Pre-Fest Dispatch • Cultural & Dance Desk',
    departmentStamp: 'SCHOOL OF SCIENCES • DANCE DESK',
    stampBadge: 'DANCE REEL',
    pinColor: 'purple',
    paperTone: 'lavender-slip',
    tiltDeg: -0.85,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: false,
    discipline: 'dance',
    imageUrl: '/dance_reel_thumbnail.jpg',
    imageAlt: 'Blossoms 2026-27 Dance Reel Thumbnail - The wind knows what its doing',
    embedUrl: 'https://www.instagram.com/reel/DfHrjWlypfa/embed',
    taggedHandles: [
      '@computer_science_bangalore',
      '@stds.christ.bangalore',
      '@swo_centralcampus',
      '@chemistry.christuniversity',
      '@lifesciences.christ.bangalore',
    ],
    actionLabel: 'Watch Dance Reel on Instagram',
    actionHref: 'https://www.instagram.com/reel/DfHrjWlypfa/?vrfl=ODk5d3FyNGFxOXll',
    isExternalAction: true,
  },
{
    id: 'nb-2026-launch',
    refCode: 'SOS/BLSM/26-27/00',
    weekId: 'week-0',
    category: 'weekly-update',
    categoryLabel: 'Official Launch',
    title: 'Official Launch: Blossoms Website & Social Media Page',
    summary:
      'Join us for the official launch of the Blossoms School of Sciences website and social media handles this Thursday, 29 October 2026 at 2:00 PM in Meeting Hall III, Block 1 Main!',
    details: [
      'Event: Official Launch of Blossoms Website & Social Media Page.',
      'Theme & Slogan: Flames to Flight — White Onyx Ignites.',
      'Date & Time: Thursday, 29 October 2026 at 2:00 PM.',
      'Venue: Meeting Hall III, Room 329, Third Floor, Block I Main, CHRIST (Deemed to be University), Bengaluru Central Campus.',
      'We are delighted to invite all School of Sciences students and faculty delegates to celebrate the official digital launch of Blossoms 2026–27. Explore • Engage • Be a part of the journey!',
    ],
    postedLabel: 'Pre-Fest Dispatch • Web & Media Desk',
    departmentStamp: 'SCHOOL OF SCIENCES • OFFICIAL LAUNCH',
    stampBadge: '29 OCT • 2:00 PM',
    pinColor: 'crimson',
    paperTone: 'sticky-yellow',
    tiltDeg: -0.9,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: false,
    imageUrl: '/website_launch_poster.jpg',
    imageAlt: 'Blossoms Website & Social Media Page Launch Poster',
    actionLabel: 'Explore Festival Schedule',
    actionHref: '/schedule',
  },
  {
    id: 'nb-2026-01',
    refCode: 'SOS/BLSM/26-27/01',
    weekId: 'week-0',
    category: 'registration',
    categoryLabel: 'Registration & Rules',
    title: 'Prelims Registration Portal & Official Rulebook Live',
    summary:
      'Slots are open across all 5 cultural disciplines (Art, Literary, Music, Theatre & Dance) representing Team Onyx.',
    details: [
      'Students from all School of Sciences programmes may register via the official Google Form portal.',
      'Verify team sizes, accompaniment rules, and evaluation rubrics inside the Blossoms Rulebook 2026-27 and Know More PDF before submitting.',
      'All dates in the 2026–27 Prelims Schedule currently carry TENTATIVE status pending final deanery sign-off.',
    ],
    postedLabel: 'Pre-Fest Circular • Core Committee',
    departmentStamp: 'SCHOOL OF SCIENCES • TEAM ONYX',
    stampBadge: 'SLOTS OPEN',
    pinColor: 'purple',
    paperTone: 'ivory',
    tiltDeg: -1.1,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: false,
    actionLabel: 'Open Registration Form',
    actionHref: siteConfig.registrationUrl,
    isExternalAction: true,
  },
  {
    id: 'nb-2026-03',
    refCode: 'SOS/BLSM/26-27/03',
    weekId: 'week-2',
    category: 'weekly-update',
    categoryLabel: 'Weekly Update',
    title: 'Week 2 Lineup: 6 Opening Prelims Across Block 2 & Panel Room',
    summary:
      'Competitive prelims open Monday 16 Nov with Potpourri and Western Acoustic Music Group, running through Collage Making on Thursday 19 Nov.',
    details: [
      'Monday 16 Nov: Potpourri (1:30 PM Onwards, Room 623 & 615, Block 2) & Western Acoustic Music Group (3:45 PM – 5:00 PM, Panel Room).',
      'Tuesday 17 Nov: Greeting Card Competition (1:30 PM & 3:45 PM Onwards, Room 615, Block 2) & Air Crash (2:00 PM Onwards, Room 623, Block 2).',
      'Wednesday 18 Nov: Reel Making Theme Reveal (1:45 PM & 3:45 PM Onwards, Room 623 & 615, Block 2); Thursday 19 Nov: Collage Making (1:45 PM & 3:45 PM Onwards, Room 615 & 623, Block 2).',
    ],
    postedLabel: 'Week 2 Dispatch • Logistics Team',
    departmentStamp: 'BLOCK 2 & PANEL ROOM',
    stampBadge: '6 EVENTS',
    pinColor: 'teal',
    paperTone: 'ivory',
    tiltDeg: -0.75,
    isTentative: true,
    actionLabel: 'Explore Week 2 Events',
    actionHref: '/schedule?view=timeline',
  },
  {
    id: 'nb-2026-04',
    refCode: 'SOS/BLSM/26-27/04',
    weekId: 'week-2',
    category: 'theme-reveal',
    categoryLabel: 'Theme Reveal',
    title: 'Reel Making — Official Theme Reveal Briefing',
    summary:
      'Registered Reel Making crews must report to Room 623 & 615, Block 2 on Wednesday, 18 November (1:45 PM & 3:45 PM Onwards) for the live prompt.',
    details: [
      'Event: Reel Making (Theme Reveal) under the Theatre & Media track.',
      'Date & Time: Wednesday, 18 November 2026 at 1:45 PM & 3:45 PM Onwards.',
      'Location: Room 623 & 615, Block 2.',
    ],
    postedLabel: 'Media & Theatre Desk',
    departmentStamp: 'THEME REVEAL • ROOMS 623 & 615',
    stampBadge: 'THEME REVEAL',
    pinColor: 'purple',
    paperTone: 'lavender-slip',
    tiltDeg: 1.0,
    featuredOnMiniBoard: true,
    isTentative: true,
    linkedEventId: 'sch-2026-06',
    discipline: 'theatre',
  },
  {
    id: 'nb-2026-05',
    refCode: 'SOS/BLSM/26-27/05',
    weekId: 'week-3',
    category: 'theme-reveal',
    categoryLabel: 'Theme Reveal',
    title: 'Photography On-Spot Theme Reveal & Debate Doubleheader',
    summary:
      'Tuesday 24 November features Photography Theme Reveal (1:45 PM & 3:45 PM Onwards, Room 623) and Debate (2:00 PM Onwards, Room 615, Block 2).',
    details: [
      'Photography participants receive their official capture theme at 1:45 PM & 3:45 PM Onwards in Room 623, Block 2.',
      'Debate prelims take place in Room 615, Block 2 from 2:00 PM onwards.',
      'Week 3 also brings Mixed Media Pot Art (23 Nov, Rooms 615 & 623), Painting (25 Nov, Rooms 623 & 615), plus Mime & Battle of Bands at Campus View (26 Nov).',
    ],
    postedLabel: 'Week 3 Dispatch • Art & Literary',
    departmentStamp: 'ART & LITERARY ARENA',
    stampBadge: '24 NOV BRIEFING',
    pinColor: 'teal',
    paperTone: 'lavender-slip',
    tiltDeg: -1.05,
    isTentative: true,
    linkedEventId: 'sch-2026-09',
    discipline: 'art',
  },
  {
    id: 'nb-2026-06',
    refCode: 'SOS/BLSM/26-27/06',
    weekId: 'week-6',
    category: 'deadline',
    categoryLabel: 'Submission Deadline',
    title: 'Short Film Screening — Mandatory Cut Submission Deadline',
    summary:
      'Final film entries must be submitted by 11:59 PM on Sunday, 13 December 2026 ahead of the 16 December Room 623 screening.',
    details: [
      'Hard Deadline: 11:59 PM, Sunday, 13 December 2026.',
      'Screening Session: Wednesday, 16 December 2026 from 1:45 PM onwards at Room 623, Block 2.',
      'Ensure final video exports are uploaded before the midnight cutoff to qualify for jury screening.',
    ],
    postedLabel: 'Urgent Circular • Film & Theatre',
    departmentStamp: 'DEADLINE • 13 DEC 11:59 PM',
    stampBadge: 'DEADLINE ALERT',
    pinColor: 'crimson',
    paperTone: 'peach-memo',
    tiltDeg: 0.9,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: true,
    linkedEventId: 'sch-2026-31',
    discipline: 'theatre',
  },
  {
    id: 'nb-2026-07',
    refCode: 'SOS/BLSM/26-27/07',
    weekId: 'week-4',
    category: 'weekly-update',
    categoryLabel: 'Weekly Update',
    title: 'Week 4 Multi-Venue Rush: Birds Park, Block 2 & Garden Street',
    summary:
      '8 prelims run across 30 Nov – 5 Dec including Dumb Charades, Pencil Sketching, Mono Acting, IMPULSE Solo Dance, and Street Theatre.',
    details: [
      'Mon 30 Nov – Wed 2 Dec (Block 2): Dumb Charades (Room 623), Pencil Sketching (Rooms 623 & 615), and Mono Acting (2:00 PM, Room 615).',
      'Thu 3 Dec – Fri 4 Dec: Digital Poster Making (Room 623), Dance Duet (3:45 PM), Mehendi (12:45–3:45 & 3:45–6:00 PM), and IMPULSE - Solo Dance (3:45–7:00 PM) at Birds Park.',
      'Saturday 5 Dec: Street Theatre takes over Garden Street from 12:00 PM onwards.',
    ],
    postedLabel: 'Week 4 Dispatch • Venue Control',
    departmentStamp: 'MULTI-VENUE • 8 EVENTS',
    stampBadge: 'PEAK WEEK',
    pinColor: 'purple',
    paperTone: 'ivory',
    tiltDeg: -0.8,
    isTentative: true,
    linkedEventId: 'sch-2026-20',
    discipline: 'dance',
  },
  {
    id: 'nb-2026-08',
    refCode: 'SOS/BLSM/26-27/08',
    weekId: 'week-3',
    category: 'venue-alert',
    categoryLabel: 'Venue & Timing Note',
    title: 'Campus View Doubleheader: Mime & Battle of Bands (26 Nov)',
    summary:
      'Thursday 26 November moves outdoors to Campus View with Mime at 12:00 PM followed by Western & Indian Electric Battle of Bands from 3:45 PM – 6:00 PM.',
    details: [
      '12:00 PM at Campus View: Mime prelims under the Theatre & Stage track.',
      '3:45 PM – 6:00 PM at Campus View: Battle of Bands (Western Electric Group) & Battle of Bands (Indian Electric Group).',
      'Equipment setup and soundcheck reporting windows are coordinated directly with Campus View stage managers.',
    ],
    postedLabel: 'Schedule Update • Stage & Music',
    departmentStamp: 'CAMPUS VIEW • 26 NOV',
    stampBadge: 'CAMPUS VIEW',
    pinColor: 'amber',
    paperTone: 'sticky-yellow',
    tiltDeg: 1.2,
    isTentative: true,
    linkedEventId: 'sch-2026-13',
    discipline: 'music',
  },
  {
    id: 'nb-2026-09',
    refCode: 'SOS/BLSM/26-27/09',
    weekId: 'week-5',
    category: 'weekly-update',
    categoryLabel: 'Weekly Update',
    title: 'Week 5 Prelims: Quiz Batches, Assembly Hall Vocals & K.E. Dance',
    summary:
      '7–12 Dec brings two-batch Quiz, Indian Folk & Film Solo Singing, Extempore, Creative Writing, Rangoli, JAM, and K.E. Auditorium Dance events.',
    details: [
      'Mon 7 Dec: Quiz (Batch 1 - 2:00 PM & Batch 2 - 4:00 PM, Block 2 Rooms 623 & 615) & Indian Folk and Film Solo Singing (3:45 PM, Assembly Hall).',
      'Tue 8 – Fri 11 Dec: Extempore (Room 623), Creative Writing (Rooms 615, 623 & 627), Rangoli Design (Block 2 Entrance), and Just A Minute (JAM, 3:45 PM, Room 623).',
      'Saturday 12 Dec at K.E. Auditorium: Classical Dance Group (1:00 PM – 3:00 PM) followed by Indian Group Dance: Non-Theme (3:45 PM Onwards).',
    ],
    postedLabel: 'Week 5 Dispatch • Auditorium Desk',
    departmentStamp: 'WEEK 5 • 8 EVENTS',
    stampBadge: 'K.E. DANCE',
    pinColor: 'purple',
    paperTone: 'ivory',
    tiltDeg: -0.95,
    isTentative: true,
    linkedEventId: 'sch-2026-22',
    discipline: 'literary',
  },
  {
    id: 'nb-2026-10',
    refCode: 'SOS/BLSM/26-27/10',
    weekId: 'week-6',
    category: 'weekly-update',
    categoryLabel: 'Weekly Update',
    title: 'Week 6 Finale: Solo Singing, Short Film Screening & Proscenium',
    summary:
      'Closing week runs 14–19 Dec, wrapping prelims with Western Singing Solo, Short Film Screening, and Proscenium at K.E. Auditorium.',
    details: [
      'Monday 14 Dec: Western Singing (Solo) at 3:45 PM onwards in Room 623, Block 2.',
      'Wednesday 16 Dec: Short Film Screening at 1:45 PM onwards in Room 623 (Submission Deadline: 11:59 PM, 13 Dec).',
      'Saturday 19 Dec: Proscenium Theatre closes the tentative prelims schedule at K.E. Auditorium from 12:00 noon onwards.',
    ],
    postedLabel: 'Week 6 Dispatch • Finale Desk',
    departmentStamp: 'K.E. AUDITORIUM • 19 DEC',
    stampBadge: 'FINALE WEEK',
    pinColor: 'crimson',
    paperTone: 'ivory',
    tiltDeg: 0.75,
    isTentative: true,
    linkedEventId: 'sch-2026-32',
    discipline: 'theatre',
  },
];

/**
 * Formats a Date object as local ISO YYYY-MM-DD without UTC timezone drift.
 */
export function toLocalIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Determines which FestivalWeek corresponds to the provided date.
 * Before Nov 9 -> Pre-Fest (week-0). After Dec 20 -> Finale Week (week-6).
 */
export function getActiveFestivalWeek(now: Date = new Date()): FestivalWeek {
  const iso = toLocalIsoDate(now);

  for (const week of FESTIVAL_WEEKS_2026) {
    if (iso >= week.startDate && iso <= week.endDate) {
      return week;
    }
  }

  if (iso < FESTIVAL_WEEKS_2026[0].startDate) {
    return FESTIVAL_WEEKS_2026[0];
  }

  return FESTIVAL_WEEKS_2026[FESTIVAL_WEEKS_2026.length - 1];
}

/**
 * Returns all ScheduleEvents falling inside a FestivalWeek's [startDate, endDate], sorted chronologically.
 */
export function getEventsForWeek(
  week: FestivalWeek,
  events: ScheduleEvent[] = BLOSSOMS_SCHEDULE_2026
): ScheduleEvent[] {
  return events
    .filter((e) => e.date >= week.startDate && e.date <= week.endDate)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return (a.startTime24 || '00:00').localeCompare(b.startTime24 || '00:00');
    });
}

/**
 * Generates the Mon–Sun 7-day calendar strip for a given FestivalWeek.
 * For week-0 (which spans 2 weeks), returns the 7 days of the second/active sub-week or upcoming 7 days within its window.
 */
export function getWeekDaySlots(
  week: FestivalWeek,
  events: ScheduleEvent[] = BLOSSOMS_SCHEDULE_2026,
  referenceDate?: Date
): WeekDaySlot[] {
  let anchorStart = new Date(`${week.startDate}T00:00:00`);

  // If week-0 spans 14 days (Oct 26 – Nov 8), show the 7-day Monday-Sunday slice matching referenceDate if inside week-0
  if (week.id === 'week-0' && referenceDate) {
    const refIso = toLocalIsoDate(referenceDate);
    if (refIso >= '2026-11-02' && refIso <= '2026-11-08') {
      anchorStart = new Date('2026-11-02T00:00:00');
    }
  }

  const slots: WeekDaySlot[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(anchorStart);
    d.setDate(anchorStart.getDate() + i);
    const iso = toLocalIsoDate(d);
    const dayEvents = events.filter((e) => e.date === iso);
    const uniqueCats = Array.from(new Set(dayEvents.map((e) => e.category))) as ScheduleCategory[];

    slots.push({
      date: iso,
      dayShort: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayFull: d.toLocaleDateString('en-US', { weekday: 'long' }),
      dayNum: String(d.getDate()),
      monthShort: d.toLocaleDateString('en-US', { month: 'short' }),
      eventCount: dayEvents.length,
      categories: uniqueCats,
    });
  }

  return slots;
}

/**
 * Finds the next upcoming ScheduleEvent relative to `now`.
 */
export function getNextMilestoneEvent(
  now: Date = new Date(),
  events: ScheduleEvent[] = BLOSSOMS_SCHEDULE_2026
): { event: ScheduleEvent; targetDate: Date } | null {
  const sorted = [...events].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return (a.startTime24 || '12:00').localeCompare(b.startTime24 || '12:00');
  });

  for (const ev of sorted) {
    const time = ev.startTime24 || '12:00';
    const target = new Date(`${ev.date}T${time}:00`);
    if (target.getTime() > now.getTime()) {
      return { event: ev, targetDate: target };
    }
  }

  return null;
}
