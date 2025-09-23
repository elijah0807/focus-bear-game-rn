import { store } from '@/store';
import { addEntry } from '@/store/slices/leaderboardSlice';

export interface TaskResult {
  username: string;
  accuracy: number;
  score: number;
  completedTasks: number;
  totalTime: number; // in seconds
  gameMode: 'task' | 'website';
}

export const addLeaderboardEntry = (result: TaskResult) => {
  store.dispatch(addEntry(result));
};

// Example usage function for testing
export const addSampleEntry = () => {
  const sampleResult: TaskResult = {
    username: "Test User",
    accuracy: 0.85,
    score: 450,
    completedTasks: 5,
    totalTime: 300, // 5 minutes
    gameMode: 'task'
  };
  
  addLeaderboardEntry(sampleResult);
};
