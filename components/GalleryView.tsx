
import React, { useState } from 'react';
import { SharedModel } from '../types';
import { PaperAirplaneSVG, COLORS } from '../constants';

const GalleryView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'community' | 'mine'>('community');
  
  const mockModels: SharedModel[] = [
    { id: '1', name: 'Z-14 Prototype', rarity: 'Rare', glide: 88, speed: 45, lift: 92, creator: 'Alex_V', mainColor: '#A8BBA2' },
    { id: '2', name: 'Classic Dart', rarity: 'Common', glide: 40, speed: 85, lift: 30, creator: 'User_99', mainColor: '#FFCDD2' },
    { id: '3', name: 'Celestial Glider', rarity: 'Legendary', glide: 99, speed: 20, lift: 98, creator: 'Aero_King', mainColor: '#CE93D8' },
    { id: '4', name: 'Crimson Fury', rarity: 'Limited', glide: 65, speed: 95, lift: 50, creator: 'Burner', mainColor: '#EF5350' },
    { id: '5', name: 'Azure Voyager', rarity: 'Rare', glide: 72, speed: 60, lift: 75, creator: 'Sky_High', mainColor: '#81D4FA' },
    { id: '6', name: 'Neon Spectre', rarity: 'Legendary', glide: 90, speed: 90, lift: 85, creator: 'CyberFold', mainColor: '#C6FF00' },
  ];

  return (
    <div className="min-h-full bg-[#f9fbf9] p-6 pb-32">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-6">
        <div>
          <h1 className="text-3xl font-black text-[#3A215D] tracking-tighter">Aero Shared</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Global Hangar Feed</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-xl border border-gray-100">
           🌍
        </div>
      </div>

      {/* Tab Selector */}
      <div className="bg-gray-100 p-1.5 rounded-[24px] flex mb-8 border border-white">
        <button 
          onClick={() => setActiveSubTab('community')}
          className={`flex-1 py-4 rounded-[20px] font-black text-[10px] tracking-[0.15em] transition-all duration-500 uppercase ${
            activeSubTab === 'community' ? 'bg-white text-[#3A215D] shadow-xl' : 'text-gray-400'
          }`}
        >
          Community
        </button>
        <button 
          onClick={() => setActiveSubTab('mine')}
          className={`flex-1 py-4 rounded-[20px] font-black text-[10px] tracking-[0.15em] transition-all duration-500 uppercase ${
            activeSubTab === 'mine' ? 'bg-white text-[#3A215D] shadow-xl' : 'text-gray-400'
          }`}
        >
          My Shares
        </button>
      </div>

      {/* Grid of shared models */}
      <div className="grid grid-cols-1 gap-6">
        {(activeSubTab === 'community' ? mockModels : []).map((model) => (
          <div 
            key={model.id} 
            className="bg-white rounded-[40px] p-6 shadow-xl border border-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 active:scale-95"
          >
            {/* Rarity Tag */}
            <div className={`absolute top-6 right-6 px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-lg ${
              model.rarity === 'Legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
              model.rarity === 'Rare' ? 'bg-[#5F8089]' :
              model.rarity === 'Limited' ? 'bg-[#D81B60]' : 'bg-gray-400'
            }`}>
              {model.rarity}
            </div>

            <div className="flex gap-6 items-center">
              {/* Model Art with custom colors */}
              <div className="w-32 h-32 bg-gray-50 rounded-[32px] flex items-center justify-center p-4 border border-gray-100 shadow-inner group-hover:rotate-3 transition-transform">
                <PaperAirplaneSVG mainColor={model.mainColor} className="w-full h-full drop-shadow-2xl" />
              </div>

              {/* Model Details */}
              <div className="flex-1">
                <h3 className="text-xl font-black text-[#3A215D] mb-1">{model.name}</h3>
                <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase">Shared by: <span className="text-[#A8BBA2]">{model.creator}</span></p>
                
                {/* Stats */}
                <div className="space-y-2">
                   {[
                     { label: 'GLD', val: model.glide, color: model.mainColor },
                     { label: 'SPD', val: model.speed, color: '#3A215D' },
                     { label: 'LFT', val: model.lift, color: '#A8BBA2' }
                   ].map((stat, i) => (
                     <div key={i} className="flex items-center gap-2">
                        <span className="text-[8px] font-black text-gray-400 w-6">{stat.label}</span>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                           <div 
                             className="h-full rounded-full transition-all duration-1000 delay-300" 
                             style={{ width: `${stat.val}%`, backgroundColor: stat.color }}
                           />
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Interactions */}
            <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-pink-500 group/heart">
                    <span className="text-lg transition-transform group-hover/heart:scale-125">❤️</span>
                    <span className="text-[10px] font-black">2.4k</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-blue-400">
                    <span className="text-lg">💬</span>
                    <span className="text-[10px] font-black">124</span>
                  </button>
               </div>
               
               <button className="bg-[#3A215D] text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#3A215D]/20 hover:scale-105 active:scale-95 transition-all">
                 View Details
               </button>
            </div>
          </div>
        ))}
        
        {activeSubTab === 'mine' && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-4 border-2 border-dashed border-gray-200">
               ✨
             </div>
             <h3 className="text-xl font-black text-[#3A215D]">No shares yet</h3>
             <p className="text-xs text-gray-400 font-bold max-w-[200px] mt-2">Publish your best origami folds to the global hangar feed.</p>
             <button className="mt-8 bg-[#A8BBA2] text-white px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl">
               Share Current Model
             </button>
          </div>
        )}
      </div>

      {/* Global Stats Banner */}
      <div className="mt-10 bg-[#3A215D] rounded-[40px] p-8 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <h4 className="text-sm font-black uppercase tracking-widest mb-4">Hangar Network</h4>
        <div className="grid grid-cols-2 gap-6">
           <div>
             <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Active Flyers</p>
             <p className="text-2xl font-black">12,482</p>
           </div>
           <div>
             <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Total Lifts</p>
             <p className="text-2xl font-black">1.2M</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
