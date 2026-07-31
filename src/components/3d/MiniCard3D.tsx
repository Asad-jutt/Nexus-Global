import React from 'react';
import { GeometryType } from '../../types';

interface MiniCard3DProps {
  shape: GeometryType;
  colorHex: string;
  isHovered: boolean;
}

export const MiniCard3D: React.FC<MiniCard3DProps> = ({ shape, colorHex, isHovered }) => {
  return (
    <div className="w-14 h-14 relative flex items-center justify-center p-2 rounded-xl bg-slate-900/80 border border-white/10 overflow-hidden group-hover:border-cyan-400/40 transition-all duration-300">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 opacity-20 blur-md transition-opacity duration-300"
        style={{ backgroundColor: colorHex }}
      />

      <svg
        viewBox="0 0 64 64"
        className={`w-full h-full relative z-10 transition-transform duration-500 ease-out ${
          isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {shape === 'prism' ? (
          // Isometric 3D Pyramid / Prism
          <g>
            {/* Top apex to base faces */}
            <path
              d="M32 8 L12 44 L32 54 Z"
              fill={colorHex}
              fillOpacity={isHovered ? '0.45' : '0.25'}
              stroke={colorHex}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M32 8 L52 44 L32 54 Z"
              fill={colorHex}
              fillOpacity={isHovered ? '0.25' : '0.15'}
              stroke={colorHex}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Internal Wireframe Lines */}
            <path d="M32 8 L32 54" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M12 44 L52 44" stroke={colorHex} strokeWidth="1.5" strokeLinejoin="round" />
          </g>
        ) : (
          // Isometric 3D Cube / Matrix Box
          <g>
            {/* Top Face */}
            <path
              d="M32 10 L52 20 L32 30 L12 20 Z"
              fill={colorHex}
              fillOpacity={isHovered ? '0.5' : '0.3'}
              stroke={colorHex}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Left Face */}
            <path
              d="M12 20 L32 30 L32 52 L12 42 Z"
              fill={colorHex}
              fillOpacity={isHovered ? '0.3' : '0.18'}
              stroke={colorHex}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Right Face */}
            <path
              d="M32 30 L52 20 L52 42 L32 52 Z"
              fill={colorHex}
              fillOpacity={isHovered ? '0.2' : '0.1'}
              stroke={colorHex}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Inner Glowing Core */}
            <circle cx="32" cy="31" r="3" fill="#ffffff" fillOpacity="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
};
