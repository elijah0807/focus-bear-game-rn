import {
    addEntry,
    clearLeaderboard,
    LeaderboardEntry,
    removeEntry,
    setError,
    setLoading,
    updateEntry,
} from '@/store/slices/leaderboardSlice';

import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Custom hook for leaderboard functionality
export const useLeaderBoard = () => {
    const dispatch = useAppDispatch();
    const leaderboard = useAppSelector((state) => state.leaderboard);
  
    const addLeaderboardEntry = (entry: Omit<LeaderboardEntry, 'id' | 'date'>) => {
      dispatch(addEntry(entry));
    };
  
    const updateLeaderboardEntry = (id: string, updates: Partial<LeaderboardEntry>) => {
      dispatch(updateEntry({ id, updates }));
    };
  
    const removeLeaderboardEntry = (id: string) => {
      dispatch(removeEntry(id));
    };
  
    const clearLeaderboardEntries = () => {
      dispatch(clearLeaderboard());
    };
  
    const setLeaderboardLoading = (loading: boolean) => {
      dispatch(setLoading(loading));
    };
  
    const setLeaderboardError = (error: string | null) => {
      dispatch(setError(error));
    };
  
    return {
      // State
      entries: leaderboard.entries,
      isLoading: leaderboard.isLoading,
      error: leaderboard.error,
      
      // Actions
      addEntry: addLeaderboardEntry,
      updateEntry: updateLeaderboardEntry,
      removeEntry: removeLeaderboardEntry,
      clearLeaderboard: clearLeaderboardEntries,
      setLoading: setLeaderboardLoading,
      setError: setLeaderboardError,
    };
  };
  