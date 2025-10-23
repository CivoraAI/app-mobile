import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useAppStore } from "@/lib/store";
import { useLocalSearchParams } from "expo-router";
import { Linking, SafeAreaView, Text, View } from "react-native";

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const article = useAppStore((s) => s.selectedArticle);

  if (!article || article.id !== id) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-bg">
        <Card className="w-11/12">
          <Text className="text-white text-lg font-[Inter_700Bold]">Article not loaded</Text>
          <Text className="text-sub mt-2">Go back and open the article again.</Text>
        </Card>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="p-4 gap-3">
        <Badge tone="brand">Article</Badge>
        <Card>
          <Text className="text-white text-xl font-[Inter_700Bold]">{article.title}</Text>
          <Text className="text-sub mt-1">Source: {article.source}</Text>
          {article.url ? (
            <Text
              className="text-brandSoft underline mt-2"
              onPress={() => Linking.openURL(article.url!)}
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