# Product Intelligence & Comparison Platform — End-to-End Development Plan

The right product is a single-page, AI-powered global product research and comparison platform. A user enters a question such as “What is the best smartphone in 2026?”, selects the market and research settings, and receives a comprehensive, evidence-backed report comparing the top 10 products.

The platform should serve three audiences:

- Businesses and founders: validate products before launch, understand competitors, and identify market gaps.
- Sales and marketing teams: build product pitches, compare alternatives, and substantiate claims with evidence.
- Consumers and product researchers: identify the best products for their needs, compare specifications, reviews, pricing, and performance.

The key is to make this feel like a research analyst working across multiple sources, not a chatbot returning ten product names.

## 1. Product definition

## Research workspace

The entire workflow begins on one page, without login, saved user accounts, or historical research storage.

PRODUCT RESEARCH QUERY

## Best smartphones in 2026

Global market

10 products

2026

Market coverage

Global + country comparisons

Research depth

Features, pricing, sales, reviews, trends

Generate research report

Illustrative interface concept, not live research results.

### Generated report

Top 10 products

Ranked with transparent criteria

Market insights

Search, social and sales signals

Comparisons

Features, prices, reviews and trade-offs

Export center

PDF report and CSV datasets

### Stage 1 boundaries

Included:

- One responsive research page and an in-page results experience.
- AI-powered query interpretation and research planning.
- Category and niche selection, market selection, product count, date range, and advanced sorting.
- Multi-source research and evidence-backed product comparisons.
- Search interest, social hashtag trends, sales indicators, prices, reviews, ratings and specifications, where available.
- Interactive charts, sortable tables, explanations, recommendations, and PDF/CSV exports.
- Gemini API and Groq API integration.
- Free/public data sources where permitted, with graceful fallbacks.

Explicitly excluded:

- Authentication, user profiles and multi-tenancy.
- Persistent report history or historical snapshots in your own database.
- Product catalog administration.
- Subscription and billing systems.
- A claim that every global sales metric is available for free.

Important architectural clarification: you can use Next.js, Tailwind CSS v4, Prisma and PostgreSQL as requested, while still avoiding database persistence in Stage 1. The database infrastructure and Prisma schema can be prepared, but the research flow must work without writing research data to PostgreSQL. If zero database setup is the priority, defer Prisma/PostgreSQL integration to Stage 2.

## 2. Data-source strategy: what can we actually retrieve?

This is the highest-risk part of the project. The application should use a capability-based source registry so unsupported metrics are reported as unavailable rather than fabricated.

Free-access feasibility below refers to public access or a limited free tier, not guaranteed unlimited commercial use.

