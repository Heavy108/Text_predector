import { create } from "zustand";

interface SettingsState {
  notifications: boolean;
  toggleNotifications: () => void;
  romanization: boolean;
  toggleRomanization: () => void;
}

// eslint-disable-next-line prettier/prettier
export const useSettingsStore = create<SettingsState>((set) => ({
  notifications: false,
  toggleNotifications: () =>
    set((state) => ({ notifications: !state.notifications })),
  romanization: false,
  toggleRomanization: () =>
    set((state) => ({ romanization: !state.romanization })),
}));
