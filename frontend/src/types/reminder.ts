export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Reminder {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  category?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
