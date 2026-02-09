import type { Broker } from "./data"

/* ── Extended broker detail types ──────────────────────────────── */

export interface ContactInfo {
  office: string
  mobile: string
  email: string
  linkedin: string
  location: string
  timezone: string
  bestTimeToCall: string
  avoid: string
}

export interface TimelineEntry {
  id: string
  type: "phone" | "email"
  date: string
  label: string
  duration?: string
  messageCount?: number
  subject?: string
  summary: string
  intelCaptured?: string
  actionTaken?: string
}

export interface BrokerProfile {
  relationshipSince: string
  totalAccountsPlaced: number
  totalPremium: string
  yoyGrowth: string
  avgDealSize: string
  lossRatio: string
}

export interface BrokerValues {
  values: string[]
  painPoints: string[]
}

export interface MarketIntel {
  intelFromBroker: string[]
  marketTrends: string[]
}

export interface ActiveSubmissionRow {
  id: string
  account: string
  stage: string
  riskStatus: "green" | "yellow" | "red"
  premium: string
  daysInPipeline: number
  nextAction: string
}

export interface BrokerDetail {
  brokerId: string
  contact: ContactInfo
  timeline: TimelineEntry[]
  profile: BrokerProfile
  values: BrokerValues
  marketIntel: MarketIntel
  activeSubmissions: ActiveSubmissionRow[]
}

/* ── Jane Mitchell ────────────────────────────────────────────── */

const janeMitchell: BrokerDetail = {
  brokerId: "b1",
  contact: {
    office: "(312) 555-1234",
    mobile: "(312) 555-5678",
    email: "jane.mitchell@marsh.com",
    linkedin: "linkedin.com/in/janemitchell",
    location: "Chicago, IL",
    timezone: "Central Time",
    bestTimeToCall: "Mornings 8-10am CT",
    avoid: "Monday mornings (team meetings)",
  },
  timeline: [
    {
      id: "t1",
      type: "phone",
      date: "Feb 6, 2026",
      label: "Phone Call",
      duration: "12 min",
      summary:
        "Discussed ABC Corporation quote status. Jane mentioned client is comparing with Travelers. She expects decision by Friday. Asked us to expedite LC survey if possible.",
      intelCaptured: "Travelers quoted $230K, we're at $245K",
      actionTaken: "Escalated LC survey priority",
    },
    {
      id: "t2",
      type: "email",
      date: "Feb 5, 2026",
      label: "Email Thread",
      messageCount: 3,
      subject: "RE: ABC Corporation - Loss runs request",
      summary:
        "Jane confirmed she's chasing client for 5-year loss runs. Hartford (prior carrier) is slow to respond.",
    },
    {
      id: "t3",
      type: "phone",
      date: "Feb 1, 2026",
      label: "Phone Call",
      duration: "8 min",
      summary:
        'Initial submission discussion for ABC Corporation. Jane described client as "long-term relationship, very price sensitive." Mentioned they\'ve been with Hartford for 10 years.',
      intelCaptured: "Client is price sensitive, Hartford incumbent",
    },
    {
      id: "t4",
      type: "email",
      date: "Jan 28, 2026",
      label: "Email Thread",
      messageCount: 5,
      subject: "New submission - ABC Corporation",
      summary:
        "Initial submission received. Jane asked for quick turnaround as client is actively shopping.",
    },
  ],
  profile: {
    relationshipSince: "March 2023",
    totalAccountsPlaced: 28,
    totalPremium: "$3.2M",
    yoyGrowth: "+18%",
    avgDealSize: "$114K",
    lossRatio: "42%",
  },
  values: {
    values: [
      "Fast quote turnaround (mentioned 4x)",
      "Proactive status updates",
      "Clear coverage explanations",
      "Flexibility on deductibles",
    ],
    painPoints: [
      "Gets frustrated when she has to chase us for status",
      "Dislikes jargon-heavy quotes",
      "Had issue in 2024 with slow LC survey (took 3 weeks)",
    ],
  },
  marketIntel: {
    intelFromBroker: [
      "Travelers is aggressive on manufacturing this quarter",
      "Clients are pushing back on $25K+ deductibles",
      "Hartford non-renewing several accounts -- opportunity for us",
      "Decision makers want coverage summaries in plain English",
    ],
    marketTrends: [
      "Travelers pricing: ~10% below us",
      "Hartford: Non-renewing MW accounts",
      "Market trend: Clients want lower deductibles despite rate pressure",
    ],
  },
  activeSubmissions: [
    {
      id: "s1",
      account: "ABC Corporation",
      stage: "Quote",
      riskStatus: "red",
      premium: "$245K",
      daysInPipeline: 12,
      nextAction: "Follow up on missing loss runs",
    },
    {
      id: "s5",
      account: "Greenleaf Hosp",
      stage: "UW Review",
      riskStatus: "green",
      premium: "$180K",
      daysInPipeline: 6,
      nextAction: "Complete UW analysis",
    },
    {
      id: "s9",
      account: "Downtown Plaza",
      stage: "Quote",
      riskStatus: "green",
      premium: "$98K",
      daysInPipeline: 9,
      nextAction: "Generate quote package",
    },
    {
      id: "s15",
      account: "Maple Grove Schools",
      stage: "Bind",
      riskStatus: "yellow",
      premium: "$340K",
      daysInPipeline: 18,
      nextAction: "Pending sign from school",
    },
  ],
}

