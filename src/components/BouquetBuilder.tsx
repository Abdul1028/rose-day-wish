"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Rose, Decoration } from '@/types';
import { COUPLE } from '@/config/content';
import { downloadBouquetAsImage } from '@/utils/imageUtils';

const ROSE_TYPES = [
  { type: 'red', variant: 'single', label: 'Red Rose' },
  { type: 'red', variant: 'bunch', label: 'Red Bouquet' },
  { type: 'pink', variant: 'single', label: 'Pink Rose' },
  { type: 'pink', variant: 'bunch', label: 'Pink Bouquet' },
  { type: 'white', variant: 'single', label: 'White Rose' },
  { type: 'white', variant: 'bunch', label: 'White Bouquet' },
] as const;

const DECORATIONS = [
  { type: 'ribbon', label: 'Ribbon', colors: ['#ff6b6b', '#ffd93d', '#4a9c2d', '#ff69b4'] },
  { type: 'glitter', label: 'Glitter', colors: ['#ffd700', '#c0c0c0', '#ff69b4'] },
  { type: 'heart', label: 'Hearts', colors: ['#ff6b6b', '#ff69b4'] },
  { type: 'butterfly', label: 'Butterfly', colors: ['#4a9c2d', '#ff69b4', '#ffd93d'] },
  { type: 'leaves', label: 'Leaves', colors: ['#4a9c2d', '#355e3b'] },
] as const;

