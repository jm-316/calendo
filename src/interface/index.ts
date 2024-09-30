export interface TodoType {
  id: number;
  content: string;
  completed: boolean;
  date: Date;
  userId: string;
}

export interface CalendarType {
  id: number;
  title: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  color: string;
  content: string;
  userId: string;
}

export type selectOptions = "day" | "Month";
