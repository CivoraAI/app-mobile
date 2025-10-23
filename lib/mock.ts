// lib/mocks.ts
export const mockGroups = {
    count: 2,
    items: [
      {
        groupId: "grp_1",
        topic: "Election Results",
        updatedAt: "2025-10-13T18:10:00Z",
        metrics: { overall: 0.62, coverageLeft: 0.44, coverageRight: 0.71, sourceDiversity: 0.55 },
        articles: [
          { id: "art_01", title: "Results roll in across key states", source: "AP", url: "#"},
          { id: "art_02", title: "Both parties claim momentum overnight", source: "NYTimes", url: "#"},
          { id: "art_03", title: "What to watch in late counts", source: "WSJ", url: "#"},
        ],
      },
      {
        groupId: "grp_2",
        topic: "Economy & Jobs",
        updatedAt: "2025-10-13T17:05:00Z",
        metrics: { overall: 0.41, coverageLeft: 0.32, coverageRight: 0.50, sourceDiversity: 0.30 },
        articles: [
          { id: "art_10", title: "Jobs report surprises economists", source: "WSJ", url: "#"},
          { id: "art_11", title: "Markets react to inflation data", source: "Bloomberg", url: "#"},
        ],
      },
    ],
  };