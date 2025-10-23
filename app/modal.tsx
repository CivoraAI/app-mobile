// app/modal.tsx
import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ModalScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>About Civora</Text>
        <Text style={styles.body}>
          This is a modal screen. You can show settings, about text, or a quick action here.
        </Text>

        <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.btn, pressed && {opacity: 0.9}]}>
          <Text style={styles.btnText}>Close</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0b1220", alignItems: "center", justifyContent: "center" },
  card: { width: "88%", backgroundColor: "#111827", borderColor: "#1f2937", borderWidth: 1, borderRadius: 16, padding: 20, gap: 12 },
  title: { color: "white", fontSize: 20, fontWeight: "700" },
  body: { color: "#e5e7eb" },
  btn: { backgroundColor: "#2563eb", paddingVertical: 10, borderRadius: 12, alignItems: "center", marginTop: 8 },
  btnText: { color: "white", fontWeight: "700" },
});