import api from "./auth";
import type {
  ExpenseCreateRequest,
  ExpenseCreateResponse,
  ApiResponse,
} from "@/types/expense";

// 삭제 응답 타입 정의
type DeleteExpenseResponse = {
  updatedBudget: {
    totalExpense: number;
    remainingBudget: number;
    usageRate: number;
  };
};

// 기존 생성 API (그대로 유지)
export const createExpense = async (
  request: ExpenseCreateRequest
): Promise<ExpenseCreateResponse> => {
  const response = await api.post<ApiResponse<ExpenseCreateResponse>>(
    "/expenses",
    request
  );

  if (!response.data.success) {
    throw new Error(response.data.error?.message || "지출 등록 실패");
  }

  return response.data.data;
};

// 지출 수정 API 추가
export const updateExpense = async (
  expenseId: string,
  amount: number
): Promise<ExpenseCreateResponse> => {
  const response = await api.patch<ApiResponse<ExpenseCreateResponse>>(
    `/expenses/${expenseId}`,
    { amount }
  );

  if (!response.data.success) {
    throw new Error(response.data.error?.message || "지출 수정 실패");
  }

  return response.data.data;
};

// 지출 삭제 API 추가
export const deleteExpense = async (expenseId: string): Promise<void> => {
  const response = await api.delete<ApiResponse<DeleteExpenseResponse>>(
    `/expenses/${expenseId}`
  );

  if (!response.data.success) {
    throw new Error(response.data.error?.message || "지출 삭제 실패");
  }
};