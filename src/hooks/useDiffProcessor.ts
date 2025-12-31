import { useState, useEffect } from 'react';

export interface DiffBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  density: number;
  severity: 'Major' | 'Medium' | 'Low';
  pixelCount: number;
}

interface UseDiffProcessorResult {
  boxes: DiffBox[];
  counts: {
    Major: number;
    Medium: number;
    Low: number;
  };
  isProcessing: boolean;
  error: string | null;
  dimensions: { width: number; height: number } | null;
}

export function useDiffProcessor(diffImageUrl: string | null): UseDiffProcessorResult {
  const [boxes, setBoxes] = useState<DiffBox[]>([]);
  const [counts, setCounts] = useState({ Major: 0, Medium: 0, Low: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (!diffImageUrl) {
      setBoxes([]);
      setCounts({ Major: 0, Medium: 0, Low: 0 });
      setDimensions(null);
      return;
    }

    // skip placeholder images
    if (diffImageUrl.includes("placehold.co")) {
       return; 
    }

    const processImage = async () => {
      setIsProcessing(true);
      setError(null);

      try {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = diffImageUrl;

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => reject(new Error("Failed to load difference image"));
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error("Could not get canvas context");
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { width, height, data } = imageData;
        setDimensions({ width, height });

        // Grid configuration
        const GRID_SIZE = 20; // 20x20 pixels blocks
        const rows = Math.ceil(height / GRID_SIZE);
        const cols = Math.ceil(width / GRID_SIZE);
        
        // 2D array to track active blocks
        const grid: { active: boolean; pixelCount: number }[][] = Array(rows).fill(null).map(() => 
          Array(cols).fill(null).map(() => ({ active: false, pixelCount: 0 }))
        );

        // 1. Scan pixels and populate grid
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Detect Red diff pixels (Pixelmatch default: 255, 0, 0)
            // We use a threshold to be safe
            const isDiff = r > 150 && g < 100 && b < 100;
            
            if (isDiff) {
              const gy = Math.floor(y / GRID_SIZE);
              const gx = Math.floor(x / GRID_SIZE);
              grid[gy][gx].pixelCount++;
            }
          }
        }

        // 2. Mark blocks as active if they have enough diff pixels
        // Threshold: e.g., > 5 pixels (noise filter)
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
             // If density in block > 2% roughly (20*20*0.02 = 8 pixels)
             if (grid[r][c].pixelCount > 5) {
               grid[r][c].active = true;
             }
          }
        }

        // 3. Simple Connected Components on Grid
        const visited = Array(rows).fill(false).map(() => Array(cols).fill(false));
        const foundBoxes: DiffBox[] = [];

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (grid[r][c].active && !visited[r][c]) {
              // Start BFS for a new component
              const queue = [{ r, c }];
              visited[r][c] = true;
              
              let minR = r, maxR = r;
              let minC = c, maxC = c;
              let totalPixels = 0;

              while (queue.length > 0) {
                const { r: cr, c: cc } = queue.shift()!;
                
                minR = Math.min(minR, cr);
                maxR = Math.max(maxR, cr);
                minC = Math.min(minC, cc);
                maxC = Math.max(maxC, cc);
                totalPixels += grid[cr][cc].pixelCount;

                // Check 4 neighbors
                const neighbors = [
                  { nr: cr - 1, nc: cc },
                  { nr: cr + 1, nc: cc },
                  { nr: cr, nc: cc - 1 },
                  { nr: cr, nc: cc + 1 },
                  // Diagonals for smoother connectivity?
                  { nr: cr - 1, nc: cc - 1 },
                  { nr: cr - 1, nc: cc + 1 },
                  { nr: cr + 1, nc: cc - 1 },
                  { nr: cr + 1, nc: cc + 1 },
                ];

                for (const { nr, nc } of neighbors) {
                  if (
                    nr >= 0 && nr < rows &&
                    nc >= 0 && nc < cols &&
                    !visited[nr][nc] &&
                    grid[nr][nc].active
                  ) {
                    visited[nr][nc] = true;
                    queue.push({ r: nr, c: nc });
                  }
                }
              }

              // Create Box
              const bx = minC * GRID_SIZE;
              const by = minR * GRID_SIZE;
              const bw = (maxC - minC + 1) * GRID_SIZE;
              const bh = (maxR - minR + 1) * GRID_SIZE;
              
              const area = bw * bh;
              const density = totalPixels / area;
              
              let severity: 'Major' | 'Medium' | 'Low' = 'Low';
              if (density > 0.3) severity = 'Major'; // >30% red pixels
              else if (density > 0.05) severity = 'Medium';
              
              // Only add significant regions
              if (bw > 10 && bh > 10) {
                foundBoxes.push({
                   id: `${bx}-${by}`,
                   x: bx,
                   y: by,
                   width: bw,
                   height: bh,
                   density,
                   severity,
                   pixelCount: totalPixels
                });
              }
            }
          }
        }

        const newCounts = {
            Major: foundBoxes.filter(b => b.severity === 'Major').length,
            Medium: foundBoxes.filter(b => b.severity === 'Medium').length,
            Low: foundBoxes.filter(b => b.severity === 'Low').length,
        };

        setBoxes(foundBoxes);
        setCounts(newCounts);

      } catch (err: any) {
        console.error("Diff processing error:", err);
        setError(err.message);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, [diffImageUrl]);
  
  return { boxes, counts, isProcessing, error, dimensions };
}
