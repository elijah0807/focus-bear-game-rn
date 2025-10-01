export interface GenerateTasksRequest {
  goal: string;
  mode: 'task' | 'website';
}

export interface Task {
  id: string;
  text: string;
  correctBucket: string;
}

export interface GenerateTasksResponse {
  tasks: Task[];
  message?: string;
  error?: string;
}
