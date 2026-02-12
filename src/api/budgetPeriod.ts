const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 공통 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  } | null;
}

// 예산 기간 데이터 타입
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

// 활성 예산 데이터 타입
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

// 완료된 예산 기간 아이템 타입
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

// 완료된 예산 목록 응답 타입
interface CompletedPeriodsResponse {
  periods: CompletedPeriodItem[];
  totalCount: number;
}

// 지출 아이템 타입
export interface ExpenseItem {
  id: string;
  category: string;
  categoryName: string;
  amount: number;
  spentDate: string;
  createdAt: string;
}

// 지출 목록 응답 타입
interface ExpensesResponse {
  expenses: ExpenseItem[];
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

// JWT 토큰 가져오기
const getAuthToken = (): string => {
  return localStorage.getItem('accessToken') || '';
};

// 1. 예산 기간 생성
export const createBudgetPeriod = async (
  budgetAmount: number
): Promise<BudgetPeriodData> => {
  try {
    const now = new Date();
    const today =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0");

    const response = await fetch(`${API_BASE_URL}/budget-periods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({
        startDate: today,
        budgetAmount
      })
    });

    const result: ApiResponse<BudgetPeriodData> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error(result.error?.message || '예산 생성 실패');
    }
  } catch (error) {
    console.error('createBudgetPeriod 오류:', error);
    throw error;
  }
};

// 2. 활성 예산 기간 조회
export const getActiveBudget = async (): Promise<ActiveBudgetData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/budget-periods/active`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      }
    });

    const result: ApiResponse<ActiveBudgetData> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('getActiveBudget 오류:', error);
    throw error;
  }
};

// 3. 대시보드 데이터 조회
export const getDashboard = async (): Promise<DashboardData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      }
    });

    const result: ApiResponse<DashboardData> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error(result.error?.message || '대시보드 조회 실패');
    }
  } catch (error) {
    console.error('getDashboard 오류:', error);
    throw error;
  }
};

// 4. 특정 예산 기간 상세 조회
export const getBudgetPeriod = async (periodId: string): Promise<BudgetPeriodData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/budget-periods/${periodId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      }
    });

    const result: ApiResponse<BudgetPeriodData> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error(result.error?.message || '예산 조회 실패');
    }
  } catch (error) {
    console.error('getBudgetPeriod 오류:', error);
    throw error;
  }
};

// 5. 완료된 예산 기간 목록 조회
export const getCompletedBudgets = async (): Promise<CompletedPeriodItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/budget-periods/completed`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      }
    });

    const result: ApiResponse<CompletedPeriodsResponse> = await response.json();
    
    if (result.success && result.data) {
      return result.data.periods;
    } else {
      throw new Error(result.error?.message || '완료 목록 조회 실패');
    }
  } catch (error) {
    console.error('getCompletedBudgets 오류:', error);
    throw error;
  }
};

// 6. 특정 기간의 지출 내역 조회
export const getExpenses = async (params: { 
  periodId: number 
}): Promise<ExpensesResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/budget-periods/${params.periodId}/expenses`,
      {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
        }
      }
    );

    const result: ApiResponse<ExpensesResponse> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error(result.error?.message || '지출 내역 조회 실패');
    }
  } catch (error) {
    console.error('getExpenses 오류:', error);
    throw error;
  }
};