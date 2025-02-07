"use client";

import { useState } from 'react';
import Rose from './Rose';
import VideoMessage from './VideoMessage';
import BouquetBuilder from './BouquetBuilder';
import GiveRoses from './GiveRoses';
import HerPhoto from './HerPhoto';
import { ROSE_MESSAGES } from '@/config/content';

export default function Garden() {
  const [pluckedCount, setPluckedCount] = useState(0);
  const [currentSection, setCurrentSection] = useState<'roses' | 'memories' | 'video' | 'bouquet'>('roses');
  const [hasReceivedRoses, setHasReceivedRoses] = useState(false);

  const goToNextSection = () => {
    switch (currentSection) {
      case 'roses':
        setCurrentSection('memories');
        break;
      case 'memories':
        setCurrentSection('video');
        break;
      case 'video':
        setCurrentSection('bouquet');
        break;
    }
  };

  const goToPreviousSection = () => {
    switch (currentSection) {
      case 'memories':
        setCurrentSection('roses');
        break;
      case 'video':
        setCurrentSection('memories');
        break;
      case 'bouquet':
        setCurrentSection('video');
        break;
    }
  };

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * ROSE_MESSAGES.length);
    return ROSE_MESSAGES[randomIndex];
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center">
      <div className="flex-1 flex flex-col justify-center pt-4 pb-24">
        {currentSection === 'bouquet' && !hasReceivedRoses ? (
          <GiveRoses onComplete={() => setHasReceivedRoses(true)} />
        ) : (
          <>
            {currentSection === 'roses' && (
              <section className="garden-section">
                <h2 className="text-3xl font-dancing text-primary mb-8">
                  Pluck a rose to reveal a message
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Rose
                      key={index}
                      message={getRandomMessage()}
                      onPluck={() => setPluckedCount(prev => prev + 1)}
                    />
                  ))}
                </div>
                
                {pluckedCount === 6 && (
                  <div className="mt-8 text-center">
                    <p className="text-xl font-dancing text-primary animate-fade-in mb-4">
                      You've found all my roses! ❤️
                    </p>
                    <button 
                      onClick={goToNextSection}
                      className="rose-button animate-bounce"
                    >
                      Continue to Our Memories →
                    </button>
                  </div>
                )}
              </section>
            )}
            {currentSection === 'memories' && (
              <div className="relative">
                <HerPhoto onContinue={goToNextSection} />
              </div>
            )}
            {currentSection === 'video' && (
              <div className="relative">
                <VideoMessage onComplete={() => setCurrentSection('bouquet')} />
              </div>
            )}
            {currentSection === 'bouquet' && hasReceivedRoses && <BouquetBuilder />}
          </>
        )}
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
        {['roses', 'memories', 'video', 'bouquet'].map((section) => (
          <div
            key={section}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSection === section 
                ? 'bg-primary w-4' 
                : 'bg-primary/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 