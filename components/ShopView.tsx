
import React, { useState } from 'react';
import { CustomizationSettings, CurrencyStats } from '../types';

interface ShopViewProps {
  customization: CustomizationSettings;
  setCustomization: React.Dispatch<React.SetStateAction<CustomizationSettings>>;
  currencies: CurrencyStats;
  setCurrencies: React.Dispatch<React.SetStateAction<CurrencyStats>>;
  openSettings: () => void;
}

const ShopView: React.FC<ShopViewProps> = ({ customization, setCustomization, currencies, setCurrencies, openSettings }) => {
  const [activeCategory, setActiveCategory] = useState<'Colors' | 'Designs' | 'Furniture' | 'Themes'>('Colors');

  const shopItems = {
    Colors: [
      { id: 'c1', name: 'Ghost White', type: 'origami', val: '#F5F5F5', price: 0 },
      { id: 'c2', name: 'Azure Blue', type: 'origami', val: '#BBDEFB', price: 200 },
      { id: 'c3', name: 'Soft Pink', type: 'origami', val: '#F8BBD0', price: 200 },
      { id: 'c4', name: 'Obsidian', type: 'origami', val: '#212121', price: 500 },
      { id: 'l1', name: 'Matte Black', type: 'lamp', val: '#333333', price: 0 },
      { id: 'l2', name: 'Ruby Red', type: 'lamp', val: '#B71C1C', price: 300 },
      { id: 'l3', name: 'Emerald', type: 'lamp', val: '#1B5E20', price: 300 },
    ],
    Designs: [
      { id: 'plain', name: 'Clean Sheet', icon: '📄', price: 0, rarity: 'Common' },
      { id: 'zebra', name: 'Zebra Wild', icon: '🦓', price: 800, rarity: 'Rare' },
      { id: 'tiger', name: 'Tiger Soul', icon: '🐯', price: 1200, rarity: 'Rare' },
      { id: 'crocodile', name: 'Croc Scale', icon: '🐊', price: 2500, rarity: 'Legendary' },
    ],
    Furniture: [
      { id: 'bookshelf', name: 'Classic Shelf', icon: '📚', price: 0 },
      { id: 'plant', name: 'Aloe Plant', icon: '🪴', price: 400 },
      { id: 'trophy', name: 'Aero Cup', icon: '🏆', price: 1000 },
    ],
    Themes: [
      { id: 'day', name: 'Bright Day', icon: '☀️', price: 0 },
      { id: 'night', name: 'Deep Night', icon: '🌙', price: 600 },
      { id: 'sunset', name: 'Golden Hour', icon: '🌇', price: 800 },
      { id: 'cyber', name: 'Neon City', icon: '👾', price: 1500 },
    ]
  };

  const handlePurchase = (item: any) => {
    const alreadyOwns = (activeCategory === 'Themes' && customization.theme === item.id) ||
                        (activeCategory === 'Designs' && customization.designId === item.id) ||
                        (activeCategory === 'Furniture' && customization.furniture.includes(item.id));

    if (alreadyOwns) {
    } else if (currencies.cylite < item.price) {
      alert("Not enough Cylite!");
      return;
    } else {
      setCurrencies(prev => ({ ...prev, cylite: prev.cylite - item.price }));
    }

    if (activeCategory === 'Colors') {
      if (item.type === 'origami') {
        setCustomization(prev => ({ ...prev, origamiColor: item.val }));
      } else {
        setCustomization(prev => ({ ...prev, lampColor: item.val }));
      }
    } else if (activeCategory === 'Designs') {
        setCustomization(prev => ({ ...prev, designId: item.id }));
    } else if (activeCategory === 'Themes') {
      setCustomization(prev => ({ ...prev, theme: item.id }));
    } else if (activeCategory === 'Furniture') {
      setCustomization(prev => {
        if (prev.furniture.includes(item.id)) return prev;
        return { ...prev, furniture: [...prev.furniture, item.id] };
      });
    }
  };

  return (
    <div className="min-h-full bg-[#f9fbf9] p-6 pb-32">
      <div className="flex items-center gap-4 mb-8 pt-6">
        <button 
          onClick={openSettings}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-gray-50 active:scale-90 transition-transform"
        >
          ☰
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-black text-[#3A215D] tracking-tighter">Aero Shop</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Upgrade your hangar</p>
        </div>
        <div className="bg-[#1B2A1B] text-white px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg">
           <span className="text-yellow-400">⚡</span>
           <span className="font-black text-sm">{currencies.cylite}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {['Colors', 'Designs', 'Furniture', 'Themes'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
              activeCategory === cat ? 'bg-[#3A215D] text-white shadow-xl' : 'bg-white text-gray-400 border border-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {shopItems[activeCategory].map((item: any) => {
          const isSelected = activeCategory === 'Themes' ? customization.theme === item.id : 
                            activeCategory === 'Designs' ? customization.designId === item.id :
                            activeCategory === 'Colors' ? (item.type === 'origami' ? customization.origamiColor === item.val : customization.lampColor === item.val) :
                            customization.furniture.includes(item.id);

          return (
            <div 
              key={item.id} 
              onClick={() => handlePurchase(item)}
              className={`bg-white p-4 rounded-[32px] border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-between text-center min-h-[160px] ${
                isSelected ? 'border-[#3A215D] shadow-inner' : 'border-gray-50 shadow-sm hover:border-gray-200'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#3A215D] text-white rounded-full flex items-center justify-center text-[10px]">
                   ✓
                </div>
              )}

              {item.rarity && (
                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[7px] font-black text-white ${
                    item.rarity === 'Legendary' ? 'bg-orange-500' : 'bg-gray-400'
                }`}>
                    {item.rarity}
                </div>
              )}

              <div className="flex-1 flex items-center justify-center">
                {activeCategory === 'Colors' ? (
                  <div className="w-16 h-16 rounded-2xl shadow-inner border border-gray-100" style={{ backgroundColor: item.val }} />
                ) : (
                  <span className="text-5xl">{item.icon}</span>
                )}
              </div>

              <div className="mt-3">
                <p className="text-[10px] font-black text-[#3A215D] uppercase">{item.name}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-[10px] font-bold text-gray-400">{item.price === 0 ? 'FREE' : item.price}</span>
                  {item.price > 0 && <span className="text-[10px]">⚡</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-[#FFD54F] p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
         <div className="relative z-10">
            <h3 className="text-xl font-black text-[#E65100]">Seasonal Drop</h3>
            <p className="text-[10px] font-bold text-[#E65100]/60 uppercase tracking-widest mt-1">Coming next moon phase</p>
            <button className="mt-4 bg-white px-6 py-2 rounded-full text-[10px] font-black text-[#E65100] uppercase tracking-widest shadow-md">
              Notify Me
            </button>
         </div>
         <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FFA000] rounded-full opacity-20 group-hover:scale-110 transition-transform" />
      </div>
    </div>
  );
};

export default ShopView;
