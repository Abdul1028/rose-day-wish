"use client";

import { useState } from 'react';
import Image from 'next/image';

interface RoseProps {
  message: string;
  onPluck?: () => void;
}

export default function Rose({ message, onPluck }: RoseProps) {
  const [isPlucked, setIsPlucked] = useState(false);

  const handlePluck = () => {
    if (!isPlucked) {
      setIsPlucked(true);
      
      // Show toast
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-black/90 px-6 py-3 rounded-full shadow-xl min-w-[200px] text-center transform transition-all duration-500 z-50 animate-fade-in';
      toast.innerHTML = `
        <div class="flex items-center gap-2 justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-primary">
            <path d="M12,2C8.5,2,6.7,4.4,6.7,4.4S4.9,2,1.4,2C-2.1,2,2.4,8.5,6.7,12.8C11,8.5,15.5,2,12,2z"/>
          </svg>
          <p class="font-dancing text-primary">${message}</p>
        </div>
      `;
      
      document.body.appendChild(toast);

      // Remove toast after animation
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 20px)';
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 500);
      }, 3000);

      // Call onPluck callback
      onPluck?.();
    }
  };

  return (
    <div 
      className="relative cursor-pointer transition-transform hover:scale-105"
      onClick={handlePluck}
    >
      <Image
        src="/images/rose.svg"
        alt="A beautiful rose"
        width={100}
        height={100}
        className={`transition-all duration-500 ${
          isPlucked ? 'opacity-50 scale-90' : 'hover:scale-110'
        }`}
      />
    </div>
  );
} 