import React, { useEffect, useRef } from 'react';

interface LiquidPaintCanvasProps {
  className?: string;
}

export const LiquidPaintCanvas: React.FC<LiquidPaintCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    
    // Scale factor for high mobile performance
    const scaleFactor = isMobile ? 0.65 : 1;
    let width = (canvas.width = Math.floor(window.innerWidth * scaleFactor));
    let height = (canvas.height = Math.floor(window.innerHeight * scaleFactor));

    const handleResize = () => {
      if (!canvas) return;
      isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
      const s = isMobile ? 0.65 : 1;
      width = canvas.width = Math.floor(window.innerWidth * s);
      height = canvas.height = Math.floor(window.innerHeight * s);
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for desktop, touch tracking for mobile
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX * scaleFactor;
      mouse.targetY = e.clientY * scaleFactor;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX * scaleFactor;
        mouse.targetY = e.touches[0].clientY * scaleFactor;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Define mobile-optimized liquid paint blotches
    const allBlotches = [
      {
        x: width * 0.2,
        y: height * 0.25,
        baseRadius: Math.min(width, height) * 0.45,
        color: 'rgba(255, 182, 217, 0.18)', // Pink
        vx: 0.25,
        vy: 0.15,
        phase: 0,
      },
      {
        x: width * 0.8,
        y: height * 0.3,
        baseRadius: Math.min(width, height) * 0.48,
        color: 'rgba(229, 212, 255, 0.18)', // Lavender
        vx: -0.15,
        vy: 0.25,
        phase: Math.PI / 3,
      },
      {
        x: width * 0.5,
        y: height * 0.75,
        baseRadius: Math.min(width, height) * 0.5,
        color: 'rgba(255, 212, 194, 0.16)', // Peach
        vx: 0.2,
        vy: -0.2,
        phase: (Math.PI * 2) / 3,
      },
      {
        x: width * 0.25,
        y: height * 0.8,
        baseRadius: Math.min(width, height) * 0.42,
        color: 'rgba(194, 255, 229, 0.14)', // Mint
        vx: -0.2,
        vy: -0.15,
        phase: Math.PI,
      },
    ];

    // Use 3 blotches on mobile, 4 on desktop for maximum performance
    const blotches = isMobile ? allBlotches.slice(0, 3) : allBlotches;

    let time = 0;
    let lastTime = 0;
    const fpsLimit = isMobile ? 40 : 60;
    const interval = 1000 / fpsLimit;

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      time += 0.008;

      // Ease mouse/touch tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Solid base canvas background
      ctx.fillStyle = '#0D0B14';
      ctx.fillRect(0, 0, width, height);

      // Render organic liquid paint blotches with multi-stop soft radial blur
      blotches.forEach((b) => {
        b.x += b.vx + Math.sin(time + b.phase) * 0.3;
        b.y += b.vy + Math.cos(time * 0.8 + b.phase) * 0.3;

        if (b.x < -b.baseRadius * 0.2 || b.x > width + b.baseRadius * 0.2) b.vx *= -1;
        if (b.y < -b.baseRadius * 0.2 || b.y > height + b.baseRadius * 0.2) b.vy *= -1;

        const dx = mouse.x - b.x;
        const dy = mouse.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 250;

        let mouseOffset = 0;
        if (dist < maxDist) {
          mouseOffset = (1 - dist / maxDist) * 30;
        }

        const currentRadius = b.baseRadius + Math.sin(time * 1.5 + b.phase) * 15 + mouseOffset;

        // Built-in multi-stop radial gradient for soft liquid paint glow (No heavy CSS filter required!)
        const gradient = ctx.createRadialGradient(
          b.x,
          b.y,
          0,
          b.x,
          b.y,
          currentRadius
        );

        gradient.addColorStop(0, b.color);
        gradient.addColorStop(0.4, b.color.replace(/0\.\d+\)/, '0.10)'));
        gradient.addColorStop(0.8, b.color.replace(/0\.\d+\)/, '0.03)'));
        gradient.addColorStop(1, 'rgba(13, 11, 20, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    render(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 w-full h-full ${className}`}
    />
  );
};
