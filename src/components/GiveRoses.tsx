"use client";

import { useState } from 'react';
import Image from 'next/image';
import { COUPLE } from '@/config/content';

export default function GiveRoses({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<'initial' | 'giving' | 'complete'>('initial');

  const startGiving = () => {
    setStep('giving');
    setTimeout(() => {
      setStep('complete');
    }, 3000); // Animation duration
  };

  if (step === 'initial') {
    return (
      <section className="garden-section">
        <h2 className="text-3xl md:text-4xl font-dancing text-primary mb-8 text-center">
          Happy Rose Day {COUPLE.to}! ❤️
        </h2>
        <button onClick={startGiving} className="rose-button animate-pulse">
          Accept My Roses
        </button>
      </section>
    );
  }

  if (step === 'giving') {
    return (
      <section className="garden-section">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-float-up opacity-0">
              <Image
                src="/images/red-rose.svg"
                alt="Rose"
                width={100}
                height={100}
                className="transform rotate-45"
              />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center delay-300">
            <div className="animate-float-up opacity-0">
              <Image
                src="/images/pink-rose.svg"
                alt="Rose"
                width={100}
                height={100}
                className="transform -rotate-45"
              />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center delay-600">
            <div className="animate-float-up opacity-0">
              <Image
                src="/images/white-rose.svg"
                alt="Rose"
                width={100}
                height={100}
              />
            </div>
          </div>
          <h2 className="text-3xl font-dancing text-primary animate-fade-in">
            For You...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="garden-section">
      <div className="text-center max-w-md mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-dancing text-primary mb-6">
          With Love, from {COUPLE.from}
        </h2>
        <p className="text-xl font-dancing mb-8">
          Now it's your turn! Would you create a beautiful bouquet for me too? 🌹
        </p>
        <button onClick={onComplete} className="rose-button animate-bounce">
          Create Your Bouquet
        </button>
      </div>
    </section>
  );
} 