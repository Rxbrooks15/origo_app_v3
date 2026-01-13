
import React, { useState, useEffect, useRef } from 'react';
import { AppTab, OrigamiStats, SunlightData, CurrencyStats, CustomizationSettings } from './types';
import HomeView from './components/HomeView';
import StatsView from './components/StatsView';
import GalleryView from './components/GalleryView';
import ShopView from './components/ShopView';
import ProfileView from './components/ProfileView';
import SettingsView from './components/SettingsView';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [lampOn, setLampOn] = useState(false);
  const [underLamp, setUnderLamp] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const lastHealthRef = useRef(75);

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
    screenTimeGoal: 6,
    flightTime: 45,
    driveTime: 22
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
    furniture: ['bookshelf'],
    designId: 'plain'
  });

  const [origami, setOrigami] = useState<OrigamiStats>({
    name: 'Waffle',
    ageDays: 1,
    friendship: 'Pals',
    weight: 2.0,
    height: 0.5,
    wingspan: 2.0,
    health: 75,
    streak: 1,
    level: 1,
    experience: 0,
    xpToNextLevel: 100
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setOrigami(prev => {
        let healthChange = -(1 / 60); 
        if (lampOn && underLamp) {
          healthChange = +1.0;
        }
        const newHealth = Math.max(0, Math.min(100, prev.health + healthChange));
        let newXp = prev.experience;
        let newLevel = prev.level;
        let newXpToNext = prev.xpToNextLevel;

        if (newHealth >= 100 && lastHealthRef.current < 100) {
          newXp += 50;
          if (newXp >= newXpToNext) {
            newLevel += 1;
            newXp -= newXpToNext;
            newXpToNext = Math.floor(newXpToNext * 1.25);
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 3000);
          }
        }
        lastHealthRef.current = newHealth;
        return {
          ...prev,
          health: newHealth,
          experience: newXp,
          level: newLevel,
          xpToNextLevel: newXpToNext,
          weight: newHealth > 0 ? +(prev.weight + 0.001).toFixed(3) : prev.weight
        };
      });

      setCurrencies(prev => {
        let cyliteChange = (origami.health > 0 ? 1 : 0);
        if (lampOn && underLamp) {
          cyliteChange = -10;
        }
        return {
          ...prev,
          cylite: Math.max(0, prev.cylite + cyliteChange)
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [lampOn, underLamp, origami.health]);

  const openSettings = () => setShowSettings(true);

  const renderContent = () => {
    if (showSettings) {
      return <SettingsView onBack={() => setShowSettings(false)} />;
    }

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
            showLevelUpAnimation={showLevelUp}
            openSettings={openSettings}
          />
        );
      case AppTab.STATS:
        return <StatsView sunData={sunData} setSunData={setSunData} openSettings={openSettings} />;
      case AppTab.GALLERY:
        return <GalleryView openSettings={openSettings} />;
      case AppTab.SHOP:
        return <ShopView customization={customization} setCustomization={setCustomization} currencies={currencies} setCurrencies={setCurrencies} openSettings={openSettings} />;
      case AppTab.PROFILE:
        return <ProfileView origami={origami} customization={customization} openSettings={openSettings} />;
      default:
        return <HomeView 
          lampOn={lampOn} 
          setLampOn={setLampOn} 
          underLamp={underLamp} 
          setUnderLamp={setUnderLamp} 
          activeOrigami={origami}
          currencies={currencies} 
          customization={customization} 
          showLevelUpAnimation={showLevelUp}
          openSettings={openSettings}
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
