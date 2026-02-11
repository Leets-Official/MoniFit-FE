import api from "./auth";
import type {
  ExpenseCreateRequest,
  ExpenseCreateResponse,
  ApiResponse,
} from "@/types/expense";

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
