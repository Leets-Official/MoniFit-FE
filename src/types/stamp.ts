export interface StampItem {
  date: string;
  dayNumber: number;
  stamped: boolean;
  today: boolean;
  lastDay: boolean;
}

export interface Period {
  id: number;
  startDate: string;
  endDate: string;
}

export interface Navigation {
  hasPrevious: boolean;
  hasNext: boolean;
  previousPeriodId: number | null;
  nextPeriodId: number | null;
}

export interface StampResponse {
  period: Period;
  navigation: Navigation;
  today: string;
  stamps: StampItem[];
  totalDays: number;
  stampedDays: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}
