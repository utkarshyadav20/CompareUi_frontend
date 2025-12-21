/**
 * Represents a detected issue in the difference image.
 */
export interface DetectedIssue {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  severity: "Major" | "Medium" | "Low";
  density: number; // Ratio of red pixels to total pixels in the bounding box
  title: string;
}

/**
 * Analyzes a difference image to detect red regions and classify them.
 * 
 * @param imageUrl URL of the difference image to analyze
 * @param sensitivity sensitivity threshold for red detection (default: standard red)
 * @returns Promise resolving to a list of detected issues
 */
export const analyzeDifferenceImage = (imageUrl: string): Promise<DetectedIssue[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      // Create off-screen canvas (limit max dimension for performance if needed, keeping simple for now)
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Resize logic could go here if images are huge (e.g., maintain aspect ratio, max 1000px)
      // For pixel-perfect mapping to original coords, sticking to original size is safest initially.
      const w = img.width;
      const h = img.height;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);

      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;

      // 1. Thresholding: Make a binary map of "Diff Pixels"
      // Using a Uint8Array where 1 = Diff, 0 = No Diff
      const diffMap = new Uint8Array(w * h);
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // "Red" detection logic for diff images (usually pure red or neon red)
        // Adjust these thresholds based on the exact diff tool output
        // Common diff red: High Red, Low Green/Blue
        if (a > 50 && r > 150 && g < 100 && b < 100) {
            diffMap[i / 4] = 1;
        }
      }

      // 2. Clustering (Connected Components Labeling - Simplified Flood Fill)
      // To perform this efficiently in JS without recursion stack overflow:
      // We can use a disjoint-set union (DSU) or a simple two-pass algorithm.
      // Or for simplicity given typical web limits, an iterative flood fill queue.
      
      const visited = new Uint8Array(w * h); // 0 = unvisited, 1 = visited
      const clusters: { xMin: number; xMax: number; yMin: number; yMax: number; count: number }[] = [];

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = y * w + x;
          if (diffMap[idx] === 1 && visited[idx] === 0) {
            // Found a new cluster, start flood fill
            let xMin = x, xMax = x, yMin = y, yMax = y;
            let count = 0;
            
            const queue = [idx];
            visited[idx] = 1;

            while (queue.length > 0) {
              const currIdx = queue.pop()!;
              const cx = currIdx % w;
              const cy = Math.floor(currIdx / w);

              count++;
              if (cx < xMin) xMin = cx;
              if (cx > xMax) xMax = cx;
              if (cy < yMin) yMin = cy;
              if (cy > yMax) yMax = cy;

              // Check 4 neighbors
              const neighbors = [
                currIdx - 1, // left
                currIdx + 1, // right
                currIdx - w, // up
                currIdx + w  // down
              ];

              for (const nIdx of neighbors) {
                // Bounds check
                if (nIdx >= 0 && nIdx < w * h) {
                    // X-wrapping checks for left/right
                    const nx = nIdx % w;
                    // If we moved left but wrapped to right side (diff of almost w), ignore
                    if (Math.abs(nx - cx) > 1) continue; 

                    if (diffMap[nIdx] === 1 && visited[nIdx] === 0) {
                        visited[nIdx] = 1;
                        queue.push(nIdx);
                    }
                }
              }
            }

            // Filter noise: very small clusters (e.g., < 4 pixels)
            if (count > 4) {
              clusters.push({ xMin, xMax, yMin, yMax, count });
            }
          }
        }
      }

      // 3. Metrics & Classification
      const detectedIssues: DetectedIssue[] = clusters.map((c, index) => {
        const width = c.xMax - c.xMin + 1;
        const height = c.yMax - c.yMin + 1;
        const area = width * height;
        const density = c.count / area;

        // Classification Rules
        let severity: "Major" | "Medium" | "Low";
        let title: string;

        if (density > 0.5) {
            severity = "Major";
            title = "Significant visual discrepancy";
        } else if (density > 0.2) {
            severity = "Medium";
            title = "Moderate layout/color mismatch";
        } else {
            severity = "Low";
            title = "Minor pixel variation";
        }

        // Add padding to box for better visual
        return {
            id: `auto-${index}`,
            x: c.xMin,
            y: c.yMin,
            width,
            height,
            severity,
            density,
            title
        };
      });

      resolve(detectedIssues);
    };

    img.onerror = (err) => {
      reject(new Error(`Failed to load image for analysis: ${err}`));
    };
  });
};
