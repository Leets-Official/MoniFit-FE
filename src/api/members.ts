import axios from "axios";
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

export type PatchMemberNameResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
    email: string;
  };
  error?: {
    code: string;
    message: string;
  };
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function pickServerMessage(data: unknown): string | undefined {
  if (!isRecord(data)) return undefined;

  const err = data.error;
  if (isRecord(err) && typeof err.message === "string") return err.message;

  if (typeof data.message === "string") return data.message;

  return undefined;
}

function getAxiosErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return "Unknown error";

  const status = error.response?.status;
  const serverMessage = pickServerMessage(error.response?.data);

  return `[${status ?? "NO_STATUS"}] ${serverMessage ?? error.message}`;
}

export async function getMemberMe() {
  try {
    const { data } = await api.get<MemberMeResponse>("/members/me");
    return data;
  } catch (error) {
    console.error("Failed to fetch member info:", getAxiosErrorMessage(error));
    throw error;
  }
}

export async function deleteMember() {
  try {
    const { data } = await api.delete("/members/me");
    return data;
  } catch (error) {
    console.error("Failed to delete member:", getAxiosErrorMessage(error));
    throw error;
  }
}

export async function patchMemberName(name: string) {
  try {
    const { data } = await api.patch<PatchMemberNameResponse>("/members/me/name", { name });
    return data;
  } catch (error) {
    console.error("Failed to patch member name:", getAxiosErrorMessage(error));
    throw error;
  }
}
