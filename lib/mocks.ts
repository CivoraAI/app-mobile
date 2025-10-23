export interface Article {
  id: string;
  title: string;
  source: string;
  url?: string;
  publishedAt?: string;
}

export interface Group {
  groupId: string;
  topic: string;
  updatedAt: string;
  metrics?: {
    overall: number;
  };
  articles: Article[];
}

export const mockGroups = {
  items: [
    {
      groupId: "tech-1",
      topic: "AI & Machine Learning",
      updatedAt: "2 hours ago",
      metrics: {
        overall: 8.5,
      },
      articles: [
        {
          id: "article-1",
          title: "OpenAI Releases New GPT Model with Enhanced Reasoning",
          source: "TechCrunch",
          publishedAt: "2024-01-15T10:30:00Z",
        },
        {
          id: "article-2",
          title: "Google's Gemini AI Shows Promise in Medical Diagnosis",
          source: "MIT Technology Review",
          publishedAt: "2024-01-15T08:15:00Z",
        },
        {
          id: "article-3",
          title: "Meta Announces New AI Training Infrastructure",
          source: "The Verge",
          publishedAt: "2024-01-14T16:45:00Z",
        },
      ],
    },
    {
      groupId: "climate-1",
      topic: "Climate & Environment",
      updatedAt: "4 hours ago",
      metrics: {
        overall: 6.2,
      },
      articles: [
        {
          id: "article-4",
          title: "Renewable Energy Reaches New Milestone in 2024",
          source: "Reuters",
          publishedAt: "2024-01-15T06:00:00Z",
        },
        {
          id: "article-5",
          title: "Ocean Temperature Rise Accelerates in Pacific",
          source: "Nature",
          publishedAt: "2024-01-14T14:30:00Z",
        },
      ],
    },
    {
      groupId: "economy-1",
      topic: "Global Economy",
      updatedAt: "6 hours ago",
      metrics: {
        overall: 4.8,
      },
      articles: [
        {
          id: "article-6",
          title: "Federal Reserve Signals Potential Rate Changes",
          source: "Wall Street Journal",
          publishedAt: "2024-01-15T12:00:00Z",
        },
        {
          id: "article-7",
          title: "Cryptocurrency Market Shows Volatility Amid Regulations",
          source: "Bloomberg",
          publishedAt: "2024-01-14T20:15:00Z",
        },
        {
          id: "article-8",
          title: "Tech Stocks Rally Despite Economic Uncertainty",
          source: "Financial Times",
          publishedAt: "2024-01-14T18:30:00Z",
        },
      ],
    },
  ],
};