/* ── Tom Bradley ──────────────────────────────────────────────── */

const tomBradley: BrokerDetail = {
  brokerId: "b2",
  contact: {
    office: "(212) 555-9876",
    mobile: "(212) 555-4321",
    email: "tom.bradley@aon.com",
    linkedin: "linkedin.com/in/tombradley",
    location: "New York, NY",
    timezone: "Eastern Time",
    bestTimeToCall: "Afternoons 2-4pm ET",
    avoid: "Fridays (client meetings all day)",
  },
  timeline: [
    {
      id: "t5",
      type: "email",
      date: "Feb 7, 2026",
      label: "Email Thread",
      messageCount: 2,
      subject: "Pacific Retail Group - New Submission",
      summary:
        "Tom submitted Pacific Retail Group with ACORD and SOV attached. Requested expedited intake given renewal deadline.",
    },
    {
      id: "t6",
      type: "phone",
      date: "Feb 3, 2026",
      label: "Phone Call",
      duration: "15 min",
      summary:
        "Discussed Metro Logistics pricing. Tom flagged that the incumbent is coming in lower. Needs competitive quote to retain the account.",
      intelCaptured: "Incumbent renewal is ~$400K, we need to be within 5%",
    },
    {
      id: "t7",
      type: "email",
      date: "Jan 30, 2026",
      label: "Email Thread",
      messageCount: 4,
      subject: "Metro Logistics - LC Survey Findings",
      summary:
        "Shared LC survey results. No major findings. Tom confirmed client is available for follow-up questions.",
    },
  ],
  profile: {
    relationshipSince: "January 2022",
    totalAccountsPlaced: 35,
    totalPremium: "$4.8M",
    yoyGrowth: "+12%",
    avgDealSize: "$137K",
    lossRatio: "38%",
  },
  values: {
    values: [
      "Detailed written communication",
      "Transparent pricing breakdowns",
      "Quick response to emails (within 4 hours)",
      "Coverage comparison charts",
    ],
    painPoints: [
      "Dislikes phone calls without prior email context",
      "Frustrated by inconsistent SOV formatting in quotes",
      "Had a missed renewal deadline in 2024 -- very sensitive to timelines",
    ],
  },
  marketIntel: {
    intelFromBroker: [
      "Retail sector is hardening -- clients expecting 8-12% increases",
      "Aon pushing clients toward higher deductibles for savings",
      "Warehouse/logistics is competitive -- multiple carriers bidding",
      "Clients value cyber add-on options for warehouse operations",
    ],
    marketTrends: [
      "Retail property rates: +8-12% at renewal",
      "Logistics/warehouse: Highly competitive, 4-5 carriers bidding",
      "Trend: Bundled cyber coverage increasingly requested",
    ],
  },
  activeSubmissions: [
    {
      id: "s2",
      account: "Pacific Retail Group",
      stage: "Intake",
      riskStatus: "green",
      premium: "TBD",
      daysInPipeline: 1,
      nextAction: "Order ProMetrix and CLUE",
    },
    {
      id: "s6",
      account: "Metro Logistics",
      stage: "Quote",
      riskStatus: "green",
      premium: "$312K",
      daysInPipeline: 14,
      nextAction: "Finalize pricing model",
    },
    {
      id: "s8",
      account: "Summit Logistics",
      stage: "UW Review",
      riskStatus: "red",
      premium: "$185K",
      daysInPipeline: 12,
      nextAction: "UW decision on cold storage",
    },
    {
      id: "s13",
      account: "Oakwood Apts",
      stage: "Quote",
      riskStatus: "yellow",
      premium: "$210K",
      daysInPipeline: 11,
      nextAction: "Broker response awaited",
    },
  ],
}

