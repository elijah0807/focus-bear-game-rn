import { taskApi } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, clearTasks, setError, setLoading, setTasks } from '@/store/slices/tasksSlice';
import { GenerateTasksRequest, Task } from '@/types/api';
import { router } from 'expo-router';

interface UseTaskGenerationReturn {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  generateTasks: (payload: GenerateTasksRequest) => Promise<void>;
  clearTasks: () => void;
  clearError: () => void;
}

export const useTaskGeneration = (): UseTaskGenerationReturn => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading, error } = useAppSelector((state) => state.tasks);

  const generateTasks = async (payload: GenerateTasksRequest) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const response = await taskApi.generateTasks(payload);
      
      if (response.tasks.length > 0) {
        dispatch(setTasks(response.tasks));
        router.push("/tasks"); //navigate to tasks screen
      } else {
        dispatch(setError('Failed to generate tasks'));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      dispatch(setError(errorMessage));
      console.error('Task generation error:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearTasksHandler = () => {
    dispatch(clearTasks());
  };

  const clearErrorHandler = () => {
    dispatch(clearError());
  };

  return {
    tasks,
    isLoading,
    error,
    generateTasks,
    clearTasks: clearTasksHandler,
    clearError: clearErrorHandler,
  };
};
