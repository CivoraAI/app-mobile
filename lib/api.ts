// lib/api.ts
import { Platform } from "react-native";
import { API_URL } from "../constants/api";


const fallback = Platform.select({
  // iOS simulator can reach mac host at 127.0.0.1
  ios: "http://127.0.0.1:8000",
  android: "http://10.0.2.2:8000",
  default: "http://127.0.0.1:8000",
});

// Respect EXPO_PUBLIC_API_BASE if provided, otherwise use platform fallback
export const API_BASE = process.env.EXPO_PUBLIC_API_BASE || fallback!;

export type Brief = {
  topic_id: number;
  core_facts_brief?: string | null;
  left_claims_brief?: string | null;
  right_claims_brief?: string | null;
  urls: string[];
  titles: string[];
  authors: (string | null)[];
  published_dates: (string | null)[];
};

export type BriefsResponse = {
  briefs: Brief[];
  count: number;
};

export async function fetchBriefs(): Promise<Brief[]> {
  const candidates = [`${API_BASE}/api/briefs`, `${API_BASE}/briefs`];
  let lastError: string | null = null;
  for (const url of candidates) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        lastError = `HTTP ${res.status}`;
        continue;
      }
      const json = await res.json();
      // Support both { briefs, count } and plain array responses
      if (Array.isArray(json)) return json as Brief[];
      const data = json as BriefsResponse;
      return data.briefs ?? [];
    } catch (e: any) {
      lastError = e?.message || String(e);
    }
  }
  throw new Error(lastError || "Failed to load briefs");
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