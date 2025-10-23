import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

interface BadgeProps {
  children: ReactNode;
  tone?: "brand" | "ok" | "danger";
  className?: string;
}

export function Badge({ children, tone = "brand", className }: BadgeProps) {
  return (
    <Text style={[styles.badge, styles[tone], className && { opacity: 0.8 }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  brand: {
    backgroundColor: "#2563eb",
    color: "white",
  },
  ok: {
    backgroundColor: "#10b981",
    color: "white",
  },
  danger: {
    backgroundColor: "#ef4444",
    color: "white",
  },
});