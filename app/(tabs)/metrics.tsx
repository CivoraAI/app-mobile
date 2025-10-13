import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { apiPost } from "../../lib/api";
import type { MetricsRequest, MetricsResponse } from "../../lib/types";

export default function MetricsScreen() {
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MetricsResponse | null>(null);
  const [error, setError] = useState<string>("");

  async function onScore() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const body: MetricsRequest = {
        articles: [a1, a2].filter((t) => t.trim().length > 0),
      };
      if (body.articles.length === 0) {
        setError("Please enter at least one article.");
        return;
      }
      const res = await apiPost<MetricsResponse>("/metrics/score", body);
      setResult(res);
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Metrics</Text>
          <Text style={styles.subtitle}>
            Enter one or two article texts and tap Score.
          </Text>

          <Text style={styles.label}>Article 1</Text>
          <TextInput
            style={styles.input}
            multiline
            value={a1}
            onChangeText={setA1}
            placeholder="Paste article text…"
            placeholderTextColor="#6b7280"
          />

          <Text style={styles.label}>Article 2 (optional)</Text>
          <TextInput
            style={styles.input}
            multiline
            value={a2}
            onChangeText={setA2}
            placeholder="Paste article text…"
            placeholderTextColor="#6b7280"
          />

          <Pressable
            onPress={onScore}
            style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Score</Text>
            )}
          </Pressable>

          {error ? <Text style={styles.error}>Error: {error}</Text> : null}

          {result && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Result</Text>
              <Text style={styles.row}>
                Scores: {result.scores.map((s) => s.toFixed(3)).join(", ")}
              </Text>
              <Text style={styles.row}>
                Overall: {result.overall.toFixed(3)}
              </Text>
              <Text style={styles.note}>
                These are placeholder scores (length-based) until CivAI Bias is
                ready.
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0b1220" },
  container: { padding: 16, gap: 12 },
  title: { fontSize: 24, fontWeight: "700", color: "white" },
  subtitle: { color: "#9ca3af", marginBottom: 8 },
  label: { color: "#e5e7eb", marginTop: 8 },
  input: {
    minHeight: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#374151",
    padding: 12,
    color: "white",
    backgroundColor: "#111827",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "700" },
  error: { color: "#fca5a5", marginTop: 8 },
  card: {
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#374151",
    backgroundColor: "#111827",
  },
  cardTitle: { color: "white", fontWeight: "700", marginBottom: 8 },
  row: { color: "#e5e7eb", marginBottom: 4 },
  note: { color: "#9ca3af", fontSize: 12, marginTop: 6 },
});