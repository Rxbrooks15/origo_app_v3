
import React, { useState } from 'react';
import { SunlightData } from '../types';
import { COLORS } from '../constants';

interface StatsViewProps {
  sunData: SunlightData;
}

const StatsView: React.FC<StatsViewProps> = ({ sunData }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate a connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  return (
    <div className="min-h-full bg-[#f9fbf9] text-[#3A4238] p-8 pb-32">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 pt-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-12 h-12 rounded-2xl bg-[#A8BBA2] text-white flex items-center justify-center font-black text-xl shadow-[0_4px_15px_rgba(168,187,162,0.4)]">
               RB
             </div>
             <div>
               <h1 className="text-2xl font-black leading-tight tracking-tight text-[#3A215D]">System Status</h1>
               <p className="text-xs font-bold text-[#A8BBA2] uppercase tracking-widest">Aero-Sync Active</p>
             </div>
          </div>
        </div>
      </div>

      {/* Primary Health Hub */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Sunlight Exposure - Featured Card */}
        <div className="col-span-2 bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex gap-5 items-center">
            <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">☀️</div>
            <div>
              <div className="text-[10px] font-black text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full inline-block mb-1">SUNLIGHT</div>
              <h3 className="text-2xl font-black text-[#3A215D]">{sunData.totalDailyMinutes}m</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Goal: {sunData.dailyGoal}m</p>
            </div>
          </div>
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-gray-100"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={175.9}
                strokeDashoffset={175.9 - (Math.min(100, (sunData.totalDailyMinutes / sunData.dailyGoal) * 100) / 100) * 175.9}
                className="text-yellow-400 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-yellow-600">
              {Math.round((sunData.totalDailyMinutes / sunData.dailyGoal) * 100)}%
            </div>
          </div>
        </div>

        {/* Steps Card */}
        <div className="bg-white rounded-[32px] p-5 border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-[#A8BBA2]/20 rounded-2xl flex items-center justify-center text-xl">👟</div>
            <div className="text-[10px] font-black text-[#A8BBA2] bg-[#A8BBA2]/10 px-2 py-0.5 rounded-full">STEPS</div>
          </div>
          <div className="mb-2">
            <span className="text-2xl font-black text-[#3A215D]">{sunData.steps.toLocaleString()}</span>
            <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-tighter">Goal: {sunData.stepGoal.toLocaleString()}</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-auto">
            <div 
              className="h-full bg-[#A8BBA2] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, (sunData.steps / sunData.stepGoal) * 100)}%` }}
            />
          </div>
        </div>

        {/* Sleep Card */}
        <div className="bg-white rounded-[32px] p-5 border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-[#9575CD]/20 rounded-2xl flex items-center justify-center text-xl">🌙</div>
            <div className="text-[10px] font-black text-[#9575CD] bg-[#9575CD]/10 px-2 py-0.5 rounded-full">REST</div>
          </div>
          <div className="mb-2">
            <span className="text-2xl font-black text-[#3A215D]">{sunData.sleepHours}h</span>
            <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-tighter">Goal: {sunData.sleepGoal}h</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-auto">
            <div 
              className="h-full bg-[#9575CD] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, (sunData.sleepHours / sunData.sleepGoal) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Smart Watch Connection Section */}
      <div className="mb-10">
        <div className={`bg-white rounded-[32px] p-6 border transition-all duration-500 shadow-sm ${isConnected ? 'border-[#A8BBA2]/50' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 ${isConnected ? 'bg-[#A8BBA2] shadow-[0_0_20px_rgba(168,187,162,0.3)] text-white' : 'bg-gray-50'}`}>
                {isConnected ? '⌚' : '🔌'}
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight text-[#3A215D]">
                  {isConnected ? 'Watch Synced' : 'Wearable Sync'}
                </h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  {isConnecting ? 'Linking Device...' : isConnected ? 'Apple Watch Series 9' : 'Connect Smart Watch'}
                </p>
              </div>
            </div>
            {!isConnected && !isConnecting && (
              <button 
                onClick={handleConnect}
                className="bg-[#A8BBA2] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#A8BBA2]/20"
              >
                Connect
              </button>
            )}
            {isConnecting && (
              <div className="w-6 h-6 border-2 border-[#A8BBA2] border-t-transparent rounded-full animate-spin" />
            )}
            {isConnected && (
              <div className="flex items-center gap-2 bg-[#A8BBA2]/10 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A8BBA2] animate-pulse" />
                <span className="text-[10px] font-black text-[#A8BBA2]">LIVE</span>
              </div>
            )}
          </div>
          
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            {isConnected 
              ? 'Real-time UV and LUX sensors are now providing precision data for your Aero-Fold health.' 
              : 'Link your Apple Watch or Android Wear to track exact lux exposure even when your phone is in your pocket.'}
          </p>
        </div>
      </div>

      {/* Exposure Breakdown */}
      <div className="space-y-4 mb-12">
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Daily Exposure Breakdown</h4>
        {[
          { label: 'Morning Exposure', min: sunData.morningMinutes, icon: '🌅', color: '#FFD54F' },
          { label: 'Vitamin D Peak', min: sunData.vitaminDMinutes, icon: '⚡', color: '#FF7043' },
          { label: 'Evening Drift', min: sunData.eveningMinutes, icon: '🌇', color: '#9575CD' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 flex items-center justify-between border border-gray-50 shadow-sm hover:border-gray-200 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
               <div className="text-2xl w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl group-hover:scale-110 transition-transform">
                 {stat.icon}
               </div>
               <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-xl font-black text-[#3A215D]">{stat.min} <span className="text-xs font-bold text-gray-400">min</span></p>
               </div>
            </div>
            <div className="w-1.5 h-12 rounded-full bg-gray-100">
               <div 
                 className="w-full rounded-full transition-all duration-1000" 
                 style={{ height: `${(stat.min / 20) * 100}%`, backgroundColor: stat.color }}
               />
            </div>
          </div>
        ))}
      </div>

      {/* Solar Telemetry Arc */}
      <div className="relative mt-20 h-40 flex flex-col items-center justify-end">
        <div className="absolute top-0 w-full h-full border-t-2 border-dashed border-gray-200 rounded-[100%] pointer-events-none" />
        
        <div className="relative z-10 w-full text-center">
           <div className="flex flex-col items-center mb-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-3 border border-gray-100 shadow-lg">
                 <span className="text-[#A8BBA2] text-2xl">🌍</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Environment</p>
              <p className="text-xl font-black text-[#3A215D] mt-1">Hangar Conditions: Optimal</p>
           </div>
           
           <div className="grid grid-cols-2 gap-20 w-full px-4">
              <div className="text-left">
                 <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter mb-1">Sunrise</p>
                 <p className="text-lg font-black text-[#3A215D]">07:32 <span className="text-[10px] text-gray-400">AM</span></p>
              </div>
              <div className="text-right">
                 <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter mb-1">Sunset</p>
                 <p className="text-lg font-black text-[#3A215D]">05:41 <span className="text-[10px] text-gray-400">PM</span></p>
              </div>
           </div>
        </div>
      </div>

      {/* Action CTA */}
      <button className="w-full bg-[#A8BBA2] py-5 rounded-[24px] mt-16 text-white font-black text-lg flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(168,187,162,0.3)] hover:scale-[1.02] active:scale-95 transition-all">
        Sync Daily Log <span className="text-2xl">→</span>
      </button>
    </div>
  );
};

export default StatsView;
