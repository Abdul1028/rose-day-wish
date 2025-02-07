export interface LoveNote {
  id: number;
  message: string;
}

export interface Memory {
  id: number;
  date: string;
  caption: string;
  imageUrl?: string;
}

export interface Couple {
  from: string;
  to: string;
}

export interface Decoration {
  id: string;
  type: 'ribbon' | 'glitter' | 'heart' | 'butterfly' | 'leaves';
  color?: string;
  position?: {
    x: number;
    y: number;
  };
  rotation?: number;
}

export interface Rose {
  id: string;
  type: 'red' | 'pink' | 'white';
  variant: 'single' | 'bunch' | 'bud';
  position?: {
    x: number;
    y: number;
  };
  rotation?: number;
}

export interface Bouquet {
  roses: Rose[];
  decorations: Decoration[];
  message: string;
} 