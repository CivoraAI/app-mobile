import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>Search UI coming next.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0b1220" },
  card: { width: "85%", padding: 24, borderRadius: 16, backgroundColor: "#111827", borderWidth: 1, borderColor: "#1f2937" },
  title: { fontSize: 24, fontWeight: "700", color: "white", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#9ca3af" },
});