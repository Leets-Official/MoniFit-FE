import api from "@/api/auth";

/* -------------------- 공통 응답 타입 -------------------- */
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  } | null;
}

/* -------------------- 예산 기간 타입 -------------------- */
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
  completionType: "SUCCESS" | "OVER_BUDGET";
}

interface CompletedPeriodsResponse {
  periods: CompletedPeriodItem[];
  totalCount: number;
}

/* -------------------- 대시보드 타입 -------------------- */
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

/* -------------------- 지출 타입 -------------------- */
export interface ExpenseItem {
  id: number;
  category: string;
  categoryName: string;
  amount: number;
  spentDate: string;
  createdAt: string;
}

interface ExpensesData {
  expenses: ExpenseItem[];
  totalCount: number;
  totalAmount: number;
}

/* ========================= API ========================= */

/* 1. 예산 생성 */
export const createBudgetPeriod = async (
  startDate: string,
  budgetAmount: number
): Promise<BudgetPeriodData> => {
  const response = await api.post<ApiResponse<BudgetPeriodData>>(
    "/budget-periods",
    { startDate, budgetAmount }
  );

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(
    response.data.error?.message || "예산 생성 실패"
  );
};

/* 2. 활성 예산 조회 */
export const getActiveBudget =
  async (): Promise<ActiveBudgetData | null> => {
    const response =
      await api.get<ApiResponse<ActiveBudgetData>>(
        "/budget-periods/active"
      );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    return null;
  };

/* 3. 대시보드 조회 */
export const getDashboard =
  async (): Promise<DashboardData> => {
    const response =
      await api.get<ApiResponse<DashboardData>>(
        "/dashboard"
      );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(
      response.data.error?.message ||
        "대시보드 조회 실패"
    );
  };

/* 4. 특정 예산 조회 */
export const getBudgetPeriod = async (
  periodId: string
): Promise<BudgetPeriodData> => {
  const response =
    await api.get<ApiResponse<BudgetPeriodData>>(
      `/budget-periods/${periodId}`
    );

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(
    response.data.error?.message || "예산 조회 실패"
  );
};

/* 5. 완료된 예산 목록 */
export const getCompletedBudgets =
  async (): Promise<CompletedPeriodItem[]> => {
    const response =
      await api.get<ApiResponse<CompletedPeriodsResponse>>(
        "/budget-periods/completed"
      );

    if (response.data.success && response.data.data) {
      return response.data.data.periods;
    }

    throw new Error(
      response.data.error?.message ||
        "완료 목록 조회 실패"
    );
  };

/* 6. 지출 목록 조회 */
export const getExpenses = async (params?: {
  periodId?: string | number;
  date?: string;
  category?: string;
}): Promise<ExpensesData> => {
  const response =
    await api.get<ApiResponse<ExpensesData>>(
      "/expenses",
      { params }
    );

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(
    response.data.error?.message ||
      "지출 목록 조회 실패"
  );
};
