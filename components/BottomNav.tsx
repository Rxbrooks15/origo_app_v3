
import React from 'react';
import { AppTab } from '../types';
import { COLORS } from '../constants';

interface BottomNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: AppTab.HOME, label: 'Home', icon: '🏠' },
    { id: AppTab.STATS, label: 'Stats', icon: '📊' },
    { id: AppTab.GALLERY, label: 'Gallery', icon: '🌐' },
    { id: AppTab.SHOP, label: 'Shop', icon: '🛍️' },
    { id: AppTab.PROFILE, label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex justify-around items-center z-50 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            activeTab === tab.id ? 'scale-110' : 'opacity-40'
          }`}
        >
          <div 
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 ${
              activeTab === tab.id ? 'bg-[#A8BBA2] text-white shadow-lg shadow-[#A8BBA2]/40' : 'bg-gray-50'
            }`}
          >
            {tab.icon}
          </div>
          <span className={`text-[9px] font-black uppercase tracking-widest ${
            activeTab === tab.id ? 'text-[#3A215D]' : 'text-gray-400'
          }`}>
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
