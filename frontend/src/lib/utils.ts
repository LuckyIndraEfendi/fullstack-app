import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { QueryClient } from "@tanstack/react-query";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface tokenPayloadAuth {
  status: "success";
  data: {
    id: string;
    email: string;
    username: string;
  };
  token: string;
}

export const baseURL = import.meta.env.VITE_BACKEND_URL;

export const getToken = (): tokenPayloadAuth | null => {
  const tokenString = localStorage?.getItem("token");
  if (!tokenString) return null;
  try {
    return JSON.parse(tokenString);
  } catch (error) {
    console.error("Error parsing token from localStorage", error);
    return null;
  }
};

export const token = getToken();

export const generateCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

export const queryClient = new QueryClient();
