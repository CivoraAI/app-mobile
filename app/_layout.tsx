import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useAppStore } from "../lib/store";

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const { isAuthenticated } = useAppStore();
  
  if (!loaded) return null;

  // Optional: default Text styling
  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.style = [{ fontFamily: "Inter_400Regular" }];

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="(auth)" />
        </>
      ) : (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: "modal", title: "About", headerShown: true }} />
          <Stack.Screen name="article/[id]" />
        </>
      )}
    </Stack>
  );
}