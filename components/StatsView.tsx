
import React, { useState } from 'react';
import { SunlightData } from '../types';

interface StatsViewProps {
  sunData: SunlightData;
  setSunData: React.Dispatch<React.SetStateAction<SunlightData>>;
  openSettings: () => void;
}

const StatsView: React.FC<StatsViewProps> = ({ sunData, setSunData, openSettings }) => {
  const [connectionType, setConnectionType] = useState<'none' | 'apple' | 'google'>('none');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleConnect = (type: 'apple' | 'google') => {
    setIsSyncing(true);
    setTimeout(() => {
      setConnectionType(type);
      setIsSyncing(false);
      setSunData(prev => ({
        ...prev,
        steps: prev.steps + 1200,
        screenTime: prev.screenTime + 0.8,
        flightTime: prev.flightTime + 15,
        driveTime: prev.driveTime + 10
      }));
    }, 1500);
  };

  return (
    <div className="min-h-full bg-[#f9fbf9] text-[#3A4238] p-6 pb-32">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <button 
          onClick={openSettings}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-gray-50 active:scale-90 transition-transform"
        >
          ☰
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-black text-[#3A215D] tracking-tighter uppercase">Biometrics</h1>
          <p className="text-[10px] font-black text-[#A8BBA2] uppercase tracking-[0.2em] mt-1">Hangar Telemetry v2.5</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-xl border border-gray-100">
           📈
        </div>
      </div>

      <div className="mb-8">
        <div className={`bg-white rounded-[40px] p-6 shadow-xl border-2 transition-all duration-500 ${
          connectionType !== 'none' ? 'border-[#A8BBA2]' : 'border-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-xs text-[#3A215D] uppercase tracking-widest">External Sync</h3>
            {connectionType !== 'none' && (
              <div className="flex items-center gap-1.5 bg-[#A8BBA2]/10 px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A8BBA2] animate-pulse" />
                <span className="text-[8px] font-black text-[#A8BBA2]">CONNECTED</span>
              </div>
            )}
          </div>

          {connectionType === 'none' ? (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 mb-4 leading-relaxed">
                Connect your mobile OS health suite to automate Sunlight, Step, and Screen Time logging.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleConnect('apple')}
                  disabled={isSyncing}
                  className="bg-black text-white p-4 rounded-2xl flex flex-col items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/20"
                >
                  <span className="text-xl">🍎</span>
                  <span className="text-[9px] font-black uppercase tracking-tighter">Apple Health</span>
                </button>
                <button 
                  onClick={() => handleConnect('google')}
                  disabled={isSyncing}
                  className="bg-white border-2 border-gray-100 p-4 rounded-2xl flex flex-col items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  <span className="text-xl">🤖</span>
                  <span className="text-[9px] font-black uppercase tracking-tighter text-gray-600">Google Fit</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#A8BBA2] rounded-3xl flex items-center justify-center text-3xl shadow-lg shadow-[#A8BBA2]/30 text-white">
                {connectionType === 'apple' ? '🍎' : '🤖'}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Active Integration</p>
                <h4 className="text-lg font-black text-[#3A215D]">
                  {connectionType === 'apple' ? 'iOS Health Kit' : 'Google Fit API'}
                </h4>
                <div className="flex gap-4 mt-2">
                   <span className="text-[8px] font-black text-[#A8BBA2]">Steps: Syncing</span>
                   <span className="text-[8px] font-black text-[#A8BBA2]">Screen: Syncing</span>
                </div>
              </div>
              <button 
                onClick={() => setConnectionType('none')}
                className="text-gray-300 text-xs hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
          )}
          
          {isSyncing && (
            <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-[#A8BBA2] animate-[loading_2s_infinite]" style={{ width: '40%' }} />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="col-span-2 bg-white rounded-[40px] p-6 shadow-xl border border-white flex items-center justify-between group">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-yellow-50 rounded-3xl flex items-center justify-center text-4xl shadow-inner group-hover:rotate-6 transition-transform">☀️</div>
            <div>
               <p className="text-[9px] font-black text-yellow-600 uppercase tracking-widest mb-1">Exposure</p>
               <h3 className="text-3xl font-black text-[#3A215D]">{sunData.totalDailyMinutes}m</h3>
               <p className="text-[9px] font-bold text-gray-300">Goal: {sunData.dailyGoal}m</p>
            </div>
          </div>
          <div className="relative w-16 h-16">
             <svg className="w-full h-full -rotate-90">
               <circle cx="32" cy="32" r="28" fill="none" stroke="#f3f4f6" strokeWidth="6" />
               <circle 
                 cx="32" cy="32" r="28" fill="none" stroke="#fbbf24" strokeWidth="6" 
                 strokeDasharray={175.9} 
                 strokeDashoffset={175.9 - (Math.min(100, (sunData.totalDailyMinutes / sunData.dailyGoal) * 100) / 100) * 175.9}
                 strokeLinecap="round"
                 className="transition-all duration-1000"
               />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-yellow-600">
               {Math.round((sunData.totalDailyMinutes/sunData.dailyGoal)*100)}%
             </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-6 shadow-xl border border-white flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-4">👟</div>
          <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Steps</p>
          <h4 className="text-xl font-black text-[#3A215D]">{sunData.steps.toLocaleString()}</h4>
          <div className="w-full h-1 bg-gray-100 rounded-full mt-4 overflow-hidden">
             <div className="h-full bg-blue-400" style={{ width: `${(sunData.steps/sunData.stepGoal)*100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-6 shadow-xl border border-white flex flex-col items-center">
          <div className="w-12 h-12 bg-[#A8BBA2]/20 rounded-2xl flex items-center justify-center text-2xl mb-4">📱</div>
          <p className="text-[9px] font-black text-[#A8BBA2] uppercase tracking-widest mb-1">Screen Time</p>
          <h4 className="text-xl font-black text-[#3A215D]">{sunData.screenTime}h</h4>
          <div className="w-full h-1 bg-gray-100 rounded-full mt-4 overflow-hidden">
             <div className="h-full bg-[#A8BBA2]" style={{ width: `${(sunData.screenTime/sunData.screenTimeGoal)*100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-6 shadow-xl border border-white flex flex-col items-center">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl mb-4">✈️</div>
          <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">Flight Time</p>
          <h4 className="text-xl font-black text-[#3A215D]">{sunData.flightTime}m</h4>
          <div className="w-full h-1 bg-gray-100 rounded-full mt-4 overflow-hidden">
             <div className="h-full bg-purple-400" style={{ width: `${Math.min(100, (sunData.flightTime/60)*100)}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-6 shadow-xl border border-white flex flex-col items-center">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl mb-4">🚗</div>
          <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest mb-1">Drive Time</p>
          <h4 className="text-xl font-black text-[#3A215D]">{sunData.driveTime}m</h4>
          <div className="w-full h-1 bg-gray-100 rounded-full mt-4 overflow-hidden">
             <div className="h-full bg-orange-400" style={{ width: `${Math.min(100, (sunData.driveTime/60)*100)}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
         <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Session Breakdown</h4>
         {[
           { label: 'Morning Light', val: '12m', icon: '🌅', color: '#fbbf24' },
           { label: 'Screen Usage', val: `${sunData.screenTime}h`, icon: '📉', color: '#A8BBA2' },
           { label: 'Step Activity', val: `${(sunData.steps / 1000).toFixed(1)}k`, icon: '⚡', color: '#60a5fa' },
           { label: 'Flight Logs', val: `${sunData.flightTime}m`, icon: '☁️', color: '#a855f7' },
           { label: 'Drive Logs', val: `${sunData.driveTime}m`, icon: '🛣️', color: '#fb923c' }
         ].map((item, i) => (
           <div key={i} className="bg-white p-4 rounded-3xl flex justify-between items-center shadow-sm border border-gray-50 hover:scale-[1.02] transition-transform">
             <div className="flex items-center gap-4">
               <span className="text-xl">{item.icon}</span>
               <span className="text-[10px] font-black text-[#3A215D] uppercase tracking-widest">{item.label}</span>
             </div>
             <div className="flex items-center gap-3">
                <span className="text-sm font-black text-[#3A215D]">{item.val}</span>
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: item.color }} />
             </div>
           </div>
         ))}
      </div>

      <button className="w-full mt-10 bg-[#3A215D] text-white py-5 rounded-[32px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-2px] active:translate-y-[2px] transition-all">
        Force Cloud Sync
      </button>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default StatsView;
