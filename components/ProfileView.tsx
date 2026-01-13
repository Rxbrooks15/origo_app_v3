
import React, { useState } from 'react';
import { OrigamiStats, CustomizationSettings } from '../types';
import { COLORS, PaperAirplaneSVG, CrumpledBallSVG } from '../constants';

interface ProfileViewProps {
  origami: OrigamiStats;
  customization: CustomizationSettings;
}

const RadarChart = ({ data }: { data: { label: string; value: number }[] }) => {
  const size = 220;
  const center = size / 2;
  const radius = size * 0.35;
  const angleStep = (Math.PI * 2) / data.length;

  const backgroundLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gridLines = backgroundLevels.map((level) => {
    const points = data.map((_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = center + radius * level * Math.cos(angle);
      const y = center + radius * level * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
    return <polygon key={level} points={points} fill="none" stroke="#E5E7EB" strokeWidth="1" />;
  });

  const axes = data.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#E5E7EB" strokeWidth="1" />;
  });

  const dataPoints = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const val = (Math.max(10, d.value) / 100) * radius;
    const x = center + val * Math.cos(angle);
    const y = center + val * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const labels = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const labelRadius = radius + 30;
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);
    return (
      <text
        key={i}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[10px] font-bold fill-gray-500 uppercase tracking-tighter"
      >
        {d.label}
      </text>
    );
  });

  return (
    <div className="flex justify-center items-center w-full py-2">
      <svg width="100%" height="auto" viewBox={`0 0 ${size} ${size}`} className="max-w-[280px]">
        {gridLines}
        {axes}
        <polygon points={dataPoints} fill="#3A215D33" stroke="#3A215D" strokeWidth="2" strokeLinejoin="round" />
        {data.map((d, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const val = (Math.max(10, d.value) / 100) * radius;
          const x = center + val * Math.cos(angle);
          const y = center + val * Math.sin(angle);
          return <circle key={i} cx={x} cy={y} r="3" fill="#3A215D" />;
        })}
        {labels}
      </svg>
    </div>
  );
};

const ProfileView: React.FC<ProfileViewProps> = ({ origami, customization }) => {
  const [activeSubTab, setActiveSubTab] = useState<'about' | 'personality'>('about');

  const personalityData = [
    { label: 'Aerodynamics', value: origami.health },
    { label: 'Precision', value: 85 },
    { label: 'Glide Rate', value: 70 },
    { label: 'Social', value: origami.friendship === 'Besties' ? 95 : 60 },
    { label: 'Lift', value: Math.min(100, (origami.streak || 1) * 20) },
  ];

  return (
    <div className="min-h-full bg-[#FFECB3] p-6 pb-20">
      <div className="flex justify-between items-center mb-6">
        <button className="w-12 h-12 bg-white/60 rounded-xl flex items-center justify-center text-2xl shadow-sm">☰</button>
        <div className="px-4 py-2 bg-[#3A215D] text-white rounded-xl font-black text-[10px] uppercase tracking-widest">
          {origami.name}
        </div>
      </div>

      <div className="bg-white rounded-[40px] p-8 shadow-2xl relative overflow-hidden mb-6 min-h-[440px] flex flex-col border border-white/50">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
           <svg width="100%" height="100%" viewBox="0 0 100 100">
             <defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5"/></pattern></defs>
             <rect width="100" height="100" fill="url(#grid)" />
           </svg>
        </div>

        <div className="flex gap-8 items-center mb-8">
          <div className="w-24 h-24 bg-[#FFC107]/10 rounded-3xl flex items-center justify-center p-2 border border-[#FFC107]/20 shadow-inner">
             {origami.health > 0 ? (
               <PaperAirplaneSVG 
                className="w-full h-full -rotate-12" 
                health={origami.health} 
                mainColor={customization.origamiColor}
                designId={customization.designId}
               />
             ) : (
               <CrumpledBallSVG className="w-full h-full grayscale" />
             )}
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#3A215D] mb-1">{origami.name}</h1>
            <p className="text-[#E65100] font-black text-[10px] uppercase tracking-widest">
              {origami.health > 0 ? `Mk. 2.5 ${customization.designId.toUpperCase()}` : 'Crumpled Sheet'}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {activeSubTab === 'about' ? (
            <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-4">
              <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">Service Life</span>
                  <span className="text-xl font-black text-[#3A215D]">{origami.ageDays} days</span>
              </div>
              <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">Affiliation</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-[#3A215D]">{origami.friendship}</span>
                    <span className="text-[#D81B60]">✦</span>
                  </div>
              </div>
              <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">Status</span>
                  <span className={`text-xl font-black ${origami.health > 20 ? 'text-[#3A215D]' : 'text-red-500'}`}>
                    {Math.round(origami.health)}% Integrity
                  </span>
              </div>
              <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">Flight ID</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                      {[...Array(6)].map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${origami.health > 0 ? 'bg-gray-200' : 'bg-red-200 animate-pulse'}`} />)}
                    </div>
                  </div>
              </div>
            </div>
          ) : (
            <div className="mb-4 flex flex-col items-center">
              <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#3A215D] mb-4">Telemetry Profile</h4>
              <RadarChart data={personalityData} />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-6">
           <div className="flex flex-col items-center">
              <span className="text-[8px] font-black uppercase text-gray-300 mb-1">Mass</span>
              <span className="text-sm font-black text-[#3A215D]">{origami.weight.toFixed(1)}g</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-[8px] font-black uppercase text-gray-300 mb-1">Chord</span>
              <span className="text-sm font-black text-[#3A215D]">{origami.height}cm</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-[8px] font-black uppercase text-gray-300 mb-1">Span</span>
              <span className="text-sm font-black text-[#3A215D]">{origami.wingspan}cm</span>
           </div>
        </div>
      </div>

      <div className="bg-[#3A215D]/5 p-1.5 rounded-2xl flex mb-6 border border-[#3A215D]/10">
        <button 
          onClick={() => setActiveSubTab('about')}
          className={`flex-1 py-3 rounded-xl font-black text-[10px] tracking-widest transition-all duration-300 ${
            activeSubTab === 'about' ? 'bg-white text-[#3A215D] shadow-md' : 'text-gray-400'
          }`}
        >
          DOSSIER
        </button>
        <button 
          onClick={() => setActiveSubTab('personality')}
          className={`flex-1 py-3 rounded-xl font-black text-[10px] tracking-widest transition-all duration-300 ${
            activeSubTab === 'personality' ? 'bg-white text-[#3A215D] shadow-md' : 'text-gray-400'
          }`}
        >
          TELEMETRY
        </button>
      </div>

      {origami.health === 0 && (
        <div className="bg-red-500 rounded-3xl p-6 flex flex-col items-center justify-center mb-8 shadow-xl text-white text-center">
           <h4 className="text-lg font-black uppercase mb-1">Unit Terminated</h4>
           <p className="text-[10px] opacity-80 uppercase tracking-widest">Folded beyond recovery. Sync to reset.</p>
        </div>
      )}

      <div className="bg-[#3A215D] rounded-3xl p-6 flex items-center justify-between mb-8 shadow-xl">
         <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-[#FFD54F] rounded-2xl flex items-center justify-center text-3xl shadow-[0_4px_0_#E65100]">🔥</div>
           <div>
             <h4 className="text-xl font-black text-white leading-tight">{origami.streak} DAY LOG</h4>
             <p className="text-[8px] text-white/40 font-black uppercase tracking-widest mt-1">Operational streak record</p>
           </div>
         </div>
      </div>
    </div>
  );
};

export default ProfileView;
