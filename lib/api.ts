// lib/api.ts
import { Platform } from "react-native";
import { API_URL } from "../constants/api";
import { getBaseUrl } from "../constants/env";
import type { BriefsResponse } from "./types";

const fallback = Platform.select({
  // iOS simulator can reach mac host at 127.0.0.1
  ios: "http://127.0.0.1:8000",
  android: "http://10.0.2.2:8000",
  default: "http://127.0.0.1:8000",
});

// Respect EXPO_PUBLIC_API_BASE if provided; otherwise use env helper which is LAN-aware
export const API_BASE = process.env.EXPO_PUBLIC_API_BASE || getBaseUrl() || fallback!;

export async function fetchBriefs(): Promise<BriefsResponse> {
  const url = `${API_BASE}/api/briefs`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${text} @ ${url}`);
  }
  const data = (await res.json()) as BriefsResponse;
  // normalize numeric strings -> numbers where possible
  const normalize = (arr?: (number | string)[]) =>
    (arr ?? []).map((v) =>
      typeof v === "string" && v.trim() !== "" && !isNaN(Number(v))
        ? Number(v)
        : v
    );
  data.briefs?.forEach((b: any) => {
    b.fcs = normalize(b.fcs);
    b.ocs = normalize(b.ocs);
    b.sds = normalize(b.sds);
    b.lis = normalize(b.lis);
    b.article_biases = normalize(b.article_biases);
  });
  return data;
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