/* ── Sarah Kim ────────────────────────────────────────────────── */

const sarahKim: BrokerDetail = {
  brokerId: "b3",
  contact: {
    office: "(415) 555-7890",
    mobile: "(415) 555-2345",
    email: "sarah.kim@wtwco.com",
    linkedin: "linkedin.com/in/sarahkim-wtw",
    location: "San Francisco, CA",
    timezone: "Pacific Time",
    bestTimeToCall: "Mid-morning 10am-12pm PT",
    avoid: "Wednesday afternoons (internal reviews)",
  },
  timeline: [
    {
      id: "t8",
      type: "phone",
      date: "Feb 4, 2026",
      label: "Phone Call",
      duration: "10 min",
      summary:
        "Sarah called to check on Johnson Mfg LC survey status. Expressed concern about the delay impacting her client relationship. Vendor reported insured not returning calls.",
      intelCaptured: "Client (Johnson) is considering self-insuring if process is too slow",
      actionTaken: "Escalated vendor to attempt direct site visit",
    },
    {
      id: "t9",
      type: "email",
      date: "Feb 2, 2026",
      label: "Email Thread",
      messageCount: 2,
      subject: "Johnson Mfg - Engineering Report ETA",
      summary:
        "Sarah asked about engineering report timeline. We confirmed it depends on LC survey completion.",
    },
    {
      id: "t10",
      type: "phone",
      date: "Jan 30, 2026",
      label: "Phone Call",
      duration: "20 min",
      summary:
        'Detailed discussion about Johnson account. Sarah provided extensive background on the client\'s operations and risk management practices. She described them as "very safety-conscious but budget-constrained."',
      intelCaptured: "Johnson has a $500K budget ceiling for property program",
    },
  ],
  profile: {
    relationshipSince: "August 2024",
    totalAccountsPlaced: 15,
    totalPremium: "$1.4M",
    yoyGrowth: "+25%",
    avgDealSize: "$93K",
    lossRatio: "51%",
  },
  values: {
    values: [
      "Email first, then phone follow-up",
      "Detailed risk narratives",
      "Transparent about timeline challenges",
      "Appreciates engineering-level detail",
    ],
    painPoints: [
      "Engineering reports are a recurring bottleneck",
      "Feels her smaller accounts get deprioritized",
      "Wants more visibility into where her submissions are in the process",
    ],
  },
  marketIntel: {
    intelFromBroker: [
      "Manufacturing clients are budget-constrained this year",
      "WTW seeing more demand for parametric coverage options",
      "Competitors offering flexible payment plans to win accounts",
      "Clients asking about ESG and sustainability disclosures",
    ],
    marketTrends: [
      "Manufacturing property: Budget pressure driving higher deductibles",
      "Parametric coverage: Growing demand, especially for weather-related risks",
      "ESG reporting requirements influencing coverage decisions",
    ],
  },
  activeSubmissions: [
    {
      id: "s3",
      account: "Johnson Mfg",
      stage: "UW Review",
      riskStatus: "yellow",
      premium: "$520K",
      daysInPipeline: 8,
      nextAction: "Awaiting Loss control survey",
    },
    {
      id: "s11",
      account: "Heritage Manufacturing",
      stage: "Intake",
      riskStatus: "green",
      premium: "TBD",
      daysInPipeline: 1,
      nextAction: "Order ProMetrix and CLUE",
    },
    {
      id: "s16",
      account: "Lakeside Office",
      stage: "Intake",
      riskStatus: "red",
      premium: "TBD",
      daysInPipeline: 5,
      nextAction: "Chase broker for financials",
    },
  ],
}

