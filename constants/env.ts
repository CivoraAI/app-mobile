// constants/env.ts
import { Platform } from "react-native";

/**
 * Returns the base URL for the backend depending on where the app runs.
 * - iOS Simulator: can use 127.0.0.1 to reach your Mac
 * - Real device: must use your Mac's LAN IP
 */
export function getBaseUrl() {
  const MAC_IP = "192.168.1.19"; // <-- replace with YOUR_MAC_IP
  if (Platform.OS === "ios") {
    // If you later run on a real iPhone, switch to your MAC_IP
    return __DEV__ ? "http://127.0.0.1:8000" : `http://${MAC_IP}:8000`;
  }
  // For Android later: emulator uses 10.0.2.2
  return `http://${MAC_IP}:8000`;
}