export interface Goal {
  id: number;
  title: string;
  description: string;
  category: string;
  deadline: string;
  progress: number;
  priority: boolean;
}

export interface Habit {
  id: number;
  name: string;
  completedDays: boolean[]; // Array of 7 booleans for the week
}