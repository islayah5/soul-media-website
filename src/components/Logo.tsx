import React from 'react';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', width = 200, height = 80 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 600 260"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <defs>
        <linearGradient id="soulLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEBEF" />
          <stop offset="50%" stopColor="#FFB6D9" />
          <stop offset="100%" stopColor="#E5D4FF" />
        </linearGradient>

        <filter id="soulGlassShine" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur" />
          <feSpecularLighting
            in="blur"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="45"
            lightingColor="#ffffff"
            result="shine"
          >
            <fePointLight x="-5000" y="-10000" z="20000" />
          </feSpecularLighting>
          <feComposite in="shine" in2="SourceAlpha" operator="in" result="shine" />
          <feComposite in="SourceGraphic" in2="shine" operator="over" />
        </filter>

        <filter id="soulSoftGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g fill="url(#soulLogoGradient)" filter="url(#soulSoftGlow)">
        {/* Word: Soul */}
        <g transform="translate(125, 115)">
          <text
            x="0"
            y="0"
            fontSize="105"
            fontWeight="700"
            style={{ fontFamily: "'Outfit', 'Comfortaa', sans-serif" }}
          >
            S
          </text>

          {/* The 'o' Play Button */}
          <g transform="translate(80, -55)" filter="url(#soulGlassShine)">
            <circle cx="30" cy="28" r="28" fill="url(#soulLogoGradient)" />
            <path d="M23 18 L38 28 L23 38 Z" fill="#0D0B14" />
            <path
              d="M10 18 Q28 6 46 18"
              fill="none"
              stroke="#0D0B14"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>

          <text
            x="145"
            y="0"
            fontSize="105"
            fontWeight="700"
            style={{ fontFamily: "'Outfit', 'Comfortaa', sans-serif" }}
          >
            u
          </text>
          <text
            x="212"
            y="0"
            fontSize="105"
            fontWeight="700"
            style={{ fontFamily: "'Outfit', 'Comfortaa', sans-serif" }}
          >
            l
          </text>
        </g>

        {/* Word: Media */}
        <g transform="translate(125, 215)" opacity="0.95">
          <text
            x="0"
            y="0"
            fontSize="60"
            fontWeight="600"
            style={{ fontFamily: "'Outfit', 'Comfortaa', sans-serif" }}
          >
            M
          </text>
          <text
            x="47"
            y="0"
            fontSize="60"
            fontWeight="600"
            style={{ fontFamily: "'Outfit', 'Comfortaa', sans-serif" }}
          >
            e
          </text>
          <text
            x="86"
            y="0"
            fontSize="60"
            fontWeight="600"
            style={{ fontFamily: "'Outfit', 'Comfortaa', sans-serif" }}
          >
            d
          </text>

          {/* 'i' with Centered Camera Dot */}
          <g transform="translate(155, -45)">
            <rect x="5" y="8" width="12" height="37" rx="6" />
            <g transform="translate(-6, -32) scale(0.85)" filter="url(#soulGlassShine)">
              <rect x="0" y="6" width="40" height="28" rx="8" fill="url(#soulLogoGradient)" />
              <circle cx="20" cy="20" r="8" fill="#0D0B14" />
              <circle cx="20" cy="20" r="4" fill="url(#soulLogoGradient)" />
              <rect x="25" y="0" width="10" height="6" rx="2" fill="url(#soulLogoGradient)" />
            </g>
          </g>

          <text
            x="188"
            y="0"
            fontSize="60"
            fontWeight="600"
            style={{ fontFamily: "'Outfit', 'Comfortaa', sans-serif" }}
          >
            a
          </text>
        </g>
      </g>
    </svg>
  );
};
