import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LeaderboardEntry {
  id: string;
  username: string;
  accuracy: number;
  score: number;
  completedTasks: number;
  totalTime: number;
  date: string;
  gameMode: 'task' | 'website';
}

interface LeaderboardState {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  entries: [],
  isLoading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<Omit<LeaderboardEntry, 'id' | 'date'>>) => {
      const newEntry: LeaderboardEntry = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      state.entries.push(newEntry);
      state.entries.sort((a, b) => b.score - a.score);
      state.entries = state.entries.slice(0, 10);
    },
    updateEntry: (state, action: PayloadAction<{ id: string; updates: Partial<LeaderboardEntry> }>) => {
      const { id, updates } = action.payload;
      const index = state.entries.findIndex(entry => entry.id === id);
      if (index !== -1) {
        state.entries[index] = { ...state.entries[index], ...updates };
        state.entries.sort((a, b) => b.score - a.score);
      }
    },
    removeEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
    clearLeaderboard: (state) => {
      state.entries = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addEntry,
  updateEntry,
  removeEntry,
  clearLeaderboard,
  setLoading,
  setError,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
