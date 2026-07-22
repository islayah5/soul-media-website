import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalActive, setModalActive] = useState(false);

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

  // Observer for portfolio modal active attribute on body
  useEffect(() => {
    const checkModalState = () => {
      setModalActive(document.body.hasAttribute('data-portfolio-modal-open'));
    };

    checkModalState();
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-portfolio-modal-open'] });

    return () => observer.disconnect();
  }, []);

  // Hide custom follower ring when portfolio iframe showcase is active to prevent mouse flicker
  if (!isVisible || modalActive) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        className="fixed pointer-events-none z-[999999] transition-transform duration-150 ease-out hidden md:block"
        style={{
          transform: `translate3d(${position.x - (isHovered ? 24 : 16)}px, ${
            position.y - (isHovered ? 24 : 16)
          }px, 0) scale(${isHovered ? 1.5 : 1})`,
        }}
      >
        <div
          className={`rounded-full border border-[#FFB6D9]/50 transition-all duration-300 ${
            isHovered
              ? 'w-12 h-12 bg-[#FFB6D9]/15 backdrop-blur-sm border-[#FFB6D9]'
              : 'w-8 h-8 bg-transparent'
          }`}
        />
      </div>

      {/* Inner Precision Dot */}
      <div
        className="fixed pointer-events-none z-[1000000] transition-transform duration-75 ease-out hidden md:block"
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      >
        <div className="w-1.5 h-1.5 bg-[#FFB6D9] rounded-full shadow-[0_0_8px_#FFB6D9]" />
      </div>
    </>
  );
};
