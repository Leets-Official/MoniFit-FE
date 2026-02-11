// API 요청 타입
export interface ExpenseCreateRequest {
  category: string; // "food", "shopping", "medical", "life", "etc"
  amount: number; // 지출 금액
  spentDate: string; // "YYYY-MM-DD" 형식
}

// 알림 메시지 타입
export interface AlertMessage {
  title: string;
  message: string;
}

export interface ExpenseInputAlert extends AlertMessage {
  showStamp: boolean;
}

// API 응답 데이터 타입
export interface ExpenseCreateResponse {
  expense: {
    id: number;
    category: string;
    categoryName: string;
    amount: number;
    spentDate: string;
    createdAt: string;
  };
  periodCompleted: boolean;
  completionType: string;
  exceededAmount: number;
  alerts: {
    expenseInput: ExpenseInputAlert;
    stamp: AlertMessage;
    showWarning: boolean;
    warning: AlertMessage;
    showOverBudget: boolean;
    overBudget: AlertMessage;
  };
  updatedBudget: {
    totalExpense: number;
    remainingBudget: number;
    usageRate: number;
  };
}

// API 응답 래퍼
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}