/* ── David Park ───────────────────────────────────────────────── */

const davidPark: BrokerDetail = {
  brokerId: "b4",
  contact: {
    office: "(214) 555-6543",
    mobile: "(214) 555-8765",
    email: "david.park@gallagher.com",
    linkedin: "linkedin.com/in/davidpark-gallagher",
    location: "Dallas, TX",
    timezone: "Central Time",
    bestTimeToCall: "Anytime 9am-5pm CT",
    avoid: "First Monday of month (leadership meetings)",
  },
  timeline: [
    {
      id: "t11",
      type: "phone",
      date: "Feb 6, 2026",
      label: "Phone Call",
      duration: "6 min",
      summary:
        "David confirmed Westfield Props has accepted the quote terms. Asked about binding timeline and whether we need anything else.",
      actionTaken: "Confirmed all docs are in, just need UW final sign-off",
    },
    {
      id: "t12",
      type: "email",
      date: "Feb 5, 2026",
      label: "Email Thread",
      messageCount: 2,
      subject: "RE: Westfield Props - Signed Quote",
      summary:
        "David sent the signed quote back. Attached with client signature and requested effective date confirmation.",
    },
    {
      id: "t13",
      type: "email",
      date: "Feb 1, 2026",
      label: "Email Thread",
      messageCount: 3,
      subject: "Westfield Props - Quote Delivery",
      summary:
        "Quote delivered to David. He reviewed and said pricing is in line with expectations. Client reviewing over the weekend.",
      intelCaptured: "Client benchmarked against Chubb, we're 8% lower",
    },
  ],
  profile: {
    relationshipSince: "June 2022",
    totalAccountsPlaced: 22,
    totalPremium: "$2.6M",
    yoyGrowth: "+22%",
    avgDealSize: "$118K",
    lossRatio: "35%",
  },
  values: {
    values: [
      "Quick, informal communication",
      "Responsive on Teams/chat",
      "Values speed over perfection in initial quotes",
      "Appreciates proactive updates without being asked",
    ],
    painPoints: [
      "Gets anxious about binding deadlines",
      "Frustrated when CC'd parties don't receive updates",
      "Occasionally forgets to attach financials -- gentle reminders work best",
    ],
  },
  marketIntel: {
    intelFromBroker: [
      "Commercial real estate owners shopping more aggressively this cycle",
      "Chubb is pricing 5-10% higher than last year on office portfolios",
      "Gallagher seeing increased demand for tenant improvement coverage",
      "Clients want 3-year policy options to lock in rates",
    ],
    marketTrends: [
      "CRE property: Owners actively shopping, Chubb pricing up 5-10%",
      "Tenant improvement coverage: Rising demand",
      "Multi-year policy requests increasing",
    ],
  },
  activeSubmissions: [
    {
      id: "s4",
      account: "Westfield Props",
      stage: "Bind",
      riskStatus: "yellow",
      premium: "$250K",
      daysInPipeline: 21,
      nextAction: "Obtain UW sign-off for binding",
    },
    {
      id: "s10",
      account: "Coastal Condo",
      stage: "Bind",
      riskStatus: "green",
      premium: "$156K",
      daysInPipeline: 14,
      nextAction: "Verify final payment received",
    },
    {
      id: "s14",
      account: "Precision Auto",
      stage: "UW Review",
      riskStatus: "yellow",
      premium: "$78K",
      daysInPipeline: 8,
      nextAction: "Resolve sprinkler question",
    },
  ],
}

