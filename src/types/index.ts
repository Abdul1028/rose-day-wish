export interface Position {
  x: number;
  y: number;
}

export interface LoveNote {
  id: number;
  message: string;
}

export interface Memory {
  id: number;
  date: string;
  caption: string;
}

export interface Couple {
  from: string;
  to: string;
}

export interface Decoration {
  id: string;
  type: 'heart' | 'butterfly' | 'glitter' | 'leaves' | 'ribbon';
  color: string;
  position: Position;
  rotation: number;
}

export interface Rose {
  id: string;
  type: 'red' | 'pink' | 'white';
  variant: 'single' | 'bunch';
  position: Position;
  rotation: number;
}

export interface Bouquet {
  roses: Rose[];
  decorations: Decoration[];
  message: string;
} 