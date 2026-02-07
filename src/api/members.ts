import api from "./auth";

export type MemberMeResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    hasEverSetBudget: boolean;
    usage: {
      startDate: string;
      years: number;
      months: number;
    };
    summary: {
      savedPeriodCount: number;
      exceededPeriodCount: number;
      totalSavedAmount: number;
    };
  };
  error?: {
    code: string;
    message: string;
  };
};

export async function getMemberMe() {
  const { data } = await api.get<MemberMeResponse>("/members/me");
  return data;
}
