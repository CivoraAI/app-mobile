import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useAppStore } from "@/lib/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Modal, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const article = useAppStore((s) => s.selectedArticle);
  const brief = useAppStore((s) => s.selectedBrief);
  const briefView = useAppStore((s) => s.selectedBriefView);
  const [scorecardIndex, setScorecardIndex] = useState<number | null>(null);

  // Check if it's a brief or article
  const isBrief = brief !== null && String(brief.topic_id) === id;
  const isArticle = article !== null && article.id === id;

  if (!isArticle && !isBrief) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, backgroundColor: "#000000" }}>
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
            {briefView === 'left' && (
              <Text style={{ color: '#60a5fa', fontSize: 14, fontWeight: '700' }}>Left perspective</Text>
            )}
            {briefView === 'right' && (
              <Text style={{ color: '#f87171', fontSize: 14, fontWeight: '700' }}>Right perspective</Text>
            )}
            {briefView === 'both' && (
              <Text style={{ color: '#a3a3a3', fontSize: 14, fontWeight: '700' }}>Left vs Right</Text>
            )}
          </View>

          {/* Content */}
          {briefView === 'both' ? (
            <View style={{ flexDirection: 'row', gap: 16, marginTop: 8 }}>
              <View style={{ flex: 1, borderRightWidth: 1, borderColor: 'rgba(96,165,250,0.25)', paddingRight: 8 }}>
                <Text style={{ color: '#60a5fa', fontSize: 14, fontWeight: '700', marginBottom: 8 }}>Left</Text>
                <Text style={{ color: '#ffffff', fontSize: 16, lineHeight: 26 }}>
                  {((brief as any).left_claims_brief ?? (brief as any).core_facts_brief ?? '')}
                </Text>
              </View>
              <View style={{ flex: 1, paddingLeft: 8 }}>
                <Text style={{ color: '#f87171', fontSize: 14, fontWeight: '700', marginBottom: 8 }}>Right</Text>
                <Text style={{ color: '#ffffff', fontSize: 16, lineHeight: 26 }}>
                  {((brief as any).right_claims_brief ?? (brief as any).core_facts_brief ?? '')}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={{ color: "#ffffff", fontSize: 16, lineHeight: 26, marginTop: 8 }}>
              {(() => {
                const core = (brief as any).brief_text ?? (brief as any).core_facts_brief;
                const left = (brief as any).left_claims_brief;
                const right = (brief as any).right_claims_brief;
                if (briefView === 'left') return left ?? core ?? '';
                if (briefView === 'right') return right ?? core ?? '';
                return core ?? left ?? right ?? '';
              })()}
            </Text>
          )}

          {/* Citations */}
          <View style={{ marginTop: 28 }}>
            <Text style={{ color: "#c084fc", fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Citations
            </Text>
            {(() => {
              const urls = brief.urls || [];
              const titles = brief.titles || [];
              const authors = brief.authors || [];
              const dates = brief.published_dates || [];
              // Derive metrics from parallel arrays (aligned by index)
              const fcs = (brief as any).fcs as (number | string)[] | undefined;
              const ocs = (brief as any).ocs as (number | string)[] | undefined;
              const sds = (brief as any).sds as (number | string)[] | undefined;
              const lis = (brief as any).lis as (number | string)[] | undefined;
              const biases = (brief as any).article_biases as (number | string)[] | undefined;
              const itemCount = Math.min(
                urls.length,
                titles.length,
                authors.length,
                dates.length,
                fcs?.length ?? urls.length,
                ocs?.length ?? urls.length,
                sds?.length ?? urls.length,
                lis?.length ?? urls.length,
                biases?.length ?? urls.length,
              );
              if (itemCount === 0) {
                return (
                  <Text style={{ color: "#aaa" }}>No citations available.</Text>
                );
              }
              return urls.slice(0, itemCount).map((url, i) => {
                const title = titles[i] || url;
                return (
                  <Pressable
                    key={`${url}-${i}`}
                    onPress={() => Linking.openURL(url)}
                    style={{
                      paddingVertical: 12,
                      borderTopWidth: i === 0 ? 1 : 0,
                      borderBottomWidth: 1,
                      borderColor: "rgba(192, 132, 252, 0.25)",
                    }}
                  >
                    <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "600", textDecorationLine: "underline" }}>
                      {title}
                    </Text>
                    {/* Scorecard CTA */}
                    <Pressable
                      onPress={() => setScorecardIndex(i)}
                      style={{
                        alignSelf: 'flex-start',
                        marginTop: 10,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 16,
                        backgroundColor: 'rgba(192,132,252,0.12)',
                        borderWidth: 1,
                        borderColor: 'rgba(192,132,252,0.35)'
                      }}
                    >
                      <Text style={{ color: '#c084fc', fontWeight: '700' }}>View Bias Scorecard</Text>
                    </Pressable>
                  </Pressable>
                );
              });
            })()}
          </View>

          {/* Scorecard Modal */}
          <Modal
            transparent
            visible={scorecardIndex !== null}
            animationType="fade"
            onRequestClose={() => setScorecardIndex(null)}
          >
            <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }} onPress={() => setScorecardIndex(null)}>
              <View style={{
                marginTop: 100,
                marginHorizontal: 24,
                backgroundColor: '#0b0b0b',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: 'rgba(192,132,252,0.25)',
                padding: 20
              }}>
                {(() => {
                  const i = scorecardIndex ?? 0;
                  const n = (v: any) => (typeof v === 'string' && v.trim() !== '' && !isNaN(Number(v)) ? Number(v) : (typeof v === 'number' ? v : null));
                  const fcs = n((brief as any).fcs?.[i]);
                  const ocs = n((brief as any).ocs?.[i]);
                  const sds = n((brief as any).sds?.[i]);
                  const lis = n((brief as any).lis?.[i]);
                  const bias = n((brief as any).article_biases?.[i]);
                  const row = (label: string, value: number | null, color: string) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }}>
                      <Text style={{ color: '#d1d5db', fontWeight: '600' }}>{label}</Text>
                      <Text style={{ color, fontWeight: '800' }}>{value == null ? '-' : `${(value * 100).toFixed(4)}%`}</Text>
                    </View>
                  );
                  return (
                    <>
                      <Text style={{ color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 12 }}>Bias Scorecard</Text>
                      {row('Fact Coverage (FC)', fcs, '#93c5fd')}
                      {row('Opposition Coverage (OC)', ocs, '#c7d2fe')}
                      {row('Source Diversity (SD)', sds, '#6ee7b7')}
                      {row('Loaded Intensity (LI)', lis, '#fda4af')}
                      <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 8 }} />
                      <View style={{ paddingVertical: 10 }}>
                        <Text style={{ color: '#c084fc', fontSize: 16, fontWeight: '800' }}>Final Article Bias</Text>
                        <Text style={{ color: '#c084fc', fontSize: 28, fontWeight: '900', marginTop: 6 }}>
                          {bias == null ? '-' : `${(bias * 100).toFixed(4)}%`}
                        </Text>
                      </View>
                    </>
                  );
                })()}
                <Pressable
                  onPress={() => setScorecardIndex(null)}
                  style={{ alignSelf: 'center', marginTop: 8, paddingVertical: 8, paddingHorizontal: 16, borderWidth: 1, borderColor: '#c084fc', borderRadius: 10 }}
                >
                  <Text style={{ color: '#c084fc', fontWeight: '700' }}>Close</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Handle article display
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <View style={{ padding: 16 }}>
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