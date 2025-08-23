import React, { useEffect, useRef } from "react";

const AnimatedPixelText: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<any[]>([]);
  const originalPositionsRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {

    

  const canvas = canvasRef.current;
  if (!canvas) return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const isMobile = width <= 768;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);

const pixelSize = isMobile ? 2.5 : 4;
const rows = isMobile ? 80 : 120;
const cols = isMobile ? 220 : 400;



    const textOffsetX = width / 2;
const textOffsetY = isMobile ? height / 2 - 30 : height / 2;


    const textCanvas = document.createElement("canvas");
    textCanvas.width = cols;
    textCanvas.height = rows;
    const textCtx = textCanvas.getContext("2d")!;

const fontSize = isMobile ? 28 : 80;


textCtx.fillStyle = "black";
textCtx.font = `${fontSize}px Arial, sans-serif`;
textCtx.textAlign = "center";
textCtx.textBaseline = "middle";
textCtx.fillText("want in?", cols / 2, rows / 2 + 5);

    const imageData = textCtx.getImageData(0, 0, cols, rows).data;
    const spreadFactor = 0.05;

    const particles: any[] = [];
    const originalPositions: any[] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const index = (y * cols + x) * 4;
        if (imageData[index + 3] > 128) {
          const offsetX = (Math.random() - 0.5) * width * spreadFactor;
          const offsetY = (Math.random() - 0.5) * height * spreadFactor;

          const finalX =
            x * pixelSize +
            textOffsetX -
            (cols * pixelSize) / 2 +
            offsetX;

          const finalY =
            y * pixelSize +
            textOffsetY -
            (rows * pixelSize) / 2 +
            offsetY;

          particles.push({
            x: finalX,
            y: finalY,
            ox: finalX,
            oy: finalY,
            vx: 0,
            vy: 0
          });
          originalPositions.push({ x: finalX, y: finalY });
        }
      }
    }

    particlesRef.current = particles;
    originalPositionsRef.current = originalPositions;

    // === Events (Mouse + Touch) ===
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);

    // === Animation Loop ===
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const hoverRadius = isMobile ? 50 : 20;
      const pushForce = 100;
      const spreadMultiplier = 1; 
      const pixelSize = isMobile ? 3.5 : 4;  
      const returnSpeed = 0.016;
      const jumpStep = isMobile ? 4 : 10;
      const snapThreshold = 2;

      particles.forEach((p) => {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < hoverRadius) {
          const force = ((1 - dist / hoverRadius) * pushForce) * spreadMultiplier;
          const norm = dist > 0 ? 1 / dist : 0;

          p.x += Math.round(dx * norm * force);
          p.y += Math.round(dy * norm * force);

          p.x += Math.round((p.ox - p.x) * returnSpeed / jumpStep) * jumpStep;
          p.y += Math.round((p.oy - p.y) * returnSpeed / jumpStep) * jumpStep;

        } else {
          p.x += (p.ox - p.x) * returnSpeed * 2;
          p.y += (p.oy - p.y) * returnSpeed * 2;
        }

        if (Math.abs(p.x - p.ox) < snapThreshold) p.x = p.ox;
        if (Math.abs(p.y - p.oy) < snapThreshold) p.y = p.oy;

        ctx.fillStyle = "black";
        ctx.fillRect(Math.round(p.x), Math.round(p.y), pixelSize, pixelSize);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return <canvas ref={canvasRef} className="background-animation" />;
};

export default AnimatedPixelText;
