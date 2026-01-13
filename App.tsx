
import React, { useState, useEffect } from 'react';
import { AppTab, OrigamiStats, SunlightData, CurrencyStats, CustomizationSettings } from './types';
import HomeView from './components/HomeView';
import StatsView from './components/StatsView';
import GalleryView from './components/GalleryView';
import ShopView from './components/ShopView';
import ProfileView from './components/ProfileView';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [lampOn, setLampOn] = useState(false);
  const [underLamp, setUnderLamp] = useState(false);
  
  const [sunData, setSunData] = useState<SunlightData>({
    morningMinutes: 12,
    vitaminDMinutes: 5,
    eveningMinutes: 0,
    dailyGoal: 30,
    totalDailyMinutes: 17,
    steps: 6420,
    stepGoal: 10000,
    sleepHours: 7.5,
    sleepGoal: 8,
    screenTime: 4.2,
    screenTimeGoal: 6
  });

  const [currencies, setCurrencies] = useState<CurrencyStats>({
    celcius: 24,
    cylite: 1240,
    orgs: 450,
    gami: 85.5
  });

  const [customization, setCustomization] = useState<CustomizationSettings>({
    origamiColor: '#F5F5F5',
    lampColor: '#333333',
    theme: 'day',
    furniture: ['bookshelf']
  });

  const [origami, setOrigami] = useState<OrigamiStats>({
    name: 'Waffle',
    ageDays: 1,
    friendship: 'Pals',
    weight: 2.0,
    height: 0.5,
    wingspan: 2.0,
    health: 75,
    streak: 1
  });

  // GAME LOOP: Processes per-second updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrigami(prev => {
        // Decrease health by 1% every second
        let healthChange = -1.0;

        // Sunlight/Lamp nurture logic
        if (lampOn && underLamp) {
          // If under lamp, increase health by 2 (net +1)
          healthChange = +1.0;
        }

        const newHealth = Math.max(0, Math.min(100, prev.health + healthChange));
        
        return {
          ...prev,
          health: newHealth,
          // If health is 0, weight stops increasing as it's just a ball
          weight: newHealth > 0 ? +(prev.weight + 0.001).toFixed(3) : prev.weight
        };
      });

      // Handle passive currency generation only if paper is alive
      setCurrencies(prev => ({
        ...prev,
        cylite: prev.cylite + (origami.health > 0 ? 1 : 0)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [lampOn, underLamp, origami.health]);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.HOME:
        return (
          <HomeView 
            lampOn={lampOn} 
            setLampOn={setLampOn} 
            underLamp={underLamp} 
            setUnderLamp={setUnderLamp}
            activeOrigami={origami}
            currencies={currencies}
            customization={customization}
          />
        );
      case AppTab.STATS:
        return <StatsView sunData={sunData} setSunData={setSunData} />;
      case AppTab.GALLERY:
        return <GalleryView />;
      case AppTab.SHOP:
        return <ShopView customization={customization} setCustomization={setCustomization} currencies={currencies} setCurrencies={setCurrencies} />;
      case AppTab.PROFILE:
        return <ProfileView origami={origami} />;
      default:
        return <HomeView 
          lampOn={lampOn} 
          setLampOn={setLampOn} 
          underLamp={underLamp} 
          setUnderLamp={setUnderLamp} 
          activeOrigami={origami}
          currencies={currencies} 
          customization={customization} 
        />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#f9fbf9] text-[#3A4238] overflow-hidden select-none">
      <main className="flex-1 overflow-y-auto pb-24 relative bg-[#f9fbf9]">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
