import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import leaderboardReducer from './slices/leaderboardSlice';
import loadingReducer from './slices/loadingSlice';
import scoreReducer from './slices/scoreSlice';
import settingsReducer from './slices/settingsSlice';
import tasksReducer from './slices/tasksSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['leaderboard', 'settings'],
};

const rootReducer = combineReducers({
  leaderboard: leaderboardReducer,
  loading: loadingReducer,
  score: scoreReducer,
  settings: settingsReducer,
  tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
