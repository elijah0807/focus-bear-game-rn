import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  selectedSound: string;
  selectedGameMode: string;
  volume: number;
}

const initialState: SettingsState = {
  selectedSound: 'sine',
  selectedGameMode: 'task',
  volume: 0.2,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSelectedSound: (state, action: PayloadAction<string>) => {
      state.selectedSound = action.payload;
    },
    setSelectedGameMode: (state, action: PayloadAction<string>) => {
      state.selectedGameMode = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    resetSettings: (state) => {
      state.selectedSound = initialState.selectedSound;
      state.selectedGameMode = initialState.selectedGameMode;
      state.volume = initialState.volume;
    },
  },
});

export const {
  setSelectedSound,
  setSelectedGameMode,
  setVolume,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
