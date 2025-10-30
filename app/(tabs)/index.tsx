import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { API_BASE, fetchBriefs } from "../../lib/api";
import { useAppStore } from "../../lib/store";
import type { Brief } from "../../lib/types";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function FeedScreen() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();
  const { setSelectedBrief } = useAppStore();
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  /** 🔁 Fetch briefs from backend */
  const loadBriefs = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchBriefs();
      // fetchBriefs returns an array; keep support if a response object is ever returned
      // @ts-ignore tolerate either shape at runtime
      setBriefs(Array.isArray(data) ? data : (data?.briefs || []));
    } catch (err: any) {
      setError(err.message || "Failed to load briefs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBriefs();
  }, [loadBriefs]);

  /** 👀 Track which item is visible for page indicator */
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  /** 📰 Each brief card */
  const renderBrief = ({ item, index }: { item: Brief; index: number }) => {
    const inputRange = [
      (index - 1) * screenHeight,
      index * screenHeight,
      (index + 1) * screenHeight,
    ];

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: "clamp",
    });

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    });

    const MAX_LENGTH = 300; // Character limit for truncated text
    const truncatedText = item.brief_text.length > MAX_LENGTH 
      ? item.brief_text.substring(0, MAX_LENGTH) + "..."
      : item.brief_text;
    const shouldShowButton = item.brief_text.length > MAX_LENGTH;

    const openBrief = () => {
      setSelectedBrief(item);
      router.push(`/article/${item.topic_id}` as any);
    };

    return (
      <Animated.View style={[styles.articleContainer, { opacity, transform: [{ scale }] }]}>
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
          style={styles.gradient}
        />

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>This week</Text>
        </View>

        {/* Top Menu */}
        <View style={styles.topMenu}>
          <Text style={styles.leftLabel}>L</Text>
          <Text style={styles.centerLabel}>What Happened</Text>
          <Text style={styles.rightLabel}>R</Text>
        </View>

        {/* Brief Content */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.source}>{`Topic #${item.topic_id}`}</Text>
            <Text style={styles.timeAgo}>Live</Text>
          </View>

          <Text style={styles.title}>{truncatedText}</Text>

          {shouldShowButton && (
            <Pressable
              style={styles.readMoreButton}
              onPress={openBrief}
            >
              <Text style={styles.readMoreButtonText}>Read more</Text>
            </Pressable>
          )}

          <View style={styles.actions}>
            <Pressable
              style={styles.readButton}
              onPress={() => {
                console.log("Open Topic:", item.topic_id);
              }}
            >
              <LinearGradient
                colors={["#c084fc", "#a855f7", "#8b5cf6"]}
                style={styles.readButtonGradient}
              >
                <Text style={styles.readButtonText}>View Details</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.saveButtonContainer}>
          <Pressable style={styles.saveButton}>
            <View style={styles.saveIcon}>
              <View style={styles.bookmarkBody} />
              <View style={styles.bookmarkTail} />
            </View>
          </Pressable>
        </View>
      </Animated.View>
    );
  };

  /** 🧭 UI states: loading, error, or list */
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "#fff", opacity: 0.8 }}>Loading briefs...</Text>
        <Text style={{ color: "#999", fontSize: 12, marginTop: 6 }}>{API_BASE}</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "tomato", fontWeight: "600", marginBottom: 8 }}>Error: {error}</Text>
        <Pressable
          onPress={loadBriefs}
          style={{ padding: 10, borderWidth: 1, borderColor: "#c084fc", borderRadius: 8 }}
        >
          <Text style={{ color: "#c084fc" }}>Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={briefs}
        keyExtractor={(item) => String(item.topic_id)}
        renderItem={renderBrief}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
        ListEmptyComponent={<Text style={{ color: "#fff", padding: 24 }}>No briefs found.</Text>}
      />

      {/* Page Indicator */}
      <View style={styles.pageIndicator}>
        {briefs.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

/** 🎨 Styles — unchanged from your version */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  articleContainer: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: "flex-end",
    position: "relative",
  },
  gradient: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  headerContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 5,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
    textShadowColor: "rgba(192, 132, 252, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  topMenu: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 3,
  },
  leftLabel: {
    color: "#3b82f6",
    fontSize: 24,
    fontWeight: "700",
    textShadowColor: "rgba(59, 130, 246, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  centerLabel: {
    color: "#c084fc",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
    textShadowColor: "rgba(192, 132, 252, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  rightLabel: {
    color: "#ef4444",
    fontSize: 24,
    fontWeight: "700",
    textShadowColor: "rgba(239, 68, 68, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  content: { padding: 24, paddingBottom: 140, zIndex: 2 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  source: {
    color: "#c084fc",
    fontSize: 16,
    fontWeight: "600",
    textShadowColor: "rgba(192, 132, 252, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  timeAgo: { color: "#a855f7", fontSize: 14, opacity: 0.8 },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  readMoreButtonText: {
    color: "#c084fc",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  actions: { marginTop: 20 },
  readButton: { alignSelf: "flex-start" },
  readButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    alignItems: "center",
  },
  readButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  saveButtonContainer: {
    position: "absolute",
    right: 16,
    bottom: 160,
    zIndex: 3,
  },
  saveButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(192, 132, 252, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(192, 132, 252, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#c084fc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveIcon: {
    width: 24,
    height: 28,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkBody: {
    width: 16,
    height: 20,
    backgroundColor: "#c084fc",
    borderRadius: 2,
    position: "absolute",
    top: 0,
  },
  bookmarkTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#a855f7",
    position: "absolute",
    bottom: -2,
  },
  pageIndicator: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: [{ translateY: -50 }],
    zIndex: 4,
    gap: 8,
  },
  dot: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: "rgba(192, 132, 252, 0.3)",
  },
  activeDot: {
    backgroundColor: "#c084fc",
    shadowColor: "#c084fc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
});