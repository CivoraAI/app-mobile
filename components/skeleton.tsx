// components/Skeleton.tsx
import { StyleSheet, View } from "react-native";

export function Skeleton({ height = 14, width = "100%", style }: any) {
  return <View style={[styles.shimmer, { height, width }, style]} />;
}

const styles = StyleSheet.create({
  shimmer: {
    backgroundColor: "#1f2937",
    borderRadius: 8,
    marginVertical: 6,
  },
});