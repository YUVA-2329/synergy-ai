export const BRAND = {
  name: "SYNERGY AI",
  tagline: "BUILD SMARTER. LAUNCH STRONGER.",
  description:
    "AI-powered startup validation, market intelligence, risk prediction, and investor readiness.",
} as const;

export const INTRO_SCREENS = {
  screen1: {
    initializing: "INITIALIZING",
    loading: "LOADING STARTUP INTELLIGENCE ENGINE",
  },
  screen3: {
    metrics: [
      "MARKET ANALYSIS",
      "COMPETITOR INTELLIGENCE",
      "RISK ENGINE",
      "INVESTOR READINESS",
    ],
  },
} as const;

export const NAV_LINKS = [
  { label: "Analyzer", href: "#analyzer" },
  { label: "Market", href: "#market" },
  { label: "Risk", href: "#risk" },
  { label: "Competitors", href: "#competitors" },
  { label: "Finance", href: "#finance" },
  { label: "Investors", href: "#investors" },
  { label: "Pricing", href: "#pricing" },
] as const;

export const HUD_METRICS = [
  { label: "TAM Coverage", value: "94.2%", delta: "+12.4" },
  { label: "Risk Score", value: "0.23", delta: "-0.08" },
  { label: "Runway", value: "18.4mo", delta: "+3.2" },
  { label: "Investor Match", value: "87%", delta: "+21" },
] as const;

