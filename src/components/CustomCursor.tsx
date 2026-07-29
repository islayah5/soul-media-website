import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only initialize on desktop/fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Keep custom cursor visible across modals and viewports
  if (!isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring — Glowing Bright Amethyst Pink */}
      <div
        className="fixed pointer-events-none z-[9999999] transition-transform duration-150 ease-out hidden md:block"
        style={{
          transform: `translate3d(${position.x - (isHovered ? 24 : 16)}px, ${
            position.y - (isHovered ? 24 : 16)
          }px, 0) scale(${isHovered ? 1.5 : 1})`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isHovered
              ? 'w-12 h-12 bg-[#FF94C7]/20 backdrop-blur-sm border-[#FF94C7] shadow-[0_0_20px_rgba(255,148,199,0.5)]'
              : 'w-8 h-8 bg-transparent border-[#FF94C7]/80 shadow-[0_0_10px_rgba(255,148,199,0.3)]'
          }`}
        />
      </div>

      {/* Inner Precision Dot — Solid Bright Amethyst Pink */}
      <div
        className="fixed pointer-events-none z-[10000000] transition-transform duration-75 ease-out hidden md:block"
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      >
        <div className="w-2 h-2 bg-[#FF94C7] rounded-full shadow-[0_0_12px_#FF94C7]" />
      </div>
    </>
  );
};
