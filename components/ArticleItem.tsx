import { Pressable, StyleSheet, Text } from "react-native";

interface ArticleItemProps {
  title: string;
  source: string;
  onPress?: () => void;
}

export function ArticleItem({ title, source, onPress }: ArticleItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.8 }]}
    >
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.source}>{source}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#1f2937",
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  source: {
    color: "#9ca3af",
    fontSize: 12,
  },
});