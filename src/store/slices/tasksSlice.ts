import { Task } from '@/types/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearTasks: (state) => {
      state.tasks = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setTasks,
  setLoading,
  setError,
  clearTasks,
  clearError,
} = tasksSlice.actions;

export default tasksSlice.reducer;
