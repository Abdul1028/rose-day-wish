"use client";

import Image from 'next/image';
import { COUPLE } from '@/config/content';

interface HerPhotoProps {
  onContinue: () => void;
}

export default function HerPhoto({ onContinue }: HerPhotoProps) {
  return (
    <section className="garden-section overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-dancing text-primary mb-8 text-center">
          My Beautiful {COUPLE.to} 💝
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Photo */}
          <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/your-photo.jpg"
              alt={COUPLE.to}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>

          {/* Message */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <p className="text-lg font-dancing text-primary">
              Dear {COUPLE.to},
            </p>
            <p className="text-foreground/80">
              Your smile brightens my darkest days, and your love fills my heart with endless joy. 
              Every moment with you feels like a beautiful dream come true.
            </p>
            <p className="text-foreground/80">
              Your kindness, grace, and the way you light up any room you enter make me fall in love 
              with you more each day. You're not just beautiful on the outside, but your soul shines 
              with a radiance that takes my breath away.
            </p>
            <p className="text-primary font-dancing text-xl mb-8">
              You're my perfect rose in this garden of life 🌹
            </p>
            <button 
              onClick={onContinue}
              className="rose-button animate-bounce"
            >
              Watch Video →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 