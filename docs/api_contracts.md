1) Health

Method/Path: GET /health
Purpose: Quick “is the server alive?”
200 OK (example)
{ "status": "ok" }

2) Score articles (placeholder now → real later)

Method/Path: POST /metrics/score
Purpose: Send 1–N article texts, get per-article scores and an overall score.

Request body
{
  "articles": [
    "First article text...",
    "Second article text (optional)..."
  ]
}
	•	articles (array of strings) — at least 1 item
200 OK (example)
{
  "scores": [0.142, 0.387],
  "overall": 0.265
}
	•	scores (array of numbers, same length as articles)
	•	overall (number) — simple average or model-defined aggregate
  
400 Bad Request (examples)
{ "error": "articles must be a non-empty array of strings" }
{ "error": "body is not valid JSON" }

500 Server Error (example)
{ "error": "internal error; try again later" }

3) Run scraper (TBD backend, shape frozen)

Method/Path: POST /scrape/run
Purpose: Ask backend to fetch fresh articles for a source/topic.

Request body (example)
{
  "source": "nytimes", 
  "topic": "election",
  "limit": 10
}
	•	source (string) — e.g., "nytimes", "cnn", "fox", "ap" (TBD: accepted list)
	•	topic (string, optional) — keyword/topic filter
	•	limit (number, optional) — default 10

200 OK (example)
{
  "count": 3,
  "items": [
    {
      "id": "art_01",
      "title": "Election updates",
      "url": "https://example.com/article/1",
      "publishedAt": "2025-10-13T19:20:30Z",
      "source": "nytimes",
      "snippet": "Brief summary of the article...",
      "text": "Full or partial article text if available..."
    },
    {
      "id": "art_02",
      "title": "Key races to watch",
      "url": "https://example.com/article/2",
      "publishedAt": "2025-10-13T18:05:00Z",
      "source": "nytimes",
      "snippet": "Brief summary...",
      "text": "..."
    },
    {
      "id": "art_03",
      "title": "Polling trends shift",
      "url": "https://example.com/article/3",
      "publishedAt": "2025-10-13T17:42:10Z",
      "source": "nytimes",
      "snippet": "Brief summary...",
      "text": "..."
    }
  ]
}

400 Bad Request (example)
{ "error": "unknown source 'nytims' (did you mean 'nytimes'?)" }

4) Latest grouped stories (TBD backend, shape frozen)

Method/Path: GET /groups/latest?limit=10
Purpose: Return most recent clusters/groups of similar articles.

200 OK (example)
{
  "count": 2,
  "items": [
    {
      "groupId": "grp_abc123",
      "topic": "Election night results",
      "updatedAt": "2025-10-13T19:40:00Z",
      "articles": [
        { "id": "art_01", "title": "Election updates", "source": "nytimes", "url": "https://example.com/1" },
        { "id": "art_09", "title": "Results roll in",  "source": "ap",      "url": "https://example.com/9" }
      ],
      "metrics": {
        "overall": 0.62,
        "coverageLeft": 0.44,
        "coverageRight": 0.71,
        "sourceDiversity": 0.55
      }
    },
    {
      "groupId": "grp_def456",
      "topic": "Economy and jobs",
      "updatedAt": "2025-10-13T18:10:00Z",
      "articles": [
        { "id": "art_02", "title": "Jobs report surprises", "source": "wsj", "url": "https://example.com/2" }
      ],
      "metrics": {
        "overall": 0.41,
        "coverageLeft": 0.32,
        "coverageRight": 0.50,
        "sourceDiversity": 0.30
      }
    }
  ]
}

500 Server Error (example)
{ "error": "grouping service unavailable" }

5) Article details (TBD backend, shape frozen)

Method/Path: GET /articles/{id}
Purpose: Fetch full data for one article.

200 OK (example)
{
  "id": "art_01",
  "title": "Election updates",
  "url": "https://example.com/article/1",
  "publishedAt": "2025-10-13T19:20:30Z",
  "source": "nytimes",
  "snippet": "Brief summary...",
  "text": "Full or partial article text...",
  "groupId": "grp_abc123",
  "scores": {
    "overall": 0.62,
    "components": {
      "factCoverage": 0.58,
      "oppositionCoverage": 0.46,
      "sourceDiversity": 0.55,
      "loadedIntensity": 0.22,
      "sentiment": -0.11
    }
  }
}

404 Not Found (example)
{ "error": "article not found" }

Error shape (frontend assumes this)

All error responses should be:
{ "error": "human-readable message" }

Versioning note
	•	When we change a response shape, bump a version field at the top-level:
{ "version": 2, "items": [ ... ] }
	•	For now we assume version: 1 if missing.

Mocking guide (for frontend when backend isn’t ready)
When an endpoint isn’t implemented yet, the frontend can mock:
	•	/metrics/score
  // Example mock in the app:
const mockMetrics = { scores: [0.12, 0.37], overall: 0.245 };
	•	/scrape/run
  const mockScrape = {
  count: 2,
  items: [
    { id: "art_01", title: "Election updates", source: "nytimes", url: "#", publishedAt: "2025-10-13T19:20:30Z", snippet: "…", text: "…" },
    { id: "art_02", title: "Key races to watch", source: "nytimes", url: "#", publishedAt: "2025-10-13T18:05:00Z", snippet: "…", text: "…" }
  ]
};
	•	/groups/latest
  const mockGroups = {
  count: 1,
  items: [
    {
      groupId: "grp_1",
      topic: "Economy",
      updatedAt: "2025-10-13T18:10:00Z",
      articles: [
        { id: "art_01", title: "Jobs report surprises", source: "wsj", url: "#" }
      ],
      metrics: { overall: 0.41, coverageLeft: 0.32, coverageRight: 0.50, sourceDiversity: 0.30 }
    }
  ]
};
  

