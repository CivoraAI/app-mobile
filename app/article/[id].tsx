import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useAppStore } from "@/lib/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Linking, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const article = useAppStore((s) => s.selectedArticle);
  const brief = useAppStore((s) => s.selectedBrief);

  // Check if it's a brief or article
  const isBrief = brief !== null && String(brief.topic_id) === id;
  const isArticle = article !== null && article.id === id;

  if (!isArticle && !isBrief) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-bg">
        <Card className="w-11/12">
          <Text className="text-white text-lg font-[Inter_700Bold]">Content not loaded</Text>
          <Text className="text-sub mt-2">Go back and try again.</Text>
        </Card>
      </SafeAreaView>
    );
  }

  // Handle brief display
  if (isBrief) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
              paddingVertical: 8,
              paddingHorizontal: 12,
              alignSelf: "flex-start",
              borderRadius: 8,
              backgroundColor: "rgba(192, 132, 252, 0.1)",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, marginRight: 8 }}>←</Text>
            <Text style={{ color: "#c084fc", fontSize: 16, fontWeight: "600" }}>Back</Text>
          </Pressable>

          {/* Header */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: "#c084fc", fontSize: 16, fontWeight: "600", marginBottom: 16 }}>
              Topic #{brief.topic_id}
            </Text>
          </View>

          {/* Content */}
          <Text style={{ color: "#ffffff", fontSize: 16, lineHeight: 26, marginTop: 8 }}>
            {brief.brief_text}
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Handle article display
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="p-4 gap-3">
        <Badge tone="brand">Article</Badge>
        <Card>
          <Text className="text-white text-xl font-[Inter_700Bold]">{article!.title}</Text>
          <Text className="text-sub mt-1">Source: {article!.source}</Text>
          {article!.url ? (
            <Text
              className="text-brandSoft underline mt-2"
              onPress={() => Linking.openURL(article!.url!)}
            >
              Open original
            </Text>
          ) : null}
          <Text className="text-text mt-4">
            (Real article text will appear here once backend scraping is wired in.)
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
}