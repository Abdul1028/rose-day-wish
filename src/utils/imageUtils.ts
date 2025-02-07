import { COUPLE } from '@/config/content';
import { Rose, Decoration } from '@/types';

export const downloadBouquetAsImage = async (
  roses: Rose[],
  decorations: Decoration[],
  message: string,
  canvasSize: number = 500
): Promise<string> => {
  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Set canvas size
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  // Set background
  ctx.fillStyle = '#fff5f5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw border
  ctx.strokeStyle = '#ff6b6b';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

  // Add "Happy Rose Day" at the top
  ctx.fillStyle = '#ff6b6b';
  ctx.font = 'bold 32px Dancing Script';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('Happy Rose Day', canvas.width / 2, 30);

  // Function to convert SVG to image
  const svgToImage = async (svgString: string): Promise<HTMLImageElement> => {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
    URL.revokeObjectURL(url);
    return img;
  };

  // Draw decorations first (under roses)
  for (const decoration of decorations) {
    const x = ((decoration.position?.x ?? 50) / 100) * canvas.width;
    const y = ((decoration.position?.y ?? 50) / 100) * canvas.height;
    const rotation = decoration.rotation ?? 0;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);

    // Create SVG string with the correct color
    let svgString = '';
    switch (decoration.type) {
      case 'heart':
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="${decoration.color}" d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"/></svg>`;
        break;
      case 'butterfly':
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="${decoration.color}" d="M12,2C9,2,7,4,7,4S5,2,2,2C-1,2,3,8,7,12C3,16,-1,22,2,22c3,0,5-2,5-2s2,2,5,2c3,0,5-2,5-2s2,2,5,2c3,0-1-6-5-10c4-4,8-10,5-10c-3,0-5,2-5,2S15,2,12,2z"/></svg>`;
        break;
      case 'glitter':
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="${decoration.color}" d="M12,2l2.4,7.2L22,12l-7.6,2.8L12,22l-2.4-7.2L2,12l7.6-2.8L12,2z"/></svg>`;
        break;
      case 'leaves':
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="${decoration.color}" d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,7.87,17,8ZM7,20a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,7,20Z"/></svg>`;
        break;
      case 'ribbon':
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="${decoration.color}" d="M12,2C9,2,6.5,3,6.5,3S4,2,1,2C-2,2,2,8,6,12C10,8,15,2,12,2z M6,12c0,0-1,4,0,8c1-4,0-8,0-8"/></svg>`;
        break;
    }

    const img = await svgToImage(svgString);
    ctx.drawImage(img, -15, -15, 30, 30);
    ctx.restore();
  }

  // Draw roses
  for (const rose of roses) {
    const x = ((rose.position?.x ?? 50) / 100) * canvas.width;
    const y = ((rose.position?.y ?? 50) / 100) * canvas.height;
    const rotation = rose.rotation ?? 0;
    const size = rose.variant === 'bunch' ? 60 : 40;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);

    // Create SVG string for roses
    const color = rose.type === 'red' ? '#ff0000' : rose.type === 'pink' ? '#ff69b4' : '#ffffff';
    const strokeAttr = rose.type === 'white' ? 'stroke="#000000" stroke-width="0.5"' : '';
    
    let svgString = '';
    if (rose.variant === 'bunch') {
      svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="${size}" height="${size}">
        <g transform="translate(6,6)">
          <path fill="${color}" ${strokeAttr} d="M12,2C8.5,2,6.7,4.4,6.7,4.4S4.9,2,1.4,2C-2.1,2,2.4,8.5,6.7,12.8C11,8.5,15.5,2,12,2z"/>
          <path fill="#4a9c2d" d="M11.5,12.8c0,0-0.8,4.2,0.5,8.2c1.3-4,0.5-8.2,0.5-8.2"/>
        </g>
        <g transform="translate(0,0)">
          <path fill="${color}" ${strokeAttr} d="M12,2C8.5,2,6.7,4.4,6.7,4.4S4.9,2,1.4,2C-2.1,2,2.4,8.5,6.7,12.8C11,8.5,15.5,2,12,2z"/>
          <path fill="#4a9c2d" d="M11.5,12.8c0,0-0.8,4.2,0.5,8.2c1.3-4,0.5-8.2,0.5-8.2"/>
        </g>
        <g transform="translate(12,0)">
          <path fill="${color}" ${strokeAttr} d="M12,2C8.5,2,6.7,4.4,6.7,4.4S4.9,2,1.4,2C-2.1,2,2.4,8.5,6.7,12.8C11,8.5,15.5,2,12,2z"/>
          <path fill="#4a9c2d" d="M11.5,12.8c0,0-0.8,4.2,0.5,8.2c1.3-4,0.5-8.2,0.5-8.2"/>
        </g>
      </svg>`;
    } else {
      svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}">
        <path fill="${color}" ${strokeAttr} d="M12,2C8.5,2,6.7,4.4,6.7,4.4S4.9,2,1.4,2C-2.1,2,2.4,8.5,6.7,12.8C11,8.5,15.5,2,12,2z"/>
        <path fill="#4a9c2d" d="M11.5,12.8c0,0-0.8,4.2,0.5,8.2c1.3-4,0.5-8.2,0.5-8.2"/>
      </svg>`;
    }

    const img = await svgToImage(svgString);
    ctx.drawImage(img, -size/2, -size/2, size, size);
    ctx.restore();
  }

  // Add message
  ctx.fillStyle = '#4a1c1c';
  ctx.font = '20px Dancing Script';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Word wrap the message
  const words = message.split(' ');
  let line = '';
  let lines = [];
  const maxWidth = canvas.width - 40;
  
  words.forEach(word => {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      lines.push(line);
      line = word + ' ';
    } else {
      line = testLine;
    }
  });
  lines.push(line);

  // Draw message lines
  lines.forEach((line, i) => {
    ctx.fillText(
      line, 
      canvas.width / 2,
      canvas.height - 120 + (i * 25)
    );
  });

  // Add signature
  ctx.fillStyle = '#ff6b6b';
  ctx.font = 'italic 24px Dancing Script';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText(`Love from ${COUPLE.to}`, canvas.width - 30, canvas.height - 30);

  // Return the data URL along with downloading
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'my-special-bouquet.png';
  link.href = dataUrl;
  link.click();

  return dataUrl;
};

// Helper functions to draw decorations
function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const path = new Path2D("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z");
  ctx.scale(size/24, size/24);
  ctx.fill(path);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawButterfly(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const path = new Path2D("M12,2C9,2,7,4,7,4S5,2,2,2C-1,2,3,8,7,12C3,16,-1,22,2,22c3,0,5-2,5-2s2,2,5,2c3,0,5-2,5-2s2,2,5,2c3,0-1-6-5-10c4-4,8-10,5-10c-3,0-5,2-5,2S15,2,12,2z");
  ctx.scale(size/24, size/24);
  ctx.fill(path);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const path = new Path2D("M12,2l2.4,7.2L22,12l-7.6,2.8L12,22l-2.4-7.2L2,12l7.6-2.8L12,2z");
  ctx.scale(size/24, size/24);
  ctx.fill(path);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawLeaf(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const path = new Path2D("M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,7.87,17,8ZM7,20a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,7,20Z");
  ctx.scale(size/24, size/24);
  ctx.fill(path);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawRibbon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.scale(size/24, size/24);
  ctx.fill(new Path2D("M12,2C9,2,6.5,3,6.5,3S4,2,1,2C-2,2,2,8,6,12C10,8,15,2,12,2z"));
  ctx.fill(new Path2D("M6,12c0,0-1,4,0,8c1-4,0-8,0-8"));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
} 