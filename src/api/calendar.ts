import { useQuery } from '@tanstack/react-query';
import api from '@/api/auth';

export interface MonthlyCalendarData {
  year: number;
  month: number;
  period: {
    id: string;
    startDate: string;
    endDate: string;
  };
  dailySummaries: {
    date: string;
    totalAmount: number;
    withinPeriod: boolean;
  }[];
}

export interface DailyCalendarData {
  date: string;
  totalAmount: number;
  categories: {
    category: string;
    categoryName: string;
    totalAmount: number;
    expenses: {
      id: string;
      category: string;
      categoryName: string;
      amount: number;
      spentDate: string;
      createdAt: string;
    }[];
  }[];
}

const getMonthlyCalendar = async (year: number, month: number) => {
  const { data } = await api.get<{ success: boolean; data: MonthlyCalendarData }>(
    '/calendar/monthly',
    { params: { year, month } }
  );
  return data.data;
};

const getDailyCalendar = async (date: string) => {
  const { data } = await api.get<{ success: boolean; data: DailyCalendarData }>(
    '/calendar/daily',
    { params: { date } }
  );
  return data.data;
};

export const useMonthlyCalendar = (year: number, month: number) => {
  return useQuery({
    queryKey: ['calendar', 'monthly', year, month],
    queryFn: () => getMonthlyCalendar(year, month),
  });
};

export const useDailyCalendar = (date: string | null) => {
  return useQuery({
    queryKey: ['calendar', 'daily', date],
    queryFn: () => getDailyCalendar(date!),
    enabled: !!date,
  });
};