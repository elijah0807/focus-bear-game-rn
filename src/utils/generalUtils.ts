import { AnsweredTask } from '@/store/slices/scoreSlice';
import { LeaderboardEntry } from '../store/slices/leaderboardSlice';


export const calculateAccuracy = (answeredTasks: AnsweredTask[]): number => {
  if (answeredTasks.length === 0) {
    return 0;
  }

  let correctAnswers = 0;
  
  answeredTasks.forEach((answeredTask) => {
    if (answeredTask.selectedBucket === answeredTask.task.correctBucket) {
      correctAnswers++;
    }
  });

  return Math.round((correctAnswers / answeredTasks.length) * 100);
};

export const getAccuracyStats = (answeredTasks: AnsweredTask[]) => {
  const total = answeredTasks.length;
  const correct = answeredTasks.filter(
    (task) => task.selectedBucket === task.task.correctBucket
  ).length;
  const wrong = total - correct;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    total,
    correct,
    wrong,
    accuracy,
  };
};

export const getHighestLeaderboardScore = (entries: LeaderboardEntry[]): number => {
    if (!entries || entries.length === 0) {
      return 0;
    }
    
    return Math.max(...entries.map(entry => entry.score));
  };
  
  export const getTopPlayer = (entries: LeaderboardEntry[]): LeaderboardEntry | null => {
    if (!entries || entries.length === 0) {
      return null;
    }
    
    const highestScore = getHighestLeaderboardScore(entries);
    return entries.find(entry => entry.score === highestScore) || null;
  };
  
  export const hasBeenAnswered = (answeredTasks: AnsweredTask[], taskId: string): boolean => {
    return answeredTasks.some(task => task.task.id === taskId);
  };
  
  export const getAnsweredTask = (answeredTasks: AnsweredTask[], taskId: string): AnsweredTask | null => {
    return answeredTasks.find(task => task.task.id === taskId) || null;
  };
  
  export const isLastAnswerHighestScore = (currentScore: number, leaderboardEntries: LeaderboardEntry[]): boolean => {
    if (!leaderboardEntries || leaderboardEntries.length === 0) {
      return true; // If no entries exist, current score is the highest
    }
    
    const highestScore = getHighestLeaderboardScore(leaderboardEntries);
    return currentScore >= highestScore;
  };