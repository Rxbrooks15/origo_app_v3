
export enum AppTab {
  HOME = 'home',
  STATS = 'stats',
  GALLERY = 'gallery',
  SHOP = 'shop',
  PROFILE = 'profile'
}

export interface OrigamiStats {
  name: string;
  ageDays: number;
  friendship: string;
  weight: number;
  height: number;
  wingspan: number;
  health: number; // 0-100
  streak: number;
}

export interface SunlightData {
  morningMinutes: number;
  vitaminDMinutes: number;
  eveningMinutes: number;
  dailyGoal: number; // in minutes
  totalDailyMinutes: number;
  steps: number;
  stepGoal: number;
  sleepHours: number;
  sleepGoal: number;
}

export interface CurrencyStats {
  celcius: number;
  cylite: number;
  orgs: number;
  gami: number;
}

export interface SharedModel {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Limited';
  glide: number;
  speed: number;
  lift: number;
  creator: string;
  mainColor: string;
}

export interface CustomizationSettings {
  origamiColor: string;
  lampColor: string;
  theme: 'day' | 'night' | 'sunset' | 'cyber';
  furniture: string[];
}
