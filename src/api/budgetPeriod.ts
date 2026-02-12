const API_BASE_URL = '/api/v1';

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
  startDate: string,
  budgetAmount: number
): Promise<BudgetPeriodData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/budget-periods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({
        startDate,
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
  // 지출 항목 타입 (리포트 도넛/카테고리 합산용)
export interface ExpenseItem {
  id: number;
  category: string;
  categoryName: string;
  amount: number;
  spentDate: string;
  createdAt: string;
}

// 지출 목록 응답 타입
interface ExpensesData {
  expenses: ExpenseItem[];
  totalCount: number;
  totalAmount: number;
}


interface AlertDetail {
  title: string;
  message: string;
}

interface CreateExpenseAlerts {
  expenseInput: AlertDetail;
  showStamp: boolean;
  stamp: AlertDetail;
  showWarning: boolean;
  warning: AlertDetail;
  showOverBudget: boolean;
  overBudget: AlertDetail;
}

export interface CreateExpenseResponse {
  alerts: CreateExpenseAlerts;
}

export const createExpense = async (
  category: string,
  amount: number,
  spentDate: string
): Promise<CreateExpenseResponse> => {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ category, amount, spentDate })
  });

  const result: ApiResponse<CreateExpenseResponse> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error?.message || '지출 기록 실패');
  }

  return result.data;
};

export const getExpenses = async (params?: {
  periodId?: string | number;
  date?: string;
  category?: string;
}): Promise<ExpensesData> => {
  try {
    const query = new URLSearchParams();
    
    if (params?.periodId !== undefined) query.set('periodId', String(params.periodId));
    if (params?.date) query.set('date', params.date);
    if (params?.category) query.set('category', params.category);

    const queryString = query.toString();
    const url = queryString
      ? `${API_BASE_URL}/expenses?${queryString}`
      : `${API_BASE_URL}/expenses`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      }
    });

    const result: ApiResponse<ExpensesData> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error(result.error?.message || '지출 목록 조회 실패');
    }
  } catch (error) {
    console.error('getExpenses 오류:', error);
    throw error;
  }
};

