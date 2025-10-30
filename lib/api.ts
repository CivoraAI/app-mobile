// lib/api.ts
import { Platform } from "react-native";
import { API_URL } from "../constants/api";
import { BriefsResponse } from "./types";


const fallback = Platform.select({
  // iOS simulator can reach mac host at 127.0.0.1
  ios: "http://127.0.0.1:8000",
  // Android emulator requires special host mapping
  android: "http://10.0.2.2:8000",
  default: "http://127.0.0.1:8000",
});

// Respect EXPO_PUBLIC_API_BASE if provided, otherwise use platform fallback
export const API_BASE = process.env.EXPO_PUBLIC_API_BASE || fallback!;

export async function fetchBriefs(): Promise<BriefsResponse> {
  const res = await fetch(`${API_BASE}/briefs`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${text}`);
  }
  return res.json();
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET ${path} failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`POST ${path} failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}