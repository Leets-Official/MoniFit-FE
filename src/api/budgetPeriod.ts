import api from '@/api/auth';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  } | null;
}

interface BudgetPeriodData {
  id: string;
  startDate: string;
  endDate: string;
  budgetAmount: number;
  status: string;
  completionType: string | null;
  warningShown: boolean;
  createdAt: string;
}

interface ActiveBudgetData {
  id: string;
  startDate: string;
  endDate: string;
  budgetAmount: number;
  totalExpense: number;
  remainingBudget: number;
  savedAmount: number | null;
  exceededAmount: number | null;
  usageRate: number;
  savingRate: number;
  totalDays: number;
  elapsedDays: number;
  remainingDays: number;
  progressRate: number;
  dailyRecommendedExpense: number;
  status: string;
  completionType: string | null;
  warningShown: boolean;
}

interface CompletedPeriodItem {
  id: string;
  startDate: string;
  endDate: string;
  budgetAmount: number;
  totalExpense: number;
  savedAmount?: number;
  exceededAmount?: number;
  completionType: 'SUCCESS' | 'OVER_BUDGET';
}

interface CompletedPeriodsResponse {
  periods: CompletedPeriodItem[];
  totalCount: number;
}

// 대시보드 데이터 타입
export interface DashboardData {
  hasPeriod: boolean;
  period: ActiveBudgetData | null;
  alerts: {
    showWarning: boolean;
    showOverBudget: boolean;
    showPeriodComplete: boolean;
    warning: {
      title: string;
      message: string;
      dailyRecommendedExpense: number;
    } | null;
    overBudget: {
      title: string;
      message: string;
      exceededAmount: number;
    } | null;
    periodComplete: {
      title: string;
      message1: string;
      message2: string;
      savedAmount: number;
    } | null;
  };
}

export const createBudgetPeriod = async (
  startDate: string,
  budgetAmount: number
): Promise<BudgetPeriodData> => {
  try {
    const response = await api.post<ApiResponse<BudgetPeriodData>>(
      '/budget-periods',
      {
        startDate,
        budgetAmount,
      }
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || '예산 생성 실패');
  } catch (error) {
    console.error('createBudgetPeriod 오류:', error);
    throw error;
  }
};

export const getActiveBudget = async (): Promise<ActiveBudgetData | null> => {
  try {
    const response =
      await api.get<ApiResponse<ActiveBudgetData>>(
        '/budget-periods/active'
      );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error('getActiveBudget 오류:', error);
    throw error;
  }
};

export const getDashboard = async (): Promise<DashboardData> => {
  try {
    const response =
      await api.get<ApiResponse<DashboardData>>(
        '/dashboard'
      );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || '대시보드 조회 실패');
  } catch (error) {
    console.error('getDashboard 오류:', error);
    throw error;
  }
};

export const getBudgetPeriod = async (
  periodId: string
): Promise<BudgetPeriodData> => {
  try {
    const response =
      await api.get<ApiResponse<BudgetPeriodData>>(
        `/budget-periods/${periodId}`
      );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || '예산 조회 실패');
  } catch (error) {
    console.error('getBudgetPeriod 오류:', error);
    throw error;
  }
};

export const getCompletedBudgets = async (): Promise<CompletedPeriodItem[]> => {
  try {
    const response =
      await api.get<ApiResponse<CompletedPeriodsResponse>>(
        '/budget-periods/completed'
      );

    if (response.data.success && response.data.data) {
      return response.data.data.periods;
    }

    throw new Error(response.data.error?.message || '완료 목록 조회 실패');
  } catch (error) {
    console.error('getCompletedBudgets 오류:', error);
    throw error;
  }
};