export const GLOBE_NODES = [
  { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  { lat: 52.52, lng: 13.405, label: "Berlin" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  { lat: 19.076, lng: 72.8777, label: "Mumbai" },
  { lat: 48.8566, lng: 2.3522, label: "Paris" },
  { lat: 55.7558, lng: 37.6173, label: "Moscow" },
] as const;

export const SECTIONS = {
  analyzer: {
    id: "analyzer",
    eyebrow: "01 — STARTUP ANALYZER",
    title: "Validate your idea in minutes, not months",
    description:
      "Upload your pitch deck, business model, and market thesis. Synergy AI runs a full-stack validation across product-market fit signals, TAM/SAM/SOM modeling, and execution readiness scoring.",
    features: [
      "Automated PMF signal extraction from 40+ data sources",
      "Idea-to-MVP roadmap with prioritized milestones",
      "Founder-market fit analysis with gap recommendations",
      "Real-time validation score with actionable breakdown",
    ],
    stats: [
      { value: "4.2min", label: "Avg. analysis time" },
      { value: "96%", label: "Accuracy vs. expert review" },
      { value: "12K+", label: "Startups analyzed" },
    ],
  },
  market: {
    id: "market",
    eyebrow: "02 — MARKET INTELLIGENCE",
    title: "See the market before it moves",
    description:
      "Live market maps, trend velocity tracking, and demand forecasting powered by proprietary intelligence layers. Know where to play and when to strike.",
    features: [
      "Real-time TAM/SAM/SOM with confidence intervals",
      "Trend velocity index across 200+ verticals",
      "Geographic demand heatmaps with expansion scoring",
      "Regulatory and macro signal integration",
    ],
  },
  risk: {
    id: "risk",
    eyebrow: "03 — RISK ENGINE",
    title: "Predict failure before it happens",
    description:
      "Multi-dimensional risk modeling across market, team, financial, and operational vectors. Surface hidden vulnerabilities with mitigation playbooks.",
    features: [
      "Monte Carlo runway simulation with scenario trees",
      "Team composition risk and key-person dependency mapping",
      "Market timing and competitive moat erosion alerts",
      "Automated mitigation playbooks with priority ranking",
    ],
  },
  competitors: {
    id: "competitors",
    eyebrow: "04 — COMPETITOR INTELLIGENCE",
    title: "Outmaneuver before they outpace you",
    description:
      "Deep competitive landscape mapping with funding tracking, feature velocity analysis, and strategic positioning recommendations.",
    features: [
      "Live competitor funding and hiring signal tracking",
      "Feature parity matrix with differentiation gaps",
      "Pricing strategy benchmarking across segments",
      "Threat level scoring with early warning system",
    ],
  },
  finance: {
    id: "finance",
    eyebrow: "05 — FINANCIAL FORECASTING",
    title: "Model the future with precision",
    description:
      "AI-generated financial models with unit economics optimization, burn rate forecasting, and scenario planning for every growth stage.",
    features: [
      "Dynamic 5-year projections with sensitivity analysis",
      "Unit economics optimizer with CAC/LTV modeling",
      "Burn rate forecasting with hiring impact simulation",
      "Fundraising timeline recommendations",
    ],
  },
  investors: {
    id: "investors",
    eyebrow: "06 — INVESTOR READINESS",
    title: "Walk into the room fully prepared",
    description:
      "Investor matching, pitch deck scoring, due diligence prep, and term sheet analysis. Transform your fundraise from guesswork into strategy.",
    features: [
      "AI-matched investor list with thesis alignment scoring",
      "Pitch deck analysis with slide-by-slide recommendations",
      "Due diligence checklist auto-generated from your data room",
      "Term sheet comparison with market benchmark analysis",
    ],
  },
} as const;

export const PRICING_TIERS = [
  {
    name: "Launch",
    price: "$0",
    period: "forever",
    description: "For founders validating their first idea",
    features: [
      "3 startup analyses per month",
      "Basic market intelligence",
      "Risk score overview",
      "Community support",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Scale",
    price: "$149",
    period: "/month",
    description: "For teams preparing to raise and grow",
    features: [
      "Unlimited startup analyses",
      "Full market intelligence suite",
      "Advanced risk engine with scenarios",
      "Competitor tracking for 10 companies",
      "Investor readiness toolkit",
      "Priority support",
    ],
    cta: "Start Analysis",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For VCs, accelerators, and corporate innovation",
    features: [
      "Portfolio-wide intelligence dashboard",
      "Custom data integrations",
      "White-label reports",
      "Dedicated success manager",
      "API access",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "How does Synergy AI analyze my startup?",
    answer:
      "Synergy AI ingests your pitch materials, business model, and market context, then cross-references against our intelligence engine spanning 40+ data sources, 200+ market verticals, and millions of startup outcomes to generate a comprehensive validation report.",
  },
  {
    question: "How accurate is the risk prediction engine?",
    answer:
      "Our risk engine achieves 96% correlation with expert venture analyst assessments, validated against a dataset of 12,000+ startup outcomes. It uses Monte Carlo simulation and multi-vector modeling across market, team, financial, and operational dimensions.",
  },
  {
    question: "Can I use Synergy AI before I have a product?",
    answer:
      "Absolutely. Synergy AI is designed for pre-product validation. Upload your idea thesis, target market description, and competitive landscape — the platform generates PMF signals, market sizing, and execution roadmaps from concept stage.",
  },
  {
    question: "How does investor matching work?",
    answer:
      "Our investor readiness module analyzes your startup profile against 3,000+ active investors' thesis patterns, stage preferences, and portfolio composition. You receive a ranked match list with alignment scores and outreach strategy recommendations.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All data is encrypted at rest and in transit with AES-256. We never train on your proprietary information. Enterprise plans include SOC 2 compliance, custom data retention policies, and on-premise deployment options.",
  },
  {
    question: "What integrations are available?",
    answer:
      "Scale and Enterprise plans support integrations with Google Drive, Notion, Slack, Stripe, QuickBooks, and major CRM platforms. Our API allows custom data pipeline connections for portfolio-wide intelligence.",
  },
] as const;

export const COLORS = {
  neonCyan: "#00f0ff",
  neonBlue: "#0066ff",
  neonPurple: "#8b5cf6",
  neonPink: "#ff006e",
  glass: "rgba(255, 255, 255, 0.03)",
  glassBorder: "rgba(255, 255, 255, 0.08)",
} as const;
