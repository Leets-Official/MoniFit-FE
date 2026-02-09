const API_BASE_URL = '/api/v1';

// 응답 타입 정의
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

interface BudgetPeriodData {
  id: string;
  startDate: string;
  endDate: string;
  budgetAmount: number;
  status: string;
  completionType: string;
  warningShown: boolean;
  createdAt: string;
}

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
export const getActiveBudget = async (): Promise<BudgetPeriodData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/budget-periods/active`);
    const result: ApiResponse<BudgetPeriodData> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('getActiveBudget 오류:', error);
    throw error;
  }
};

// 3. 특정 예산 기간 상세 조회
export const getBudgetPeriod = async (periodId: string): Promise<BudgetPeriodData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/budget-periods/${periodId}`);
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

// 4. 완료된 예산 기간 목록 조회
export const getCompletedBudgets = async (): Promise<BudgetPeriodData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/budget-periods/completed`);
    const result: ApiResponse<BudgetPeriodData[]> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error(result.error?.message || '완료 목록 조회 실패');
    }
  } catch (error) {
    console.error('getCompletedBudgets 오류:', error);
    throw error;
  }
};