| Source                                                                                         | Best use                                                                    | Implementation decision                                                          |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [Gemini API with Google Search grounding](https://ai.google.dev/gemini-api/docs/google-search) | Discover current product pages, specifications, news and review sources     | Primary web-research assistant when the selected model supports grounding        |
| [Google Trends](https://trends.google.com/trends/)                                             | Search interest and related queries                                         | CSV import initially; apply for the official API alpha if eligible               |
| [Google Ads Keyword Planner](https://ads.google.com/home/tools/keyword-planner/)               | Estimated keyword demand                                                    | Manual export in Stage 1; API integration later if access is available           |
| [YouTube Data API](https://developers.google.com/youtube/v3)                                   | Public video metadata, view counts, likes where exposed, and search results | Useful for product-review coverage; not a complete sentiment or sales dataset    |
| [Reddit Data API](https://www.reddit.com/dev/api/)                                             | Community discussions, questions and product complaints                     | Optional, subject to OAuth, rate limits, access and developer terms              |
| [UN Comtrade](https://comtradeapi.un.org/)                                                     | Country-level imports and exports by product code                           | Market-context indicator for appropriate physical goods                          |
| [World Bank API](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392)             | Population, income and macroeconomic comparisons                            | Country context, not product sales                                               |
| [Wikimedia Pageviews API](https://doc.wikimedia.org/api-portal/)                               | Attention trends for topics with relevant Wikipedia pages                   | Supplementary interest signal only                                               |
| [Open Food Facts API](https://openfoodfacts.github.io/openfoodfacts-server/api/)               | Food-product ingredients, labels and catalog information                    | Optional category-specific data source                                           |
| [eBay Browse API](https://developer.ebay.com/api-docs/buy/browse/overview.html)                | Product listings and offer prices                                           | Optional marketplace integration; application access and quotas must be verified |

Google's Trends API is currently documented as an alpha for selected testers, so don't make it a hard dependency.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

Google for Developers

+1

&#x20;Gemini grounding and Groq also have model-specific capabilities and limits, which should be checked at runtime or configured centrally.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://ai.google.dev\&sz=32)

Google AI for Developers

+2



### Data coverage matrix

The UI should show users exactly which metrics are available for their chosen category.

| Metric               | Typical availability                         | Display rule                                             |
| -------------------- | -------------------------------------------- | -------------------------------------------------------- |
| Specifications       | Often available from official product pages  | Record source and model variant                          |
| Retail price         | Sometimes available from listings            | Include currency, market and observed date               |
| Expert review scores | Depends on review publications               | Attribute each score to its publisher                    |
| Customer ratings     | Depends on marketplace access                | Include platform, sample size and date                   |
| Sales rank           | Some marketplaces expose rankings            | Never equate rank directly with unit sales               |
| Actual unit sales    | Rarely public across all sellers             | Show only when a credible source supplies it             |
| Search interest      | Available for supported terms and locations  | Distinguish relative index from absolute volume          |
| Social hashtags      | Platform-dependent                           | Include platform and measurement window                  |
| Sentiment            | Can be estimated from accessible review text | Label as an AI-derived estimate and disclose sample size |
| Market size          | Often available as third-party estimates     | Record publisher, year and methodology                   |
| Future demand        | Forecast, not observed fact                  | Present scenarios, assumptions and uncertainty           |

A universal product researcher cannot promise all these metrics for every category. A smartphone report may have extensive technical specifications, while a niche industrial product may have almost no public consumer ratings. Both should still produce a report with transparent coverage.

## 3. End-to-end research pipeline

Every report should follow a controlled pipeline. The LLM must never invent the product list, sources or numerical comparisons without evidence.

\#chatgpt-mermaid-\_r_16v\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(237, 237, 237);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_16v\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_16v\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_16v\_ .error-icon{fill:rgb(48, 48, 48);}#chatgpt-mermaid-\_r_16v\_ .error-text{fill:rgb(237, 237, 237);stroke:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_16v\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_16v\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_16v\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_16v\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_16v\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_16v\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_16v\_ .marker{fill:rgb(175, 175, 175);stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_16v\_ .marker.cross{stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_16v\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_16v\_ p{margin:0;}#chatgpt-mermaid-\_r_16v\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_16v\_ .cluster-label text{fill:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_16v\_ .cluster-label span{color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_16v\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_16v\_ .label text,#chatgpt-mermaid-\_r_16v\_ span{fill:rgb(237, 237, 237);color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_16v\_ .node rect,#chatgpt-mermaid-\_r_16v\_ .node circle,#chatgpt-mermaid-\_r_16v\_ .node ellipse,#chatgpt-mermaid-\_r_16v\_ .node polygon,#chatgpt-mermaid-\_r_16v\_ .node path{fill:rgb(9, 23, 44);stroke:rgb(31, 78, 148);stroke-width:1px;}#chatgpt-mermaid-\_r_16v\_ .rough-node .label text,#chatgpt-mermaid-\_r_16v\_ .node .label text,#chatgpt-mermaid-\_r_16v\_ .image-shape .label,#chatgpt-mermaid-\_r_16v\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_16v\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_16v\_ .rough-node .label,#chatgpt-mermaid-\_r_16v\_ .node .label,#chatgpt-mermaid-\_r_16v\_ .image-shape .label,#chatgpt-mermaid-\_r_16v\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_16v\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_16v\_ .root .anchor path{fill:rgb(175, 175, 175)!important;stroke-width:0;stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_16v\_ .arrowheadPath{fill:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_16v\_ .edgePath .path{stroke:rgb(175, 175, 175);stroke-width:1px;}#chatgpt-mermaid-\_r_16v\_ .flowchart-link{stroke:rgb(175, 175, 175);fill:none;}#chatgpt-mermaid-\_r_16v\_ .edgeLabel{background-color:rgb(0, 0, 0);text-align:center;}#chatgpt-mermaid-\_r_16v\_ .edgeLabel p{background-color:rgb(0, 0, 0);}#chatgpt-mermaid-\_r_16v\_ .edgeLabel rect{opacity:0.5;background-color:rgb(0, 0, 0);fill:rgb(0, 0, 0);}#chatgpt-mermaid-\_r_16v\_ .labelBkg{background-color:rgba(0, 0, 0, 0.5);}#chatgpt-mermaid-\_r_16v\_ .cluster rect{fill:rgb(48, 48, 48);stroke:rgba(255, 255, 255, 0.15);stroke-width:1px;}#chatgpt-mermaid-\_r_16v\_ .cluster text{fill:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_16v\_ .cluster span{color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_16v\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(48, 48, 48);border:1px solid rgba(255, 255, 255, 0.15);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_16v\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_16v\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_16v\_ .icon-shape,#chatgpt-mermaid-\_r_16v\_ .image-shape{background-color:rgb(0, 0, 0);text-align:center;}#chatgpt-mermaid-\_r_16v\_ .icon-shape p,#chatgpt-mermaid-\_r_16v\_ .image-shape p{background-color:rgb(0, 0, 0);padding:2px;}#chatgpt-mermaid-\_r_16v\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_16v\_ .image-shape .label rect{opacity:0.5;background-color:rgb(0, 0, 0);fill:rgb(0, 0, 0);}#chatgpt-mermaid-\_r_16v\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_16v\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_16v\_ .node .neo-node{stroke:rgb(31, 78, 148);}#chatgpt-mermaid-\_r_16v\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_16v\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_16v\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_16v\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_16v\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_16v\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_16v\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_16v\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_16v\_ [data-look="neo"].node .neo-line path{stroke:rgb(31, 78, 148);filter:none;}#chatgpt-mermaid-\_r_16v\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_16v\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_16v\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_16v\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_16v\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_16v\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_16v\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_16v\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(153, 206, 255);}#chatgpt-mermaid-\_r_16v\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(153, 206, 255);}#chatgpt-mermaid-\_r_16v\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_16v\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_16v\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(0, 14, 26);stroke:rgb(26, 62, 95);stroke-width:1px;}#chatgpt-mermaid-\_r_16v\_ .node rect,#chatgpt-mermaid-\_r_16v\_ .node circle,#chatgpt-mermaid-\_r_16v\_ .node ellipse,#chatgpt-mermaid-\_r_16v\_ .node polygon,#chatgpt-mermaid-\_r_16v\_ .node path{fill:rgb(0, 40, 77);stroke:rgba(255, 255, 255, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_16v\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_16v\_ .node.mermaid-decision .label-container{fill:rgb(0, 14, 26);stroke:rgb(26, 62, 95);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_16v\_ .edgePaths .flowchart-link{stroke:rgb(175, 175, 175);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_16v\_ .marker{fill:rgb(175, 175, 175);stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_16v\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}User enters research queryValidate and normalizesettingsGemini: research plan andsearch queriesCollect source evidenceNormalize and deduplicatesourcesExtract product candidatesVerify products and modelvariantsCollect comparable metricsGroq: classify and structureevidenceValidate claims and calculatemetricsRank products using selectedcriteriaGemini: synthesize reportand explanationsRender charts, tables andcitationsCSV and PDF export

### Pipeline rules

1. Query interpretation: convert the user's request into a structured research plan. For example, “best smartphone in 2026” becomes a global smartphone comparison with a defined date range, evidence requirements and ranking methodology.
2. Source discovery: find official product specifications, reputable testing publications, retail listings and available market reports.
3. Candidate generation: collect more than ten candidates—perhaps 20–30—before filtering down to the requested count.
4. Entity resolution: distinguish exact model names, generations, storage variants, regional variants and discontinued models.
5. Evidence extraction: store each fact with its source URL, publication date, retrieval time, geography, confidence and metric definition.
6. Metric normalization: normalize currencies and units where appropriate, but preserve the original values.
7. Scoring: use deterministic TypeScript functions for weights, rankings, price comparisons and calculated metrics.
8. Synthesis: use Gemini to explain the evidence, trade-offs, market context and future scenarios.
9. Quality gates: reject unsupported numerical claims, flag missing evidence and prevent contradictory facts from being silently combined.
10. Rendering and export: build the report from validated structured data, not from arbitrary HTML returned by an LLM.

### Example: "best smartphone in 2026"

The system should ask what “best” means—or provide a transparent default with several award categories:

- Best overall
- Best camera
- Best battery life
- Best value for money
- Best gaming performance
- Best compact phone
- Best premium phone
- Best budget phone

It should distinguish phones released in 2026 from phones available in 2026. A model released in a prior year may still be one of the best phones to buy in 2026.

The default overall winner should be based on an explicit scorecard and current evidence, not simply whichever phone appears most often in search results.

## 4. One-page application design

The main page should remain the entire research workspace. Avoid routing users through a multi-step wizard unless they explicitly open advanced settings.

## ProductScope

Global product research and comparison

Research workspace

Research query

Best smartphones in 2026

Category

Electronics

Product niche

Smartphones

Market

Worldwide

Products to compare

10 products

Research date range

From

Jan 1, 2026

To

Oct 11, 2026

Research coverage

Specifications

Sales indicators

Reviews & ratings

Search trends

Social signals

Price comparison

Advanced options

Ranking objective, scoring weights, source selection, minimum evidence, review recency, country comparison and missing-data rules.

Generate comprehensive report

Estimated research time and available source coverage should be shown before starting.

Illustrative interface layout. The date values are an example of a user selection, not collected data.

### Advanced settings

| Setting           | Default                              | Options                                                                            |
| ----------------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| Ranking objective | Best overall                         | Value, performance, popularity, sales, customer satisfaction, business opportunity |
| Product count     | 10                                   | 5, 10, 15, 20                                                                      |
| Market scope      | Worldwide                            | Global, one country, multiple countries                                            |
| Research period   | Last 12 months where meaningful      | Custom dates, current year, previous year                                          |
| Source quality    | Prefer primary and reputable sources | Official, expert reviews, marketplaces, social                                     |
| Minimum evidence  | Moderate                             | Relaxed, balanced, strict                                                          |
| Missing data      | Mark unavailable                     | Exclude from score, penalize low coverage, show separately                         |
| Sorting           | Overall score                        | Price, rating, sales rank, trend growth, evidence confidence                       |
| Output            | Comprehensive report                 | Executive summary, technical report, sales pitch, market opportunity analysis      |

The product count should be independent of the maximum number of candidates collected. Sorting should also be separate from the primary score: sorting by price must not silently recalculate the overall winner.

## 5. Technical architecture

Use a modular monolith. There is no need for microservices, a separate Python analytics backend, or an elaborate distributed system for the first version.

### Frontend

Next.js App Router + React + TypeScript + Tailwind CSS v4

Single-page research form, live progress, report sections, charts, comparison tables and export controls.

### Backend

Next.js Route Handlers + Zod

Request validation, provider orchestration, data-source adapters, evidence normalization, ranking, export generation and safe error handling.

### AI layer

Gemini SDK + Groq SDK

A provider abstraction with configurable models, structured outputs, timeouts, retries, token budgets and fallback behavior.

### Research layer

Source adapters + normalized evidence contracts

Each adapter returns typed records with provenance. A source that cannot supply a metric returns an explicit unavailable status.

### Analytics and exports

Pure TypeScript scoring + Recharts + PDF and CSV generation

All numeric transformations are deterministic. Exports are produced from the same validated report model used by the UI.

### Future persistence

Prisma + PostgreSQL

Schema and integration plan prepared for Stage 2; no report or product history writes in Stage 1.

### Suggested project structure

```
src/
  app/
    page.tsx
    api/
      research/
        route.ts
      research/
        [jobId]/
          route.ts
      export/
        csv/route.ts
        pdf/route.ts
  components/
    research/
      ResearchForm.tsx
      AdvancedSettings.tsx
      ResearchProgress.tsx
    report/
      ExecutiveSummary.tsx
      ProductRanking.tsx
      ComparisonTable.tsx
      MarketInsights.tsx
      TrendCharts.tsx
      EvidencePanel.tsx
      ExportToolbar.tsx
  lib/
    ai/
      providers/
        gemini.ts
        groq.ts
      orchestrator.ts
      schemas.ts
      prompts/
    sources/
      registry.ts
      google-grounding.ts
      youtube.ts
      trends-import.ts
      keyword-import.ts
      marketplace.ts
      world-bank.ts
      un-comtrade.ts
    research/
      pipeline.ts
      product-resolution.ts
      evidence-validation.ts
      ranking.ts
      metrics.ts
    exports/
      csv.ts
      pdf.ts
    validation/
      request.ts
      report.ts
    config/
      env.ts
prisma/
  schema.prisma
tests/
  unit/
  integration/
  e2e/
```

The exact adapter names may change based on source availability. Keep source-specific logic out of the UI and the AI prompts.

### Database decision

Since you explicitly want no database storage in Stage 1:

- Do not require PostgreSQL to start the application.
- Do not persist searches, reports, review content or research snapshots.
- Keep the current report in client memory while the page remains open.
- Generate exports directly from the in-memory validated report.
- Use Prisma and PostgreSQL only when you add saved reports, historical trend snapshots, accounts or background jobs.

If you choose to initialize Prisma now, its configuration and schema must not make Stage 1 depend on successful database connections.

### Long-running research jobs

A report that queries many sources may exceed a normal HTTP request's execution time. Design the API for progress updates from the beginning:

1. `POST /api/research` validates the request and creates an ephemeral job.
2. The server returns a job ID and a short-lived access token.
3. `GET /api/research/[jobId]` returns current progress and, when complete, the report.
4. The client polls at a controlled interval.
5. Job state lives in process memory in the local MVP, with a clear expiry and concurrency limit.

This is appropriate for development and a single-process demo. It is not reliable across multiple serverless instances or restarts. Production deployment should move jobs to a shared store and background worker, even if report history remains disabled.

## 6. Sprint plan and task breakdown

I recommend six two-to-four-day engineering sprints for an experienced developer, followed by integration hardening. The schedule assumes one developer, no paid research-data subscription, and some limitations in source access. Actual duration depends on how much live web evidence can be retrieved reliably.

## Sprint 1 — Foundation and research contract

Days 1–3 · Technical foundation

Tasks

1. ✅ Initialize Next.js App Router, TypeScript, Tailwind CSS v4, ESLint and formatting.
2. ✅ Install Zod, charting, CSV and PDF dependencies.
3. ✅ Create environment validation for Gemini, Groq, optional source credentials and server configuration.
4. ✅ Define research request, product candidate, source evidence, metric observation, comparison score and final report terminal types.
5. ✅ Create a source registry with capability declarations and explicit unsupported-data responses.
6. ✅ Prepare the optional Prisma/PostgreSQL schema without making the application depend on a database.
7. ✅ Implement the main responsive research form and report layout using fixture data.
8. ✅ Perform UX Audit and redesign to a high-end terminal dashboard (CSS Grid, typography, hierarchy).

Acceptance criteria

- Application starts without PostgreSQL.
- The research form validates settings and handles invalid requests.
- Every evidence record has provenance fields.
- Report components render entirely from a typed report object.

## Sprint 2 — Gemini and Groq orchestration

Days 4–6 · AI foundation

Tasks

1. ✅ Implement provider interfaces and adapters for Gemini and Groq.
2. ✅ Create a query-planning prompt that returns structured categories, product candidates, search queries and required metrics.
3. ✅ Implement structured-output schemas and validate every AI response with Zod.
4. ✅ Configure Gemini for source-grounded research where available, and Groq for extraction, clustering and structured classification.
5. ✅ Implement retry limits, request timeouts, rate-limit handling, token budgets and provider-specific error messages.
6. ✅ Separate research planning, extraction, ranking and report synthesis prompts.
7. ✅ Build a mock provider so the entire application can be tested without consuming API quota.

Acceptance criteria

- No invalid AI output reaches the report renderer.
- API keys remain server-side.
- The application degrades gracefully when one provider fails.
- AI-generated numbers cannot be accepted as verified observations without supporting evidence.

## Sprint 3 — Data-source adapters

Days 7–10 · Research engine

Tasks

1. ✅ Implement web discovery and source extraction using supported Gemini grounding or an explicitly permitted search provider.
2. ✅ Extract official product specifications, review findings, prices, ratings and sales indicators when present.
3. ✅ Implement YouTube metadata collection with documented API quotas.
4. ✅ Implement manual CSV import for Google Trends and Keyword Planner data.
5. ✅ Add World Bank and UN Comtrade adapters for relevant country-level market context.
6. ✅ Add optional Reddit integration only after validating credentials and terms of access.
7. ✅ Normalize URLs, dates, currency, country codes, product identifiers and duplicate source records.
8. ✅ Build a data-coverage matrix showing available, estimated, unavailable and conflicting metrics.

Acceptance criteria

- Each source can fail independently.
- Every extracted fact has a source or is marked unverified.
- No unsupported sales figures are inferred from product popularity.
- Empty or inaccessible sources are displayed as limitations, not fabricated results.

## Sprint 4 — Comparison and ranking engine

Days 11–13 · Core analytics

Tasks

1. ✅ Resolve exact products, model generations and regional variants.
2. ✅ Define metric schemas by category rather than using one fixed specification schema for everything.
3. ✅ Implement scoring weights, normalization, missing-data handling and tie-breaking in deterministic TypeScript.
4. ✅ Implement independent sorting by price, ratings, sales indicators, momentum and overall score.
5. ✅ Implement global versus country-specific comparisons, with currency and date normalization.
6. ✅ Implement evidence quality and coverage scoring.
7. ✅ Build automated consistency checks for contradictory specifications and out-of-date observations.

Acceptance criteria

- The same input data always produces the same scores.
- Missing data does not silently become zero.
- Rankings can be explained by their contributing metrics.
- Products with incomparable evidence are not presented as directly equivalent without qualification.

## Sprint 5 — Report generation and exports

Days 14–16 · User-facing research

Tasks

1. ✅ Implement the executive summary, methodology, top-ten list and product detail sections.
2. ✅ Build interactive charts for prices, ratings, specification comparisons, market signals and historical search interest where available.
3. ✅ Build a sortable product comparison table with source links and missing-data indicators.
4. ✅ Implement citations, footnotes, publication dates and source-quality labels.
5. ✅ Implement CSV export for product metrics, source evidence and trend observations as separate files or clearly defined datasets.
6. ✅ Implement a polished PDF report with title page, methodology, charts, product profiles, comparisons, references and limitations.
7. ✅ Support an optional business-pitch report mode with customer segments, differentiation and substantiated claims.

Acceptance criteria

- The screen and exported report use the same validated data.
- CSV values are machine-readable and properly escaped.
- PDF charts, tables, citations and long product names render correctly.
- Exports clearly disclose estimates and unavailable metrics.

## Sprint 6 — End-to-end integration and hardening

Days 17–20 · MVP readiness

Tasks

1. Connect the form, research job, data collection, ranking engine, report rendering and export pipeline.
2. Implement progress states for planning, discovery, extraction, validation, ranking and report generation.
3. Test partial failures, empty results, rate limits, malformed model outputs and provider outages.
4. Implement request validation, bounded concurrency, timeouts and ephemeral job cleanup.
5. Protect against prompt injection from retrieved web pages, unsafe URLs, SSRF and malicious document content.
6. Test mobile responsiveness, keyboard navigation, accessibility, performance and PDF/CSV exports.
7. Run end-to-end tests for smartphone, laptop, appliance and a category with sparse data.
8. Deploy the single-page MVP and verify production environment variables, request limits and observability.

Acceptance criteria

- A full research request completes from the UI through to a downloadable report.
- Partial source failures do not destroy the whole report.
- No API secrets or research content are exposed in browser logs.
- The system communicates source coverage and uncertainty before the user relies on its recommendations.

## 7. Research report specification

Every completed report should follow a consistent structure, regardless of product category.

### 01

Executive summary

Best overall, category winners, key findings and important caveats.

### 02

Research methodology

Query, market, date range, sources, ranking criteria and data-coverage score.

### 03

Global market overview

Available market-size estimates, search-interest trends, regional differences and seasonality.

### 04

Top products ranking

Rank, model, overall score, price, ratings, sales indicators, confidence and source links.

### 05

Individual product profiles

Specifications, strengths, weaknesses, expert tests, customer feedback and best-fit segments.

### 06

Side-by-side comparison

Sortable specifications and commercial metrics with clear units and unavailable values.

### 07

Search and social insights

Related searches, keyword estimates, hashtags, video engagement and topic momentum where supported.

### 08

Business opportunity analysis

Positioning, customer pain points, competitor gaps, pricing hypotheses and product differentiation.

### 09

Future scenarios

Upside, baseline and downside scenarios, explicit assumptions, risks and indicators to monitor.

### 10

References and data appendix

Source URLs, dates, definitions, raw observations and confidence limitations.

## 8. Charts and export requirements

Use Recharts for interactive charts and generate static chart images or vector graphics for PDF export.

| Visualization                    | Purpose                                                                             |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| Horizontal ranking bars          | Compare overall product scores                                                      |
| Grouped bar chart                | Compare normalized specifications                                                   |
| Price-versus-rating scatter plot | Identify value-for-money candidates                                                 |
| Search interest line chart       | Show changes over the selected date range                                           |
| Country comparison heatmap       | Compare regional demand indicators                                                  |
| Review sentiment chart           | Show positive, neutral and negative review shares when review samples are available |
| Price distribution chart         | Compare observed prices across sellers                                              |
| Evidence coverage chart          | Show which products have reliable data for each metric                              |

Do not create a search-interest chart when there is only a single observation. Do not plot estimated sales alongside actual sales without distinguishing them visually.

### Export implementation

- CSV: produce `products.csv`, `comparison_metrics.csv`, `search_trends.csv` and `sources.csv`, including source dates and evidence types.
- PDF: include the full report, visualizations, comparison tables, methodology, citations and limitations.
- Business pitch mode: optionally export a concise, presentation-oriented report that separates substantiated product claims from recommendations and hypotheses.

For PDF generation, `@react-pdf/renderer` or a server-side HTML-to-PDF solution can work. Choose one after a short proof of concept for complex tables, chart rendering and page breaks. CSV export should use a dedicated serializer, not hand-built comma-separated strings.

## 9. Critical quality and security requirements

This application will retrieve untrusted content and call external services. Include these protections in the MVP rather than adding them after deployment.

- Prompt-injection resistance: retrieved web pages are evidence, never instructions to the AI.
- Citation integrity: every factual claim should reference an evidence record actually collected by the system.
- Numeric validation: no sales volume, review count, rating or search volume may be invented to fill a gap.
- Source independence: multiple pages copying the same original article should not count as independent corroboration.
- Freshness: distinguish publication date, retrieval date and period measured.
- SSRF protection: restrict outbound URL fetching to permitted public HTTP(S) destinations, block private and link-local IP ranges, and validate redirects.
- API protection: keep credentials server-side; enforce request size limits, timeouts, rate limits and bounded concurrency.
- Resource limits: limit candidate counts, search calls, input sizes and report output size.
- Export safety: escape CSV formula-leading values and sanitize generated document content.
- Privacy: avoid retaining research prompts or report contents in logs beyond what is necessary for operational diagnostics.

For a no-login public application, consider basic IP-based throttling, bot protection and a strict daily API budget. Otherwise, anonymous users could exhaust your free quotas.

## 10. Core testing strategy

Build automated tests around the entire research flow, not only around individual React components.

| Test suite      | Required scenarios                                                                     |
| --------------- | -------------------------------------------------------------------------------------- |
| Unit            | Scoring, normalization, currency conversions, missing values, tie-breaking             |
| AI contract     | Invalid JSON, missing fields, hallucinated product records, oversized outputs          |
| Source adapters | Timeout, 403, 429, empty responses, stale results, duplicate records                   |
| Integration     | Full research pipeline with mocked external sources                                    |
| E2E             | Query submission, settings changes, progress display, results, sorting and exports     |
| Data quality    | Citation coverage, inconsistent model variants, conflicting prices, duplicate sources  |
| Security        | Prompt injection, malicious URLs, SSRF attempts, CSV formula injection, leaked secrets |
| Performance     | Concurrent research requests, slow sources, cancellation and memory cleanup            |
| Export          | Large tables, special characters, missing metrics, charts, long URLs and page breaks   |

For deterministic E2E tests, use recorded fixtures and mock AI responses. Run a smaller number of live API smoke tests separately, because live source results and model responses can change.

## 11. Definition of done

Stage 1 is ready when all of the following are true:

- A user can enter a natural-language query and configure category, niche, market, dates and product count.
- Advanced sorting and ranking criteria affect results predictably.
- The research engine retrieves real evidence from the sources available for the query.
- Each product contains attributable facts, comparisons, strengths, weaknesses and data-coverage indicators.
- Search and social insights are shown only when supported by collected data.
- Charts, tables and explanations render from validated report data.
- PDF and CSV exports work without a database.
- Missing data, stale evidence and source conflicts are visible.
- The application works when PostgreSQL is unavailable.
- API usage is bounded, secrets are protected, and partial failures are handled.
- The test suite passes, including an end-to-end run with mocked source data.

## 12. Final technology decisions

Use now

Next.js App Router, TypeScript, Tailwind CSS v4, Zod, Gemini API, Groq API, Recharts, CSV/PDF export utilities and source adapters.

Prepare for Stage 2

Prisma and PostgreSQL for saved reports, source snapshots, research history, shared background jobs and accounts.

Do not assume

Unlimited Gemini/Groq access, a generally available Google Trends API, complete worldwide product sales, unrestricted marketplace scraping or free access to every review dataset.

My recommendation is to prioritize the research pipeline, evidence quality and comparison report over sophisticated AI agents or extensive dashboard customization. The hardest part is not generating a long report; it is reliably gathering comparable evidence from different sources and explaining what that evidence can—and cannot—prove.

Once this core pipeline works for smartphones and several very different categories, you will have a credible foundation for a global product research platform rather than a generic AI report generator.