import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <View style={[styles.card, className && { opacity: 0.9 }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    backgroundColor: "#111827",
    padding: 16,
  },
});