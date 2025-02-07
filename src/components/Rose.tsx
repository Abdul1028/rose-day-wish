"use client";

import { useState } from 'react';
import Image from 'next/image';

interface RoseProps {
  message: string;
  onPluck?: () => void;
}

export default function Rose({ message, onPluck }: RoseProps) {
  const [isPlucked, setIsPlucked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handlePluck = () => {
    if (!isPlucked) {
      setIsPlucked(true);
      setShowMessage(true);
      onPluck?.();
      
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <div className="relative group cursor-pointer" onClick={handlePluck}>
      <Image
        src="/images/rose.svg"
        alt="A beautiful rose"
        width={100}
        height={100}
        className={`transition-all duration-500 ${
          isPlucked ? 'opacity-50 scale-90' : 'hover:scale-110'
        }`}
      />
      
      {showMessage && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-black/90 p-4 rounded-lg shadow-xl min-w-[200px] text-center animate-fade-in">
          <p className="font-dancing text-primary">{message}</p>
        </div>
      )}
    </div>
  );
} 