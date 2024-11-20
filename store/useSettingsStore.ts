import { create } from "zustand";

interface SettingsState {
  notifications: boolean;
  toggleNotifications: () => void;
}

// eslint-disable-next-line prettier/prettier
export const useSettingsStore = create<SettingsState>((set) => ({
  notifications: false,
  toggleNotifications: () =>
    set((state) => ({ notifications: !state.notifications })),
}));
