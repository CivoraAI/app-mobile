export type MetricsRequest = { articles: string[] };
export type MetricsResponse = { scores: number[]; overall: number };
export type Brief = {
    topic_id: number;
    brief_text: string;
    urls: string[];
    titles: string[];
    authors: (string | null)[];
    published_dates: string[];
    // Optional per-citation metrics, 5 scores per citation
    metrics?: number[][];
  };


export type BriefItem = {
  topic_id: number;
  core_facts_brief?: string | null;
  left_claims_brief?: string | null;
  right_claims_brief?: string | null;
  urls: string[];
  titles: string[];
  authors: (string | null)[];
  published_dates: string[];
  fcs: (number | string)[];
  ocs: (number | string)[];
  sds: (number | string)[];
  lis: (number | string)[];
  article_biases: (number | string)[];
};

export type BriefsResponse = {
  briefs: BriefItem[];
  count: number;
  message?: string;
};