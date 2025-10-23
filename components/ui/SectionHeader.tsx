import { Text, View } from "react-native";

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <View className="mb-2">
      <Text className="text-white text-xl font-[Inter_700Bold]">{title}</Text>
      {sub ? <Text className="text-sub text-sm mt-1">{sub}</Text> : null}
    </View>
  );
}