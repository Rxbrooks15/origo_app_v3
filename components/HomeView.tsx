
import React, { useState } from 'react';
import { PaperAirplaneSVG, CrumpledBallSVG, COLORS } from '../constants';
import { CurrencyStats, CustomizationSettings, OrigamiStats } from '../types';

interface HomeViewProps {
  lampOn: boolean;
  setLampOn: (on: boolean) => void;
  underLamp: boolean;
  setUnderLamp: (under: boolean) => void;
  activeOrigami: OrigamiStats;
  currencies: CurrencyStats;
  customization: CustomizationSettings;
  showLevelUpAnimation?: boolean;
}

type RealisticDeskLampProps = {
  lampOn: boolean;
  onToggle: () => void;
  lampColor?: string;
  className?: string;
};

const RealisticDeskLamp: React.FC<RealisticDeskLampProps> = ({
  lampOn,
  onToggle,
  lampColor = "#1f1f1f",
  className = "",
}) => {
  const glow = lampOn
    ? "drop-shadow(0 0 25px rgba(255,245,180,1)) drop-shadow(0 0 80px rgba(255,245,180,0.6))"
    : "none";

  return (
    <div
      className={[
        "absolute bottom-[110px] right-[38px] w-[220px] h-[300px] cursor-pointer select-none z-10",
        "transition-transform duration-300 active:scale-[0.99]",
        className,
      ].join(" ")}
      onClick={onToggle}
      role="button"
    >
      {/* Light Beam - Much more pronounced */}
      {lampOn && (
        <div
          className="absolute left-[-150px] top-[95px] w-[500px] h-[600px] -z-10 opacity-70 blur-[4px] pointer-events-none transition-all duration-500"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background:
              "linear-gradient(to bottom, rgba(255,255,230,0.6), rgba(255,255,210,0.2) 35%, rgba(255,255,200,0.05) 75%, rgba(255,255,200,0))",
          }}
        />
      )}
      
      {/* Surface Glow on Desk */}
      {lampOn && (
        <div 
          className="absolute bottom-[-100px] left-[-300px] w-[600px] h-[300px] bg-yellow-200/20 blur-[80px] -z-20 pointer-events-none"
        />
      )}

      <div className="absolute bottom-3 left-[92px] w-[120px] h-[34px]">
        <div className="absolute inset-x-2 bottom-[-10px] h-[16px] rounded-full bg-black/35 blur-md" />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(120% 140% at 35% 25%, rgba(255,255,255,0.14), rgba(255,255,255,0) 42%),
                         linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.65)),
                         ${lampColor}`,
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "inset 0 2px 6px rgba(255,255,255,0.08), inset 0 -8px 14px rgba(0,0,0,0.55), 0 18px 30px rgba(0,0,0,0.45)",
          }}
        />
        <div className="absolute inset-[3px] rounded-full border border-white/10" />
      </div>
      <div className="absolute bottom-[32px] left-[142px] w-[18px] h-[170px]">
        <div className="absolute left-[7px] top-[10px] w-[10px] h-[160px] rounded-full bg-black/35 blur-[2px]" />
        <div
          className="absolute left-0 top-0 w-[14px] h-[170px] rounded-full origin-bottom"
          style={{
            transform: "rotate(-10deg)",
            background: `repeating-linear-gradient(to bottom, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 5px), linear-gradient(to right, rgba(255,255,255,0.10), rgba(0,0,0,0.45))`,
            boxShadow: "inset 0 2px 6px rgba(255,255,255,0.06), 0 10px 16px rgba(0,0,0,0.30)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        />
      </div>
      <div className="absolute top-[20px] left-[56px] w-[140px] h-[120px]">
        <div
          className="absolute left-[88px] top-[108px] w-[26px] h-[14px] rounded-full"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(0,0,0,0.55))",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 10px 16px rgba(0,0,0,0.35)",
            transform: "rotate(-10deg)",
          }}
        />
        <div
          className="absolute left-[8px] top-[18px] w-[120px] h-[82px] rounded-[42px] origin-bottom-right"
          style={{
            transform: "rotate(-20deg)",
            background: `radial-gradient(140% 160% at 35% 25%, rgba(255,255,255,0.18), rgba(255,255,255,0) 45%), linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.70)), ${lampColor}`,
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "inset 0 10px 18px rgba(255,255,255,0.06), inset 0 -14px 24px rgba(0,0,0,0.55), 0 18px 26px rgba(0,0,0,0.40)",
          }}
        >
          <div
            className="absolute left-[14px] top-[18px] w-[78px] h-[52px] rounded-[999px]"
            style={{
              transform: "rotate(10deg)",
              background: "radial-gradient(90% 120% at 40% 35%, rgba(255,255,255,0.95), rgba(235,235,235,0.85) 45%, rgba(200,200,200,0.70) 75%, rgba(140,140,140,0.35))",
              boxShadow: "inset 0 2px 10px rgba(0,0,0,0.25)",
              border: "1px solid rgba(0,0,0,0.10)",
            }}
          />
          <div
            className="absolute left-[38px] top-[34px] w-[22px] h-[22px] rounded-full"
            style={{
              background: lampOn
                ? "radial-gradient(circle at 35% 35%, rgba(255,255,255,1), rgba(255,244,200,0.95) 45%, rgba(255,210,120,0.35) 75%, rgba(255,210,120,0))"
                : "radial-gradient(circle at 35% 35%, rgba(200,200,200,0.85), rgba(120,120,120,0.55) 55%, rgba(80,80,80,0.2))",
              filter: glow,
            }}
          />
          <div className="absolute inset-[2px] rounded-[40px] border border-white/10" />
        </div>
      </div>
      <div className="absolute top-[46px] left-[110px] w-[8px] h-[8px] rounded-full bg-white/20 blur-[0.5px]" />
    </div>
  );
};

const HomeView: React.FC<HomeViewProps> = ({ 
  lampOn, setLampOn, underLamp, setUnderLamp, 
  activeOrigami, currencies, customization,
  showLevelUpAnimation
}) => {
  const [foldMode, setFoldMode] = useState<'LOCKBIND' | 'MANIFOLD'>('LOCKBIND');

  const themeColors = {
    day: { bg: '#6A4C93', sky: '#B39DDB', desk: '#512DA8', shelf: '#4527A0' },
    night: { bg: '#1A237E', sky: '#0D47A1', desk: '#283593', shelf: '#1A237E' },
    sunset: { bg: '#FF7043', sky: '#FFAB91', desk: '#E64A19', shelf: '#BF360C' },
    cyber: { bg: '#4A148C', sky: '#7B1FA2', desk: '#311B92', shelf: '#12005E' },
  };

  const activeTheme = themeColors[customization.theme] || themeColors.day;

  const toggleFoldMode = () => {
    setFoldMode(prev => prev === 'LOCKBIND' ? 'MANIFOLD' : 'LOCKBIND');
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden transition-colors duration-1000">
      {/* Level Up Overlay */}
      {showLevelUpAnimation && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none">
          <div className="animate-bounce bg-white/90 backdrop-blur-xl px-10 py-6 rounded-[40px] shadow-2xl border-4 border-cyan-400">
            <h2 className="text-4xl font-black text-cyan-500 uppercase tracking-tighter italic">LEVEL UP!</h2>
            <p className="text-center font-black text-[#3A215D] text-lg">LEVEL {activeOrigami.level}</p>
          </div>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-4 h-4 bg-cyan-400 rounded-full animate-ping"
              style={{ 
                top: `${Math.random()*100}%`, 
                left: `${Math.random()*100}%`,
                animationDelay: `${Math.random()*2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 z-0" style={{ backgroundColor: activeTheme.bg }}>
        {/* Wall Light Switch */}
        <div className="absolute top-1/2 right-[-2px] -translate-y-1/2 flex flex-col items-center gap-1 z-20">
          <div 
            onClick={() => setLampOn(!lampOn)}
            className="w-10 h-16 bg-white rounded-lg border-2 border-gray-200 shadow-lg cursor-pointer flex flex-col p-1.5 transition-all active:scale-95"
          >
            <div className={`flex-1 rounded-t-sm transition-all ${lampOn ? 'bg-gray-100' : 'bg-gray-300 shadow-inner'}`} />
            <div className={`flex-1 rounded-b-sm transition-all ${lampOn ? 'bg-gray-300 shadow-inner' : 'bg-gray-100'}`} />
          </div>
          <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Power</span>
        </div>

        {customization.furniture.includes('bookshelf') && (
          <div className="h-24 w-full border-b-4 flex items-end px-4 gap-1 opacity-40 transition-colors" style={{ backgroundColor: activeTheme.shelf, borderColor: activeTheme.shelf }}>
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="w-4 rounded-t-sm" 
                style={{ 
                  backgroundColor: i % 3 === 0 ? '#6B8E6B' : i % 3 === 1 ? '#D6A28C' : '#92A8D1',
                  height: `${40 + Math.random() * 40}px` 
                }}
              />
            ))}
          </div>
        )}

        <div className="mt-8 mx-auto w-4/5 h-[400px] border-8 border-white rounded-3xl relative shadow-xl overflow-hidden flex items-center justify-center transition-colors" style={{ backgroundColor: activeTheme.sky }}>
          {customization.theme === 'night' ? (
             [...Array(10)].map((_, i) => (
                <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }} />
             ))
          ) : (
            <>
              <div className="absolute top-20 left-10 w-24 h-10 bg-white opacity-60 rounded-full blur-md" />
              <div className="absolute top-40 right-10 w-32 h-14 bg-white opacity-60 rounded-full blur-md" />
            </>
          )}
          <div className="absolute inset-0 border-r-4 border-b-4 border-white/40 pointer-events-none" />
        </div>

        {customization.furniture.includes('plant') && (
          <div className="absolute bottom-1/3 left-10 w-16 h-32 z-10">
             <div className="w-12 h-10 bg-[#795548] rounded-b-xl mx-auto" />
             <div className="flex flex-col items-center -space-y-4">
               <div className="w-8 h-8 bg-green-500 rounded-full blur-[2px]" />
               <div className="w-12 h-12 bg-green-600 rounded-full blur-[3px]" />
             </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/3 border-t-8 z-10 p-6 shadow-2xl transition-colors" style={{ backgroundColor: activeTheme.desk, borderColor: activeTheme.shelf }}>
        <div className="relative h-full">
          <RealisticDeskLamp 
            lampOn={lampOn} 
            onToggle={() => setLampOn(!lampOn)} 
            lampColor={customization.lampColor}
          />

          {/* Interactive Active Origami */}
          <div 
            className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer z-20 ${
              underLamp ? 'left-[45%] -translate-x-1/2 bottom-20 scale-110 -rotate-12' : 'left-4 bottom-8 scale-90 rotate-6'
            }`}
            onClick={() => setUnderLamp(!underLamp)}
          >
            <div className="relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-[10px] font-black text-[#3A215D] shadow-md border border-[#3A215D]/10 whitespace-nowrap">
                {activeOrigami.name}: {Math.round(activeOrigami.health)}%
              </div>
              {activeOrigami.health > 0 ? (
                <PaperAirplaneSVG 
                  className="w-40 h-40" 
                  health={activeOrigami.health} 
                  mainColor={customization.origamiColor}
                  designId={customization.designId}
                />
              ) : (
                <CrumpledBallSVG className="w-40 h-40 grayscale opacity-80" />
              )}
              {/* Enhanced shadow when under lamp */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black/20 blur-md rounded-full -z-10 transition-transform duration-700 ${underLamp ? 'scale-[1.8] opacity-100' : 'scale-100 opacity-60'}`} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-40 p-6 pt-12 pointer-events-none">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-2 pointer-events-auto">
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-3 shadow-lg border border-white/50">
              <div className="w-8 h-8 rounded-xl bg-[#3A215D] text-white flex items-center justify-center text-lg font-bold">A</div>
              <h2 className="text-[10px] font-black text-[#3A215D] leading-none uppercase tracking-tighter">Aero Studio</h2>
            </div>
            
            <div className="bg-[#1B2A1B]/60 backdrop-blur-md p-2 rounded-2xl border border-white/20 grid grid-cols-2 gap-x-3 gap-y-1.5 shadow-xl">
               <div className="flex items-center gap-1.5"><span className="text-xs">🌡️</span><span className="text-[10px] font-black text-white">{currencies.celcius}°</span></div>
               <div className="flex items-center gap-1.5"><span className="text-xs">⚡</span><span className="text-[10px] font-black text-white">{currencies.cylite}</span></div>
               <div className="flex items-center gap-1.5"><span className="text-xs">🟣</span><span className="text-[10px] font-black text-white">{currencies.orgs}</span></div>
               <div className="flex items-center gap-1.5"><span className="text-xs text-[#A8BBA2]">✈️</span><span className="text-[10px] font-black text-white">{currencies.gami}</span></div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 pointer-events-auto">
            {/* Level Counter */}
            <div className="flex flex-col items-end">
              <div className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-3xl border-2 border-cyan-400 shadow-xl flex items-center gap-3">
                 <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Aero Rank</span>
                    <span className="text-xl font-black text-[#3A215D] tracking-tighter">LVL {activeOrigami.level}</span>
                 </div>
                 <div className="w-10 h-10 rounded-2xl bg-cyan-400 flex items-center justify-center text-white text-xl font-black">
                   {activeOrigami.level}
                 </div>
              </div>
              {/* XP Progress Bar */}
              <div className="mt-2 w-40 h-2 bg-white/40 rounded-full overflow-hidden border border-white/20">
                 <div 
                  className="h-full bg-cyan-400 transition-all duration-1000" 
                  style={{ width: `${(activeOrigami.experience / activeOrigami.xpToNextLevel) * 100}%` }}
                 />
              </div>
            </div>

            <button 
              onClick={activeOrigami.health > 50 ? toggleFoldMode : undefined}
              className="bg-[#3A215D] px-4 py-2 rounded-full shadow-lg text-xs font-black text-white hover:scale-105 active:scale-95 transition-transform cursor-pointer h-10 flex items-center justify-center"
              disabled={activeOrigami.health <= 50}
            >
               {activeOrigami.health > 50 ? foldMode : activeOrigami.health > 0 ? 'LOW LIFT' : 'CRUMPLED'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
