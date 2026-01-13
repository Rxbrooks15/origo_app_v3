
import React from 'react';

export const COLORS = {
  primary: '#A8BBA2',
  primaryDark: '#8a9c84',
  primaryLight: '#cce0c8',
  accent: '#E6A88E',
  bg: '#f9fbf9',
  text: '#3A4238',
  textLight: '#7A8576',
  airplaneYellow: '#FFC107',
  airplaneShadow: '#E65100'
};

export const PaperAirplaneSVG = ({ className, mainColor = "#F5F5F5", health = 100 }: { className?: string, mainColor?: string, health?: number }) => {
  // Visual degradation based on health
  const integrity = health / 100;
  const saturation = 50 + (50 * integrity); // Dulls out as health drops
  const brightness = 80 + (20 * integrity);
  
  // Calculate distortion for "crumpled" look
  // As health drops below 50, we add jittery transforms to paths
  const jitter = health < 50 ? (50 - health) / 10 : 0;
  
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="crumpleFilter">
          <feTurbulence type="fractalNoise" baseFrequency={health < 50 ? 0.8 : 0} numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={jitter * 2} />
        </filter>
      </defs>
      <g stroke="#3A215D" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" filter="url(#crumpleFilter)" style={{ filter: `grayscale(${100 - health}%)` }}>
        {/* Back flap */}
        <path d="M45 35L85 25L75 65L45 35Z" fill="#5F8089" style={{ opacity: 0.3 + (integrity * 0.7) }} />
        {/* Interior small fold */}
        <path d="M60 55L75 65L65 75L60 55Z" fill="#D81B60" style={{ opacity: 0.5 + (integrity * 0.5) }} />
        {/* Main wing top */}
        <path d="M20 35L85 25L55 75L20 35Z" fill={mainColor} />
        {/* Bottom fold */}
        <path d="M20 35L55 75L45 55L20 35Z" fill="#E0E0E0" />
      </g>
    </svg>
  );
};

export const CrumpledBallSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#E0E0E0" stroke="#3A215D" strokeWidth="4" />
    <path d="M30 40C30 40 40 30 50 40C60 50 70 40 70 40" stroke="#3A215D" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 70C40 70 50 60 60 70" stroke="#3A215D" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 55C20 55 35 50 40 60" stroke="#3A215D" strokeWidth="2" strokeLinecap="round" />
    <path d="M60 30C60 30 75 35 80 50" stroke="#3A215D" strokeWidth="2" strokeLinecap="round" />
    <path d="M25 65L35 75M75 65L65 75M50 20L50 35" stroke="#3A215D" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
