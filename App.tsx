
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
    sleepGoal: 8
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

  // Simple growth logic when under light
  useEffect(() => {
    let interval: any;
    if (lampOn && underLamp) {
      interval = setInterval(() => {
        setOrigami(prev => ({
          ...prev,
          health: Math.min(100, prev.health + 0.1),
          weight: +(prev.weight + 0.001).toFixed(3)
        }));
        setCurrencies(prev => ({
          ...prev,
          cylite: prev.cylite + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lampOn, underLamp]);

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
        return <StatsView sunData={sunData} />;
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
    <div className="flex flex-col h-screen w-full bg-[#f9fbf9] text-[#3A4238] overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-24 relative">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
