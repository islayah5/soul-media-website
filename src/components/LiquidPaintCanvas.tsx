import React, { useEffect, useState } from 'react';

interface LiquidPaintCanvasProps {
  className?: string;
}

export const LiquidPaintCanvas: React.FC<LiquidPaintCanvasProps> = ({ className = '' }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0D0B14] ${className}`}>
      {/* Deep Ambient Base Mesh Gradients (Hardware Accelerated) */}
      <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-[#FF7AB7]/25 via-[#9B72CF]/20 to-transparent blur-[80px] md:blur-[120px] animate-pulse duration-[8000ms] transform-gpu" />

      <div className="absolute top-[30%] -right-[15%] w-[65vw] h-[65vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-bl from-[#9B72CF]/25 via-[#38BDF8]/15 to-transparent blur-[80px] md:blur-[120px] transform-gpu" />

      <div className="absolute -bottom-[10%] left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-[#34D399]/20 via-[#FF7AB7]/15 to-transparent blur-[80px] md:blur-[120px] transform-gpu" />

      {/* Subtle Noise Texture for Premium Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
    </div>
  );
};
