import api from '@/api/auth';

//
// ================= 공통 타입 =================
//

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  } | null;
}

//
// ================= 데이터 타입 =================
//

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

// 카테고리별 지출 타입 추가
interface CategoryExpense {
  category: string;
  categoryName: string;
  amount: number;
  percentage: number;
}

// categoryExpenses 추가
interface CompletedPeriodItem {
  id: string;
  startDate: string;
  endDate: string;
  budgetAmount: number;
  totalExpense: number;
  savedAmount?: number;
  exceededAmount?: number;
  completionType: 'SUCCESS' | 'OVER_BUDGET';
  categoryExpenses?: CategoryExpense[];
}

interface CompletedPeriodsResponse {
  periods: CompletedPeriodItem[];
  totalCount: number;
}

export interface ExpenseItem {
  id: string;
  category: string;
  categoryName: string;
  amount: number;
  spentDate: string;
  createdAt: string;
}

interface ExpensesResponse {
  expenses: ExpenseItem[];
  totalCount: number;
}

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


//
// ================= API 함수 =================
//

// 1. 예산 기간 생성
export const createBudgetPeriod = async (
  budgetAmount: number
): Promise<BudgetPeriodData> => {

  const now = new Date();
  const today =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  const response = await api.post<ApiResponse<BudgetPeriodData>>(
    '/budget-periods',
    {
      startDate: today,
      budgetAmount
    }
  );

  return response.data.data!;
};


// 2. 활성 예산 조회
export const getActiveBudget = async (): Promise<ActiveBudgetData | null> => {
  const response = await api.get<ApiResponse<ActiveBudgetData>>(
    '/budget-periods/active'
  );

  return response.data.data ?? null;
};


// 3. 대시보드 조회
export const getDashboard = async (): Promise<DashboardData> => {
  const response = await api.get<ApiResponse<DashboardData>>(
    '/dashboard'
  );

  return response.data.data!;
};


// 4. 특정 예산 기간 상세 조회
export const getBudgetPeriod = async (
  periodId: string
): Promise<BudgetPeriodData> => {

  const response = await api.get<ApiResponse<BudgetPeriodData>>(
    `/budget-periods/${periodId}`
  );

  return response.data.data!;
};


// 5. 완료된 예산 목록 조회
export const getCompletedBudgets = async (): Promise<CompletedPeriodItem[]> => {
  const response = await api.get<ApiResponse<CompletedPeriodsResponse>>(
    '/budget-periods/completed'
  );

  return response.data.data?.periods ?? [];
};


// 6. 특정 기간 지출 조회
export const getExpenses = async (
  periodId: number
): Promise<ExpensesResponse> => {
  try {
    // 1. 먼저 완료된 기간에서 찾기
    const completedResponse = await api.get<ApiResponse<CompletedPeriodsResponse>>(
      '/budget-periods/completed'
    );
    
    const completedPeriod = completedResponse.data.data?.periods.find(
      p => Number(p.id) === periodId
    );
    
    if (completedPeriod?.categoryExpenses) {
      const expenses: ExpenseItem[] = completedPeriod.categoryExpenses.map((cat, index) => ({
        id: `${periodId}-${index}`,
        category: cat.category,
        categoryName: cat.categoryName,
        amount: cat.amount,
        spentDate: completedPeriod.endDate,
        createdAt: completedPeriod.endDate,
      }));
      
      return {
        expenses,
        totalCount: expenses.length
      };
    }
    
    // 2. 완료된 기간에 없으면 활성 기간일 수 있음
    // 현재 활성 기간은 categoryExpenses가 없으므로 빈 배열 반환
    console.log('활성 기간이거나 데이터 없음 - 빈 배열 반환');
    return { expenses: [], totalCount: 0 };
    
  } catch (error) {
    console.error('getExpenses 에러:', error);
    return { expenses: [], totalCount: 0 };
  }
};