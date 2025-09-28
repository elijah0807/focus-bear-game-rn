import { Task } from '@/types/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ScoreEntry {
  id: string;
  score: number;
  task: Task;
  selectedBucket: string;
}

export interface AnsweredTask {
  task: Task;
  selectedBucket: string;
}

export interface ScoreState {
  totalScore: number;
  answeredTasks: AnsweredTask[];
}

const initialState: ScoreState = {
  totalScore: 0,
  answeredTasks: [],
};

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<Omit<ScoreEntry, 'id'>>) => { 
      const newAnsweredTask: AnsweredTask = {
        task: action.payload.task,
        selectedBucket: action.payload.selectedBucket,
      };
      state.totalScore += action.payload.score;
      state.answeredTasks.push(newAnsweredTask);
    },
    
    
    resetAllScores: (state) => {
      state.totalScore = 0;
      state.answeredTasks = [];
    },
    
   
  },
});

export const {
  addScore,
  resetAllScores,
} = scoreSlice.actions;

export default scoreSlice.reducer;
