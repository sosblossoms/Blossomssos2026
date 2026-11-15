import React from 'react';
import Link from 'next/link';
import { EventCategory } from '@/types/content';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { ArrowRight, Layers } from 'lucide-react';

interface CategoryCardProps {
  category: EventCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="group relative p-6 sm:p-8 rounded-2xl bg-[#FFFCF5] border border-[rgba(61,36,108,0.16)] hover:border-[rgba(92,75,153,0.40)] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_12px_32px_rgba(61,36,108,0.12)] hover:-translate-y-1">
      <div>
        {/* Top Header with Category Icon & Category Badge */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center p-2 bg-[#9F91CC]/25 border border-[rgba(61,36,108,0.16)] shadow-inner text-[#5C4B99] group-hover:scale-105 transition-transform"
            >
              <CategoryIcon category={category.slug} size={28} />
            </div>
            <div>
              <span
                className="font-angular inline-block px-3 py-0.5 rounded-full text-xs font-bold tracking-wider transition-colors border border-[rgba(61,36,108,0.16)] bg-[#FFDBC3] text-[#3D246C]"
              >
                {category.name}
              </span>
              <span className="block text-xs text-[#5C4B99] font-tech font-medium mt-1">
                /{category.slug}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-tech text-[#3D246C] bg-white px-3 py-1.5 rounded-full border border-[rgba(61,36,108,0.16)] shrink-0">
            <Layers className="w-3.5 h-3.5 text-[#5C4B99]" />
            <span className="font-bold text-[#3D246C]">{category.events.length}</span>
            <span className="text-[#3D246C]/85">Events</span>
          </div>
        </div>

        {/* Editorial Tagline */}
        <h3 className="font-serif italic text-xl sm:text-2xl font-semibold text-[#3D246C] mb-2.5 group-hover:text-[#5C4B99] transition-colors leading-snug">
          {category.tagline}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#3D246C]/85 leading-relaxed line-clamp-3 font-normal">
          {category.description}
        </p>
      </div>

      {/* Footer Link */}
      <div className="mt-6 pt-4 border-t border-[rgba(61,36,108,0.16)] flex items-center justify-between gap-3">
        <span className="text-xs font-tech font-medium text-[#3D246C]/80 group-hover:text-[#3D246C] transition-colors">
          Explore sub-events
        </span>
        <Link
          href={`/events/${category.slug}`}
          className="inline-flex items-center gap-1.5 min-h-[44px] px-2 -mr-2 text-xs font-tech font-bold text-[#5C4B99] group-hover:text-[#3D246C] group-hover:translate-x-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded-lg"
          aria-label={`View all ${category.name} events`}
        >
          <span>View Guidelines</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
