import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface GroupCardProps {
  topic: string;
  updatedAt: string;
  overall?: number;
  children?: ReactNode;
}

export function GroupCard({ topic, updatedAt, overall, children }: GroupCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.topic}>{topic}</Text>
        <Text style={styles.updatedAt}>{updatedAt}</Text>
      </View>
      {overall !== undefined && (
        <View style={styles.metricsContainer}>
          <Text style={styles.metricsLabel}>Overall Score:</Text>
          <Text style={[styles.metricsValue, getScoreStyle(overall)]}>{overall}</Text>
        </View>
      )}
      <View style={styles.articles}>{children}</View>
    </View>
  );
}

function getScoreStyle(score: number) {
  if (score >= 7) return styles.scoreHigh;
  if (score >= 4) return styles.scoreMid;
  return styles.scoreLow;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  topic: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  updatedAt: {
    color: "#6b7280",
    fontSize: 12,
  },
  metricsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  metricsLabel: {
    color: "#9ca3af",
    fontSize: 12,
    marginRight: 8,
  },
  metricsValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  scoreHigh: {
    color: "#10b981",
  },
  scoreMid: {
    color: "#f59e0b",
  },
  scoreLow: {
    color: "#ef4444",
  },
  articles: {
    gap: 8,
  },
});