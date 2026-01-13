
import React from 'react';

interface SettingsViewProps {
  onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const gridItems = [
    { label: 'Activities', icon: '⚡', iconBg: 'bg-blue-400' },
    { label: 'My Self-Care Areas', icon: '🔴', iconBg: 'bg-gray-100', subIcon: '🟡' },
    { label: 'My Goals', icon: '✅', iconBg: 'bg-orange-100' },
    { label: 'Insights', icon: '📊', iconBg: 'bg-red-100' },
    { label: 'Newsletters', icon: '📰', iconBg: 'bg-blue-50', badge: '1' },
    { label: 'History', icon: '📅', iconBg: 'bg-red-50' },
  ];

  const communityItems = [
    { label: 'Did someone invite you?', icon: '🥚' },
    { label: 'Invite friends', icon: '❤️' },
    { label: 'Join our Origo communities', icon: '👥' },
    { label: 'Become a Guardian', icon: '🌈', sub: 'Sponsor Origo Plus for others' },
    { label: 'Shop Origo Merch', icon: '🎁' },
  ];

  const supportItems = [
    { label: 'Help center', icon: '❓', iconBg: 'bg-blue-500' },
    { label: 'About', icon: '📖', iconBg: 'bg-green-500' },
    { label: 'Report issue', icon: '💬', iconBg: 'bg-red-400' },
  ];

  return (
    <div className="min-h-full bg-[#E3EAF1] pb-24 overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center text-gray-500 text-2xl hover:bg-black/5 rounded-full transition-all"
        >
          ‹
        </button>
      </div>

      {/* Grid Section */}
      <div className="px-4 grid grid-cols-2 gap-3 mb-6">
        {gridItems.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm active:scale-95 transition-transform cursor-pointer">
            <div className={`w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center text-lg relative`}>
              {item.icon}
              {item.badge && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full font-bold border-2 border-white">
                  {item.badge}
                </div>
              )}
            </div>
            <span className="text-[11px] font-bold text-gray-600 leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Origo Plus Banner */}
      <div className="px-4 mb-8">
        <div className="bg-[#4D69E3] rounded-[24px] p-5 flex items-center justify-between shadow-lg shadow-[#4D69E3]/20">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-lg tracking-tight">Origo</span>
              <span className="bg-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">PLUS</span>
            </div>
            <p className="text-white/80 text-[10px] font-medium leading-tight">Unlock all exercises and features</p>
          </div>
          <button className="bg-white px-5 py-2.5 rounded-full text-[#4D69E3] text-[11px] font-black shadow-sm active:scale-95 transition-transform">
            Learn more
          </button>
        </div>
      </div>

      {/* Community Section */}
      <div className="px-4 mb-8">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-4">Community</h3>
        <div className="bg-white rounded-[24px] overflow-hidden shadow-sm">
          {communityItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between px-6 py-4 cursor-pointer active:bg-gray-50 transition-colors ${idx !== communityItems.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-xl">{item.icon}</span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gray-600">{item.label}</span>
                  {item.sub && <span className="text-[9px] text-gray-400 font-medium">{item.sub}</span>}
                </div>
              </div>
              <span className="text-gray-300 text-lg">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className="px-4 mb-10">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-4">Support</h3>
        <div className="bg-white rounded-[24px] overflow-hidden shadow-sm">
          {supportItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between px-6 py-4 cursor-pointer active:bg-gray-50 transition-colors ${idx !== supportItems.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 ${item.iconBg} rounded-full flex items-center justify-center text-white text-xs`}>
                  {item.icon}
                </div>
                <span className="text-[11px] font-bold text-gray-600">{item.label}</span>
              </div>
              <span className="text-gray-300 text-lg">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col items-center gap-1 opacity-40 mb-12">
        <span className="text-[10px] font-bold text-gray-500 tracking-tight">Origo v1.0.42 (2025)</span>
      </div>
    </div>
  );
};

export default SettingsView;
