import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

const initialState: LoadingState = {
  isLoading: false,
  loadingMessage: undefined,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ isLoading: boolean; message?: string }>) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message;
    },
    showLoading: (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = true;
      state.loadingMessage = action.payload;
    },
    hideLoading: (state) => {
      state.isLoading = false;
      state.loadingMessage = undefined;
    },
  },
});

export const { setLoading, showLoading, hideLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
