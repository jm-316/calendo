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

export interface NewCalendarType extends Omit<CalendarType, "id" | "userId"> {}

export type selectOptions = "day" | "Month";

export interface ColorsType {
  value: string;
  label: string;
  colorCode: string;
}

export interface CountType {
  id: number;
  finishMonth: string;
  count: number;
  userId: string;
}
