import { useRouter } from "expo-router";
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useAppStore } from "../../lib/store";

export default function ProfileScreen() {
  const router = useRouter();
  const { setIsAuthenticated } = useAppStore();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => {
            setIsAuthenticated(false);
            router.replace("/(auth)/login");
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile / Settings</Text>
        <Text style={styles.subtitle}>Account settings will go here.</Text>

        <Pressable
          onPress={() => router.push("/modal")}
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
        >
          <Text style={styles.buttonText}>Open About</Text>
        </Pressable>

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.logoutButton, pressed && { opacity: 0.9 }]}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0b1220" },
  card: { width: "85%", padding: 24, borderRadius: 16, backgroundColor: "#111827", borderWidth: 1, borderColor: "#1f2937", gap: 12 },
  title: { fontSize: 24, fontWeight: "700", color: "white" },
  subtitle: { fontSize: 14, color: "#9ca3af" },
  button: { backgroundColor: "#2563eb", paddingVertical: 12, borderRadius: 12, alignItems: "center", marginTop: 8 },
  buttonText: { color: "white", fontWeight: "700" },
  logoutButton: { backgroundColor: "#dc2626", paddingVertical: 12, borderRadius: 12, alignItems: "center", marginTop: 8 },
  logoutButtonText: { color: "white", fontWeight: "700" },
});