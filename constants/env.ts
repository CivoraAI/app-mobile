// constants/env.ts
import { Platform } from "react-native";

/**
 * Returns the base URL for the backend depending on where the app runs.
 * - iOS Simulator: can use 127.0.0.1 to reach your Mac
 * - Real device: must use your Mac's LAN IP
 */
export function getBaseUrl() {
  // Prefer env (set at runtime): EXPO_PUBLIC_API_BASE=http://<host>:<port>
  if (process.env.EXPO_PUBLIC_API_BASE) return process.env.EXPO_PUBLIC_API_BASE;

  // Fallbacks per platform (no sensitive IPs committed)
  if (Platform.OS === 'ios') {
    // iOS simulator
    return 'http://127.0.0.1:8000';
  }
  // Android emulator special host
  return 'http://10.0.2.2:8000';
}