import { useQuery, keepPreviousData } from "@tanstack/react-query";

import api from "./auth";
import type { ApiResponse, StampResponse } from "@/types/stamp";

export const getStamps = async (periodId?: number): Promise<StampResponse> => {
  const params = periodId ? { periodId } : {};
  const response = await api.get<ApiResponse<StampResponse>>("/stamps", {
    params,
  });

  if (!response.data.success) {
    throw new Error(response.data.error?.message || "스탬프 조회 실패");
  }

  return response.data.data;
};

export const useStamps = (periodId?: number) => {
  return useQuery({
    queryKey: ["stamps", periodId] as const,
    queryFn: () => getStamps(periodId),
    placeholderData: keepPreviousData,
  });
};
