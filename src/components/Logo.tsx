import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', width = 180, height = 78 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 600 260"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Soul Media Official Logo"
    >
      <defs>
        {/* Vibrant Purple Gradient (Official Dark Theme) */}
        <linearGradient id="mainGradientPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7AB7" stopOpacity={1} />
          <stop offset="100%" stopColor="#9B72CF" stopOpacity={1} />
        </linearGradient>

        {/* Specular Shine Filter */}
        <filter id="glassShinePurple" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="45" lightingColor="#ffffff" result="shine">
            <fePointLight x={-5000} y={-10000} z={20000} />
          </feSpecularLighting>
          <feComposite in="shine" in2="SourceAlpha" operator="in" result="shine" />
          <feComposite in="SourceGraphic" in2="shine" operator="over" />
        </filter>

        <filter id="softGlowPurple">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main Logo Group */}
      <g fill="url(#mainGradientPurple)" filter="url(#softGlowPurple)">
        {/* Word: Soul */}
        <g transform="translate(125, 115)">
          <text x="0" y="0" fontSize="105" fontWeight="700" fontFamily="Comfortaa, 'Century Gothic', 'Outfit', sans-serif">S</text>
          
          {/* The 'o' Play Button */}
          <g transform="translate(59, -55)" filter="url(#glassShinePurple)">
            <circle cx="30" cy="28" r="28" fill="url(#mainGradientPurple)" />
            <path d="M25 18 L40 28 L25 38 Z" fill="#FFFFFF" />
          </g>

          <text x="120" y="0" fontSize="105" fontWeight="700" fontFamily="Comfortaa, 'Century Gothic', 'Outfit', sans-serif">u</text>
          <text x="187" y="0" fontSize="105" fontWeight="700" fontFamily="Comfortaa, 'Century Gothic', 'Outfit', sans-serif">l</text>
        </g>

        {/* Word: Media */}
        <g transform="translate(125, 215)">
          <text x="0" y="0" fontSize="60" fontWeight="600" fontFamily="Comfortaa, 'Century Gothic', 'Outfit', sans-serif">M</text>
          <text x="50" y="0" fontSize="60" fontWeight="600" fontFamily="Comfortaa, 'Century Gothic', 'Outfit', sans-serif">e</text>
          <text x="90" y="0" fontSize="60" fontWeight="600" fontFamily="Comfortaa, 'Century Gothic', 'Outfit', sans-serif">d</text>
          
          {/* 'i' with Centered Camera Dot */}
          <g transform="translate(141, -45)">
            <rect x="0" y="8" width="12" height="37" rx="6" />
            <g transform="translate(-11, -32) scale(0.85)" filter="url(#glassShinePurple)">
              <rect x="0" y="6" width="40" height="28" rx="8" fill="url(#mainGradientPurple)" />
              <circle cx="20" cy="20" r="8" fill="#FFFFFF" />
              <circle cx="20" cy="20" r="4" fill="url(#mainGradientPurple)" />
              <rect x="25" y="0" width="10" height="6" rx="2" fill="url(#mainGradientPurple)" />
            </g>
          </g>
          
          <text x="169" y="0" fontSize="60" fontWeight="600" fontFamily="Comfortaa, 'Century Gothic', 'Outfit', sans-serif">a</text>
        </g>
      </g>
    </svg>
  );
};
