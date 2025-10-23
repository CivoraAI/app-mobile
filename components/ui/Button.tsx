import { Pressable, Text } from "react-native";

export function Button({
  title,
  onPress,
  disabled,
  className = "",
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`items-center rounded-xl bg-brand px-4 py-3 ${disabled ? "opacity-70" : ""} ${className}`}
      style={({ pressed }) => [{ opacity: pressed && !disabled ? 0.9 : 1 }]}
    >
      <Text className="text-white font-[Inter_700Bold]">{title}</Text>
    </Pressable>
  );
}