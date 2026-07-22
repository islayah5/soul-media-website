import React, { useEffect, useRef } from 'react';

interface LiquidPaintCanvasProps {
  className?: string;
}

export const LiquidPaintCanvas: React.FC<LiquidPaintCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for fluid repulsion / attraction
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Define 6 liquid paint blotches with pastel color signatures
    const blotches = [
      {
        x: width * 0.2,
        y: height * 0.25,
        baseRadius: Math.min(width, height) * 0.35,
        radius: Math.min(width, height) * 0.35,
        color: 'rgba(255, 182, 217, 0.25)', // Pink
        vx: 0.3,
        vy: 0.2,
        phase: 0,
      },
      {
        x: width * 0.8,
        y: height * 0.3,
        baseRadius: Math.min(width, height) * 0.38,
        radius: Math.min(width, height) * 0.38,
        color: 'rgba(229, 212, 255, 0.25)', // Lavender
        vx: -0.2,
        vy: 0.3,
        phase: Math.PI / 3,
      },
      {
        x: width * 0.5,
        y: height * 0.75,
        baseRadius: Math.min(width, height) * 0.42,
        radius: Math.min(width, height) * 0.42,
        color: 'rgba(255, 212, 194, 0.22)', // Peach
        vx: 0.25,
        vy: -0.25,
        phase: (Math.PI * 2) / 3,
      },
      {
        x: width * 0.25,
        y: height * 0.8,
        baseRadius: Math.min(width, height) * 0.32,
        radius: Math.min(width, height) * 0.32,
        color: 'rgba(194, 255, 229, 0.20)', // Mint
        vx: -0.3,
        vy: -0.2,
        phase: Math.PI,
      },
      {
        x: width * 0.75,
        y: height * 0.75,
        baseRadius: Math.min(width, height) * 0.3,
        radius: Math.min(width, height) * 0.3,
        color: 'rgba(255, 182, 217, 0.18)', // Pink accent
        vx: 0.15,
        vy: -0.3,
        phase: (Math.PI * 4) / 3,
      },
    ];

    let time = 0;

    const render = () => {
      time += 0.008;

      // Ease mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render organic liquid paint blotches
      blotches.forEach((b) => {
        // Drift position
        b.x += b.vx + Math.sin(time + b.phase) * 0.4;
        b.y += b.vy + Math.cos(time * 0.8 + b.phase) * 0.4;

        // Bounce inside screen margins
        if (b.x < -b.baseRadius * 0.2 || b.x > width + b.baseRadius * 0.2) b.vx *= -1;
        if (b.y < -b.baseRadius * 0.2 || b.y > height + b.baseRadius * 0.2) b.vy *= -1;

        // React to mouse proximity
        const dx = mouse.x - b.x;
        const dy = mouse.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 300;

        let mouseOffset = 0;
        if (dist < maxDist) {
          mouseOffset = (1 - dist / maxDist) * 40;
        }

        const currentRadius = b.baseRadius + Math.sin(time * 1.5 + b.phase) * 20 + mouseOffset;

        // Create fluid radial gradient for paint blotch
        const gradient = ctx.createRadialGradient(
          b.x,
          b.y,
          0,
          b.x,
          b.y,
          currentRadius
        );

        gradient.addColorStop(0, b.color);
        gradient.addColorStop(0.5, b.color.replace(/0\.\d+\)/, '0.12)'));
        gradient.addColorStop(1, 'rgba(13, 11, 20, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 filter blur-[70px] ${className}`}
    />
  );
};
