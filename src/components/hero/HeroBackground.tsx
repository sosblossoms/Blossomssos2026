'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { usePrefersReducedMotion } from '@/lib/hooks';

// Dynamically import GhostFibers with SSR disabled for WebGL canvas
const GhostFibers = dynamic(() => import('./GhostFibers'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#FFDBC3]" aria-hidden="true" />,
});

interface HeroBackgroundProps {
  children?: React.ReactNode;
}

/**
 * HeroBackground — Visual Architecture
 * 
 * Minimalist, high-end visual background with React Bits GhostFibers.
 * Official Colour Hunt Palette:
 * - Base: Peach (#FFDBC3)
 * - Fiber Glow: Soft Lavender (#9F91CC)
 * - Fiber Line: Royal Purple (#5C4B99 / #7A66B0)
 * - Secondary Accent: Royal Purple (#5C4B99)
 * 
 * Includes scroll-driven auto-hide transitions and reduced-motion support:
 * - Fibers smoothly dissolve as user scrolls down away from hero
 * - Fully autohidden (opacity: 0, visibility: hidden, WebGL paused) when offscreen
 * - Strictly pointer-events-none and aria-hidden so foreground CTAs are never blocked
 * - Respects prefers-reduced-motion: reduce
 */
export function HeroBackground({ children }: HeroBackgroundProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const height = heroRef.current.offsetHeight || 640;
        // Scroll distance from the top of the hero
        const scrollAmount = -rect.top;
        // Fully fade out across 65% of the hero height
        const fadeThreshold = height * 0.65;
        const progress = Math.min(Math.max(scrollAmount / fadeThreshold, 0), 1);
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion]);

  const effectiveProgress = prefersReducedMotion ? 0 : scrollProgress;
  const isHidden = effectiveProgress >= 1;
  const fiberOpacity = prefersReducedMotion ? 0.45 : Math.max(0, 0.7 * (1 - effectiveProgress));
  const fiberTranslateY = prefersReducedMotion ? 0 : effectiveProgress * 55;

  return (
    <div 
      ref={heroRef}
      className="relative w-full min-h-[600px] sm:min-h-[640px] md:min-h-[680px] flex items-center justify-center overflow-hidden bg-[#FFDBC3]"
    >
      {/* Layer 0: React Bits GhostFibers Canvas with Scroll-Driven Auto-Hide */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
        aria-hidden="true"
        style={{
          opacity: fiberOpacity,
          transform: prefersReducedMotion ? 'none' : `translate3d(0, ${fiberTranslateY}px, 0)`,
          visibility: isHidden ? 'hidden' : 'visible',
          transition: prefersReducedMotion
            ? 'none'
            : 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <GhostFibers
          glowColor="#9F91CC"
          lineColor="#7A66B0"
          secondaryColor="#5C4B99"
          gradient="depth"
          layers={2}
          twist={1.1}
          threads={36}
          thickness={1.3}
          fiberStyle="lines"
          depthOfField={0.45}
          particles={0}
          sparkle={0}
          pulseOnClick={false}
          hoverEffect="focus"
          intro={!prefersReducedMotion}
          mouseInteraction={!prefersReducedMotion}
          speed={0.22}
          brightness={1.02}
          glow={0.85}
          lightMode={true}
          paused={isHidden || prefersReducedMotion}
          vignette={0.25}
          grain={0}
        />
      </div>

      {/* Layer 1: Center Peach Scrim & Ambient Blend for Crisp Hero Typography Contrast */}
      <div 
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 68% 58% at 50% 48%, rgba(255, 219, 195, 0.72) 0%, rgba(255, 219, 195, 0.42) 55%, #FFDBC3 96%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 1.5: Linear Bottom Transition into subsequent section */}
      <div 
        className="absolute inset-x-0 bottom-0 h-36 z-1 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 219, 195, 0.55) 48%, #FFDBC3 100%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Foreground Content (relative z-10 for unblocked clicks) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-16">
        {children}
      </div>
    </div>
  );
}
