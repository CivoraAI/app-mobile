import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { API_URL } from "../../constants/api";
import { apiGet } from "../../lib/api";

export default function HomeScreen() {
  const [status, setStatus] = useState<"loading" | "ok" | "error" | "unknown">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    apiGet<{ status: string }>("/health")
      .then((data) => !cancelled && setStatus((data?.status as any) ?? "unknown"))
      .catch((e) => {
        if (!cancelled) {
          setStatus("error");
          setError(String(e?.message || e));
        }
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Civora Mobile</Text>
        <Text style={styles.subtitle}>Backend health</Text>

        {status === "loading" ? (
          <ActivityIndicator size="large" />
        ) : status === "ok" ? (
          <Text style={[styles.badge, styles.ok]}>ok</Text>
        ) : (
          <Text style={[styles.badge, styles.err]}>{status}</Text>
        )}

        {error ? <Text style={styles.error}>Error: {error}</Text> : null}
        <Text style={styles.hint}>Backend: {API_URL}/health</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0b1220" },
  card: {
    width: "85%",
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  title: { fontSize: 24, fontWeight: "700", color: "white", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#9ca3af", marginBottom: 16 },
  badge: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    color: "white",
  },
  ok: { backgroundColor: "#16a34a" },
  err: { backgroundColor: "#dc2626" },
  hint: { color: "#6b7280", marginTop: 16, fontSize: 12 },
  error: { color: "#fca5a5", marginTop: 8 },
});

