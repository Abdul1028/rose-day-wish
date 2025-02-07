"use client";

import { MEMORIES } from '@/config/content';
import Image from 'next/image';

export default function MemoryLane() {
  return (
    <section className="garden-section">
      <h2 className="text-3xl font-dancing text-primary mb-8">Our Memories</h2>
      
      <div className="w-full max-w-4xl overflow-x-auto pb-8">
        <div className="flex gap-8 min-w-max px-4">
          {MEMORIES.map((memory) => (
            <div
              key={memory.id}
              className="relative group w-64 bg-white/90 dark:bg-black/90 p-6 rounded-lg shadow-xl 
                         hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute -top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Image
                  src="/images/rose.svg"
                  alt="Rose decoration"
                  width={24}
                  height={24}
                />
              </div>
              
              {memory.imageUrl && (
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={memory.imageUrl}
                    alt={memory.caption}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <p className="font-dancing text-primary text-lg mb-2">
                {new Date(memory.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              
              <p className="font-playfair text-foreground">
                {memory.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-sm text-foreground/70 mt-4">
        Scroll horizontally to view more memories →
      </p>
    </section>
  );
} 