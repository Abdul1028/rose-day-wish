"use client";

import { useState } from 'react';
import Rose from './Rose';
import VideoMessage from './VideoMessage';
import BouquetBuilder from './BouquetBuilder';
import GiveRoses from './GiveRoses';
import HerPhoto from './HerPhoto';

export default function Garden() {
  const [pluckedCount, setPluckedCount] = useState(0);
  const [currentSection, setCurrentSection] = useState<'roses' | 'memories' | 'video' | 'bouquet'>('roses');
  const [hasReceivedRoses, setHasReceivedRoses] = useState(false);

  // Only show navigation after receiving roses
  const showNav = currentSection !== 'bouquet' || hasReceivedRoses;

  return (
    <div className="min-h-screen">
      {showNav && (
        <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-40">
          <div className="flex justify-center gap-4 p-4 flex-wrap">
            <button
              onClick={() => setCurrentSection('roses')}
              className={`rose-button !py-2 ${currentSection === 'roses' ? 'opacity-100' : 'opacity-70'}`}
            >
              Roses
            </button>
            <button
              onClick={() => setCurrentSection('memories')}
              className={`rose-button !py-2 ${currentSection === 'memories' ? 'opacity-100' : 'opacity-70'}`}
            >
              Memories
            </button>
            <button
              onClick={() => setCurrentSection('video')}
              className={`rose-button !py-2 ${currentSection === 'video' ? 'opacity-100' : 'opacity-70'}`}
            >
              Video Message
            </button>
            <button
              onClick={() => setCurrentSection('bouquet')}
              className={`rose-button !py-2 ${currentSection === 'bouquet' ? 'opacity-100' : 'opacity-70'}`}
            >
              Build Bouquet
            </button>
          </div>
        </nav>
      )}

      <div className="pt-20">
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
                      message="I love you more each day! 🌹"
                      onPluck={() => setPluckedCount(prev => prev + 1)}
                    />
                  ))}
                </div>
                
                {pluckedCount === 6 && (
                  <p className="mt-8 text-xl font-dancing text-primary animate-fade-in">
                    You've found all my roses! ❤️
                  </p>
                )}
              </section>
            )}
            {currentSection === 'memories' && <HerPhoto />}
            {currentSection === 'video' && <VideoMessage />}
            {currentSection === 'bouquet' && hasReceivedRoses && <BouquetBuilder />}
          </>
        )}
      </div>
    </div>
  );
} 