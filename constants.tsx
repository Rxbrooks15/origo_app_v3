
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

export const PaperAirplaneSVG = ({ className, mainColor = "#F5F5F5" }: { className?: string, mainColor?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Thick border style matching the reference image */}
    <g stroke="#3A215D" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
      {/* Back flap (grey-blue) */}
      <path d="M45 35L85 25L75 65L45 35Z" fill="#5F8089" />
      {/* Interior small fold (red) */}
      <path d="M60 55L75 65L65 75L60 55Z" fill="#D81B60" />
      {/* Main wing top (dynamic color) */}
      <path d="M20 35L85 25L55 75L20 35Z" fill={mainColor} />
      {/* Bottom fold (light grey) */}
      <path d="M20 35L55 75L45 55L20 35Z" fill="#E0E0E0" />
    </g>
  </svg>
);
