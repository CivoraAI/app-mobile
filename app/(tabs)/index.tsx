import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { ArticleItem } from "../../components/ArticleItem";
import { GroupCard } from "../../components/GroupCard";
import { Article, mockGroups } from "../../lib/mocks";
import { useAppStore } from "../../lib/store";

export default function FeedScreen() {
  const router = useRouter();
  const { groups, setGroups, setSelectedArticle } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Load mocks on first mount
    setGroups(mockGroups.items);
  }, [setGroups]);

  function openArticle(article: Article) {
    setSelectedArticle(article);
    router.push(`/article/${article.id}`);
  }

  function onRefresh() {
    setRefreshing(true);
    // pretend to reload; you can shuffle the mocks here if you want
    setTimeout(() => {
      setGroups(mockGroups.items);
      setRefreshing(false);
    }, 600);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl tintColor="#fff" refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.header}>🗞️ Your Feed</Text>
        {groups.map((g) => (
          <GroupCard
            key={g.groupId}
            topic={g.topic}
            updatedAt={g.updatedAt}
            overall={g.metrics?.overall}
          >
            {g.articles.map((a) => (
              <ArticleItem
                key={a.id}
                title={a.title}
                source={a.source}
                onPress={() => openArticle(a)}
              />
            ))}
          </GroupCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1220" },
  scroll: { padding: 16, paddingBottom: 24 },
  header: { color: "white", fontSize: 22, fontWeight: "700", marginBottom: 10 },
});