/* ── Rachel Kim ──────────────────────────────────────────────────── */

const rachelKim: BrokerDetail = {
  brokerId: "b5",
  contact: {
    office: "(404) 555-2200",
    mobile: "(404) 555-2201",
    email: "rachel.kim@bbrown.com",
    linkedin: "linkedin.com/in/rachelkim",
    location: "Atlanta, GA",
    timezone: "Eastern Time",
    bestTimeToCall: "Late mornings 10am-12pm ET",
    avoid: "Wednesday afternoons (team syncs)",
  },
  timeline: [
    {
      id: "rk-t1",
      type: "email",
      date: "Feb 5, 2026",
      label: "Email Thread",
      messageCount: 2,
      subject: "Riverside Medical -- Incomplete SOV",
      summary: "Notified Rachel that SOV is missing square footage for Buildings C and D. She confirmed she will follow up with the hospital facilities team.",
      actionTaken: "Flagged missing data and set follow-up for Feb 9",
    },
    {
      id: "rk-t2",
      type: "phone",
      date: "Feb 3, 2026",
      label: "Phone Call",
      duration: "10 min",
      summary: "Rachel called to introduce Trinity Church submission. Explained the historic building and asked for guidance on valuation approach. We discussed replacement cost vs. functional replacement.",
      intelCaptured: "Rachel is building non-profit vertical at Brown & Brown",
    },
    {
      id: "rk-t3",
      type: "email",
      date: "Feb 2, 2026",
      label: "Email Thread",
      messageCount: 3,
      subject: "New submission -- Trinity Church",
      summary: "Initial submission for three church properties. Rachel asked about our appetite for historic structures. We confirmed interest and requested full SOV.",
    },
  ],
  profile: {
    relationshipSince: "September 2025",
    totalAccountsPlaced: 9,
    totalPremium: "$780K",
    yoyGrowth: "New",
    avgDealSize: "$87K",
    lossRatio: "38%",
  },
  values: {
    values: [
      "Clear, structured communication",
      "Prompt acknowledgment of submissions",
      "Detailed feedback on declines",
      "Guidance on improving submission quality",
    ],
    painPoints: [
      "Still learning carrier appetites -- needs more guidance than experienced brokers",
      "Has submitted incomplete SOVs on complex accounts",
      "Sensitive about being perceived as junior -- treat as a peer",
    ],
  },
  marketIntel: {
    intelFromBroker: [
      "Brown & Brown pushing into healthcare vertical this year",
      "Southeast hospital systems consolidating insurance programs",
      "Several regional non-profits shopping coverage for first time",
    ],
    marketTrends: [
      "Healthcare property: Increasing demand, complex underwriting",
      "Non-profit/religious: Underserved market with growing interest",
      "Southeast region: Active new business pipeline",
    ],
  },
  activeSubmissions: [
    {
      id: "s7",
      account: "Riverside Medical",
      stage: "Intake",
      riskStatus: "yellow",
      premium: "$520K",
      daysInPipeline: 3,
      nextAction: "Request property schedule",
    },
    {
      id: "s12",
      account: "Trinity Church",
      stage: "UW Review",
      riskStatus: "green",
      premium: "$45K",
      daysInPipeline: 6,
      nextAction: "Await UW pricing decision",
    },
  ],
}

/* ── Export map ────────────────────────────────────────────────── */

export const brokerDetailMap: Record<string, BrokerDetail> = {
  b1: janeMitchell,
  b2: tomBradley,
  b3: sarahKim,
  b4: davidPark,
  b5: rachelKim,
}