export default function BouquetBuilder() {
  const [roses, setRoses] = useState<Rose[]>([]);
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [selectedRose, setSelectedRose] = useState<{
    type: Rose['type'];
    variant: Rose['variant'];
  } | null>(null);
  const [selectedDecoration, setSelectedDecoration] = useState<{
    type: Decoration['type'];
    color: string;
  } | null>(null);
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [activeTab, setActiveTab] = useState<'roses' | 'decorations'>('roses');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleRoseSelect = (rose: typeof ROSE_TYPES[number]) => {
    setSelectedRose(null);
    setSelectedDecoration(null);
    setTimeout(() => {
      setSelectedRose({ type: rose.type, variant: rose.variant });
    }, 0);
  };

  const handleDecorationSelect = (type: Decoration['type'], color: string) => {
    setSelectedDecoration({ type, color });
    setSelectedRose(null);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedRose && !selectedDecoration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const rotation = Math.random() * 360;

    if (selectedRose) {
      setRoses(prev => [...prev, {
        id: `rose-${Date.now()}`,
        type: selectedRose.type,
        variant: selectedRose.variant,
        position: { x, y },
        rotation
      }]);
      setSelectedRose(null);
    } else if (selectedDecoration) {
      setDecorations(prev => [...prev, {
        id: `decoration-${Date.now()}`,
        type: selectedDecoration.type,
        color: selectedDecoration.color,
        position: { x, y },
        rotation
      }]);
      setSelectedDecoration(null);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!selectedRose) return;

    const touch = e.changedTouches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    const rotation = Math.random() * 360;

    setRoses(prev => [...prev, {
      id: `rose-${Date.now()}`,
      type: selectedRose.type,
      variant: selectedRose.variant,
      position: { x, y },
      rotation
    }]);
    setSelectedRose(null);
  };

  const completeBouquet = () => {
    if (roses.length > 0 && message.trim()) {
      setShowCompletion(true);
    }
  };

  const handleDownload = async () => {
    const imageUrl = await downloadBouquetAsImage(roses, decorations, message);
    setPreviewImage(imageUrl);
    // Show toast
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-full shadow-lg transform transition-all duration-500 flex items-center gap-2 z-50';
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      <span>Don't forget to share me your bouquet! 🌹</span>
    `;
    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 3000);
  };

  return (
    <section className="garden-section">
      <h2 className="text-3xl font-dancing text-primary mb-4 text-center">
        Create Your Special Bouquet for {COUPLE.from}
      </h2>

      {/* Mobile instructions */}
      <p className="text-sm text-foreground/70 mb-6 text-center px-4">
        Select a rose and tap on the canvas to place it
      </p>

      <div className="flex flex-col gap-6 w-full px-4 max-w-lg mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setActiveTab('roses')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'roses' ? 'bg-primary text-white' : 'bg-primary/20'
            }`}
          >
            Roses
          </button>
          <button
            onClick={() => setActiveTab('decorations')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'decorations' ? 'bg-primary text-white' : 'bg-primary/20'
            }`}
          >
            Decorations
          </button>
        </div>

        {/* Palette */}
        <div className="flex flex-wrap justify-center gap-4 p-4 bg-white/90 dark:bg-black/90 rounded-lg shadow-xl">
          {activeTab === 'roses' ? (
            ROSE_TYPES.map((rose) => (
              <div
                key={`${rose.type}-${rose.variant}`}
                onClick={() => handleRoseSelect(rose)}
                className={`cursor-pointer transition-all ${
                  selectedRose?.type === rose.type && 
                  selectedRose?.variant === rose.variant
                    ? 'scale-110 bg-primary/10 p-2 rounded-lg' 
                    : 'hover:scale-105'
                }`}
              >
                <Image
                  src={`/images/roses/${rose.type}-${rose.variant}.svg`}
                  alt={rose.label}
                  width={50}
                  height={50}
                />
                <p className="text-xs text-center mt-1">{rose.label}</p>
              </div>
            ))
          ) : (
            DECORATIONS.map((dec) => (
              <div key={dec.type} className="flex flex-col gap-2">
                <p className="text-xs text-center">{dec.label}</p>
                <div className="flex gap-2">
                  {dec.colors.map((color) => (
                    <div
                      key={`${dec.type}-${color}`}
                      onClick={() => handleDecorationSelect(dec.type, color)}
                      className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                        selectedDecoration?.type === dec.type && 
                        selectedDecoration?.color === color
                          ? 'scale-110 ring-2 ring-primary shadow-lg' 
                          : 'hover:scale-105'
                      }`}
                      style={{ 
                        backgroundColor: color,
                        boxShadow: `0 2px 4px ${color}80`
                      }}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Canvas */}
        <div
          className={`relative aspect-square w-full border-4 border-dashed rounded-lg ${
            (selectedRose || selectedDecoration) ? 'border-primary' : 'border-primary/30'
          } transition-colors bg-white/5`}
          onClick={handleCanvasClick}
        >
          {/* Render decorations first (under roses) */}
          {decorations.map((decoration) => (
            <div
              key={decoration.id}
              style={{
                position: 'absolute',
                left: `${decoration.position?.x ?? 0}%`,
                top: `${decoration.position?.y ?? 0}%`,
                transform: `translate(-50%, -50%) rotate(${decoration.rotation}deg)`,
                color: decoration.color,
              }}
            >
              {decoration.type === 'heart' && (
                <svg width="30" height="30" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"/>
                </svg>
              )}
              {decoration.type === 'butterfly' && (
                <svg width="30" height="30" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,2C9,2,7,4,7,4S5,2,2,2C-1,2,3,8,7,12C3,16,-1,22,2,22c3,0,5-2,5-2s2,2,5,2c3,0,5-2,5-2s2,2,5,2c3,0-1-6-5-10c4-4,8-10,5-10c-3,0-5,2-5,2S15,2,12,2z"/>
                </svg>
              )}
              {decoration.type === 'glitter' && (
                <svg width="30" height="30" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,2l2.4,7.2L22,12l-7.6,2.8L12,22l-2.4-7.2L2,12l7.6-2.8L12,2z"/>
                </svg>
              )}
              {decoration.type === 'leaves' && (
                <svg width="30" height="30" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,7.87,17,8ZM7,20a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,7,20Z"/>
                </svg>
              )}
              {decoration.type === 'ribbon' && (
                <svg width="30" height="30" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,2C9,2,6.5,3,6.5,3S4,2,1,2C-2,2,2,8,6,12C10,8,15,2,12,2z"/>
                  <path fill="currentColor" d="M6,12c0,0-1,4,0,8c1-4,0-8,0-8"/>
                </svg>
              )}
            </div>
          ))}

          {/* Render roses on top */}
          {roses.map((rose) => (
            <div
              key={rose.id}
              style={{
                position: 'absolute',
                left: `${rose.position?.x ?? 0}%`,
                top: `${rose.position?.y ?? 0}%`,
                transform: `translate(-50%, -50%) rotate(${rose.rotation}deg)`,
              }}
            >
              <Image
                src={`/images/roses/${rose.type}-${rose.variant}.svg`}
                alt={`${rose.type} rose`}
                width={rose.variant === 'bunch' ? 60 : 40}
                height={rose.variant === 'bunch' ? 60 : 40}
              />
            </div>
          ))}

          {/* Instructions */}
          {roses.length === 0 && decorations.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-foreground/50 text-center px-4">
              {selectedRose || selectedDecoration 
                ? 'Tap anywhere to place the item' 
                : 'Select roses or decorations above'}
            </div>
          )}
        </div>

        {/* Message input */}
        <div className="w-full">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add your message here..."
            className="w-full p-4 rounded-lg bg-white/90 dark:bg-black/90 border-2 border-primary/30 focus:border-primary outline-none transition-colors resize-none h-32"
          />
        </div>

        <button
          onClick={completeBouquet}
          disabled={roses.length === 0 || !message.trim()}
          className="rose-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Bouquet
        </button>
      </div>

      {/* Completion modal */}
      {showCompletion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
            <h3 className="text-2xl font-dancing text-primary mb-4">
              Bouquet Created with Love!
            </h3>
            
            {previewImage && (
              <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden">
                <Image
                  src={previewImage}
                  alt="Your bouquet"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            
            <p className="mb-6">
              This bouquet blooms for our everlasting love! 🌹
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDownload}
                className="rose-button bg-secondary hover:bg-secondary/90"
              >
                <span className="flex items-center justify-center gap-2">
                  Download Bouquet
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </span>
              </button>

              <button
                onClick={() => {
                  setShowCompletion(false);
                  setPreviewImage(null);
                }}
                className="rose-button"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 