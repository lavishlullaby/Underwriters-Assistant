export type SubmissionStage = "intake" | "uw-review" | "quote" | "bind"
export type RiskStatus = "green" | "yellow" | "red"

export interface Submission {
  id: string
  account: string
  broker: string
  brokerFirm: string
  uwAssigned: string
  stage: SubmissionStage
  daysInStage: number
  daysInPipeline: number
  nextAction: string
  riskStatus: RiskStatus
  riskFlags: string[]
  premium?: string
  tiv?: string
  locations?: number
  classOfBusiness?: string
  documents: {
    name: string
    status: "complete" | "pending" | "missing"
  }[]
  dataOrders: {
    type: string
    status: "complete" | "in-progress" | "pending" | "error"
    lastUpdated: string
  }[]
  activity: {
    date: string
    action: string
    by: string
  }[]
  aiSummary: string
  aiAnomalies: string[]
}

export interface PriorityItem {
  id: string
  type: "urgent" | "warning" | "info"
  title: string
  description: string
  action: string
  actionLabel: string
  submissionId?: string
}

export interface QueueItem {
  id: string
  fileName: string
  owner: string
  status: string
  daysInQueue: number
  blocker?: string
}

export interface Broker {
  id: string
  name: string
  firm: string
  relationshipScore: number
  activeSubmissions: number
  lastContact: string
  preferences: {
    communicationStyle: string
    ccList: string
    typicalGaps: string
  }
  history: {
    totalSubmissions: number
    winRate: number
    avgCycleTime: string
  }
  aiNote: string
}

export interface UWProfile {
  id: string
  name: string
  portfolioFocus: string
  riskAppetite: string
  preferredFormat: string
  presentationStyle: string
  petPeeves: string[]
  currentWorkload: number
  maxWorkload: number
}

/* ── Priorities (Top 6) ──────────────────────────────────────────── */

export const priorities: PriorityItem[] = [
  {
    id: "p1",
    type: "urgent",
    title: "Quote for ABC Corporation expires Friday",
    description: "Subjectivity still open -- awaiting updated loss runs from broker.",
    action: "/submissions/s1",
    actionLabel: "Call Broker",
    submissionId: "s1",
  },
  {
    id: "p2",
    type: "warning",
    title: "LC survey stuck Day 4",
    description: "Vendor waiting on insured callback for Johnson Mfg site access.",
    action: "/queue",
    actionLabel: "Contact Info",
    submissionId: "s3",
  },
  {
    id: "p3",
    type: "info",
    title: "Compliance queue backlog this week",
    description: "Average 3-day delay observed -- flag urgent files early for priority review.",
    action: "/queue",
    actionLabel: "View Queue",
  },
  {
    id: "p4",
    type: "urgent",
    title: "Binding authority expiring for Westfield",
    description: "Needs UW sign-off by EOD Wednesday. All documents are in.",
    action: "/submissions/s4",
    actionLabel: "Escalate to UW",
    submissionId: "s4",
  },
  {
    id: "p5",
    type: "warning",
    title: "Summit Logistics -- UW needs ammonia guidance",
    description: "Cold storage facility requires specialist survey. Scheduled Feb 12.",
    action: "/submissions/s8",
    actionLabel: "Check Status",
    submissionId: "s8",
  },
  {
    id: "p6",
    type: "warning",
    title: "Maple Grove Schools -- Board meets Feb 12",
    description: "Need signature on agenda or bind delays to March.",
    action: "/submissions/s15",
    actionLabel: "Call Broker",
    submissionId: "s15",
  },
]

/* ── Submissions (16 total) ──────────────────────────────────────── */

export const submissions: Submission[] = [
  /* ── s1: ABC Corporation ── */
  {
    id: "s1",
    account: "ABC Corporation",
    broker: "Jane Mitchell",
    brokerFirm: "Marsh & McLennan",
    uwAssigned: "Robert Chen",
    stage: "quote",
    daysInStage: 3,
    daysInPipeline: 12,
    nextAction: "Follow up on missing loss runs",
    riskStatus: "red",
    riskFlags: [],
    premium: "$245,000",
    tiv: "$18.2M",
    locations: 3,
    classOfBusiness: "Manufacturing",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "pending" },
      { name: "Loss Runs (5yr)", status: "missing" },
      { name: "Property Schedule", status: "complete" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-02-05" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-02-04" },
      { type: "D&B Financial", status: "in-progress", lastUpdated: "2026-02-06" },
    ],
    activity: [
      { date: "2026-02-06", action: "D&B report ordered", by: "System" },
      { date: "2026-02-05", action: "ProMetrix data received -- 3 locations verified", by: "System" },
      { date: "2026-02-04", action: "Email sent to broker re: missing loss runs", by: "Emily R." },
      { date: "2026-02-03", action: "Quote draft generated (pending loss runs)", by: "Robert C." },
      { date: "2026-02-01", action: "Submission received and intake completed", by: "Emily R." },
    ],
    aiSummary:
      "ABC Corporation is a mid-size manufacturing company with 3 locations in the Midwest. Total insured value is $18.2M. The account has been with the carrier for 2 years with clean loss history. Current quote is competitive at $245K but cannot be finalized without 5-year loss runs from the broker.",
    aiAnomalies: [
      "Year built 1965 for main facility but ProMetrix shows 2019 renovation -- confirmed gut rehab with broker.",
      "SOV lists sprinkler protection but COPE data shows partial coverage only at Location 2.",
      "D&B score trending down 12 points over last quarter -- monitor financial stability.",
    ],
  },
  /* ── s2: Pacific Retail Group ── */
  {
    id: "s2",
    account: "Pacific Retail Group",
    broker: "Tom Bradley",
    brokerFirm: "Aon Risk Solutions",
    uwAssigned: "Robert Chen",
    stage: "intake",
    daysInStage: 1,
    daysInPipeline: 1,
    nextAction: "Order ProMetrix and CLUE",
    riskStatus: "green",
    riskFlags: [],
    tiv: "$32M",
    locations: 5,
    classOfBusiness: "Retail / Strip Mall",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "pending" },
      { name: "Loss Runs (5yr)", status: "pending" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "pending", lastUpdated: "-" },
      { type: "CLUE Report", status: "pending", lastUpdated: "-" },
    ],
    activity: [
      { date: "2026-02-07", action: "Submission received via email", by: "Emily R." },
    ],
    aiSummary:
      "New submission from Aon for a retail strip mall portfolio. 5 locations across California. Preliminary TIV of $32M. Broker has strong relationship history. Initial review looks clean.",
    aiAnomalies: [],
  },
  /* ── s3: Johnson Mfg ── */
  {
    id: "s3",
    account: "Johnson Mfg",
    broker: "Sarah Kim",
    brokerFirm: "Willis Towers Watson",
    uwAssigned: "Maria Lopez",
    stage: "uw-review",
    daysInStage: 4,
    daysInPipeline: 8,
    nextAction: "Awaiting Loss control survey",
    riskStatus: "yellow",
    riskFlags: [],
    premium: "$520,000",
    tiv: "$45M",
    locations: 2,
    classOfBusiness: "Manufacturing / Heavy Industrial",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
      { name: "Engineering Report", status: "pending" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-02-02" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-02-01" },
      { type: "D&B Financial", status: "complete", lastUpdated: "2026-02-03" },
    ],
    activity: [
      { date: "2026-02-06", action: "LC vendor reports insured not returning calls", by: "Sarah (LC)" },
      { date: "2026-02-04", action: "Loss Control survey scheduled", by: "Emily R." },
      { date: "2026-02-02", action: "All data orders completed", by: "System" },
      { date: "2026-02-01", action: "UW review initiated", by: "Maria L." },
    ],
    aiSummary:
      "Johnson Mfg is a large industrial account with 2 facilities. TIV $45M. All documents received but Loss Control survey is stuck. D&B score is strong at 82. Broker expects quote by end of next week.",
    aiAnomalies: [
      "High-hazard occupancy classification at Location 1 -- verify sprinkler adequacy.",
      "Claims frequency above industry average for similar class -- 3 WC claims in last 2 years.",
    ],
  },
  /* ── s4: Westfield Props ── */
  {
    id: "s4",
    account: "Westfield Props",
    broker: "David Park",
    brokerFirm: "Gallagher",
    uwAssigned: "Robert Chen",
    stage: "bind",
    daysInStage: 2,
    daysInPipeline: 21,
    nextAction: "Obtain UW sign-off for binding",
    riskStatus: "yellow",
    riskFlags: [],
    premium: "$250,000",
    tiv: "$28M",
    locations: 4,
    classOfBusiness: "Commercial Real Estate / Office",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
      { name: "Signed Quote", status: "complete" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-01-22" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-01-21" },
      { type: "D&B Financial", status: "complete", lastUpdated: "2026-01-23" },
    ],
    activity: [
      { date: "2026-02-06", action: "Broker confirmed acceptance of terms", by: "David P." },
      { date: "2026-02-05", action: "Signed quote received", by: "Emily R." },
      { date: "2026-02-01", action: "Quote delivered to broker", by: "Robert C." },
      { date: "2026-01-28", action: "Quote approved by UW", by: "Robert C." },
    ],
    aiSummary:
      "Westfield Props is a commercial real estate portfolio with 4 office buildings. TIV $28M. Clean loss history. All documents and approvals in place. Ready for binding pending UW final sign-off. Binding authority expires Wednesday.",
    aiAnomalies: [],
  },
  /* ── s5: Greenleaf Hosp ── */
  {
    id: "s5",
    account: "Greenleaf Hosp",
    broker: "Jane Mitchell",
    brokerFirm: "Marsh & McLennan",
    uwAssigned: "Maria Lopez",
    stage: "uw-review",
    daysInStage: 2,
    daysInPipeline: 6,
    nextAction: "Complete UW analysis",
    riskStatus: "green",
    riskFlags: [],
    premium: "$180,000",
    tiv: "$52M",
    locations: 6,
    classOfBusiness: "Hospitality / Hotels",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-02-04" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-02-03" },
      { type: "D&B Financial", status: "complete", lastUpdated: "2026-02-05" },
    ],
    activity: [
      { date: "2026-02-05", action: "All data orders received", by: "System" },
      { date: "2026-02-04", action: "UW review started", by: "Maria L." },
      { date: "2026-02-02", action: "Submission intake completed", by: "Emily R." },
    ],
    aiSummary:
      "Greenleaf Hosp operates a chain of 6 boutique hotels. TIV $52M. Strong financial position with D&B score of 88. No anomalies detected in initial analysis.",
    aiAnomalies: [],
  },
  /* ── s6: Metro Logistics ── */
  {
    id: "s6",
    account: "Metro Logistics",
    broker: "Tom Bradley",
    brokerFirm: "Aon Risk Solutions",
    uwAssigned: "Robert Chen",
    stage: "quote",
    daysInStage: 1,
    daysInPipeline: 14,
    nextAction: "Finalize pricing model",
    riskStatus: "green",
    riskFlags: [],
    premium: "$312,000",
    tiv: "$68M",
    locations: 8,
    classOfBusiness: "Warehouse / Distribution",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-01-30" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-01-29" },
      { type: "D&B Financial", status: "complete", lastUpdated: "2026-01-31" },
    ],
    activity: [
      { date: "2026-02-07", action: "Quote development started", by: "Robert C." },
      { date: "2026-02-03", action: "UW review completed -- approved for quoting", by: "Robert C." },
      { date: "2026-01-28", action: "LC survey completed -- no major findings", by: "LC Team" },
    ],
    aiSummary:
      "Metro Logistics operates 8 warehouse and distribution centers. TIV $68M. Complex account with mixed occupancies. LC survey completed with no major findings. Pricing model in development.",
    aiAnomalies: [
      "Location 4 has flood zone AE designation -- ensure proper flood sub-limit.",
    ],
  },
  /* ── s7: Riverside Medical ── */
  {
    id: "s7",
    account: "Riverside Medical",
    broker: "Rachel Kim",
    brokerFirm: "Brown & Brown",
    uwAssigned: "Maria Lopez",
    stage: "intake",
    daysInStage: 3,
    daysInPipeline: 3,
    nextAction: "Request updated property schedule",
    riskStatus: "yellow",
    riskFlags: ["Incomplete SOV", "High TIV"],
    premium: "$520,000",
    tiv: "$62M",
    locations: 4,
    classOfBusiness: "Healthcare / Hospital",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "pending" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "pending" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "pending", lastUpdated: "-" },
      { type: "CLUE Report", status: "pending", lastUpdated: "-" },
    ],
    activity: [
      { date: "2026-02-06", action: "Incomplete SOV flagged -- missing sq ft for 2 buildings", by: "Emily R." },
      { date: "2026-02-05", action: "Submission received from Brown & Brown", by: "Emily R." },
    ],
    aiSummary:
      "Large regional hospital system with 4 buildings. Broker submitted incomplete SOV -- missing square footage and construction year for Building C (MRI Center) and Building D (Parking Structure). High-value account worth pursuing.",
    aiAnomalies: [
      "SOV missing data for Building C and Building D.",
      "Need confirmation on sprinkler coverage for all buildings.",
    ],
  },
  /* ── s8: Summit Logistics ── */
  {
    id: "s8",
    account: "Summit Logistics",
    broker: "Tom Bradley",
    brokerFirm: "Aon Risk Solutions",
    uwAssigned: "Robert Chen",
    stage: "uw-review",
    daysInStage: 7,
    daysInPipeline: 12,
    nextAction: "UW decision on cold storage risk",
    riskStatus: "red",
    riskFlags: ["Ammonia refrigeration", "UW escalation pending"],
    premium: "$185,000",
    tiv: "$24M",
    locations: 1,
    classOfBusiness: "Warehouse / Cold Storage",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
      { name: "Engineering Report", status: "pending" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-01-30" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-01-30" },
      { type: "D&B Financial", status: "complete", lastUpdated: "2026-01-31" },
    ],
    activity: [
      { date: "2026-02-07", action: "Specialist survey scheduled for Feb 12", by: "LC Team" },
      { date: "2026-02-03", action: "Robert Chen requested Loss Engineering review", by: "Robert C." },
      { date: "2026-01-30", action: "Data orders complete", by: "System" },
    ],
    aiSummary:
      "200,000 SF cold storage warehouse with ammonia refrigeration system. Higher hazard class. Robert Chen wants Loss Engineering input before pricing. Tom Bradley says client needs quote by Feb 15.",
    aiAnomalies: [
      "Ammonia refrigeration system requires specialist survey.",
      "Awaiting Loss Engineering review before pricing.",
    ],
  },
  /* ── s9: Downtown Plaza ── */
  {
    id: "s9",
    account: "Downtown Plaza",
    broker: "Jane Mitchell",
    brokerFirm: "Marsh & McLennan",
    uwAssigned: "Lisa Wong",
    stage: "quote",
    daysInStage: 1,
    daysInPipeline: 9,
    nextAction: "Generate quote package",
    riskStatus: "green",
    riskFlags: [],
    premium: "$98,000",
    tiv: "$12M",
    locations: 1,
    classOfBusiness: "Retail / Shopping Center",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-02-01" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-02-01" },
    ],
    activity: [
      { date: "2026-02-07", action: "Lisa Wong approved terms", by: "Lisa W." },
      { date: "2026-02-04", action: "UW review complete", by: "Lisa W." },
      { date: "2026-02-01", action: "Intake completed", by: "Emily R." },
    ],
    aiSummary:
      "Single retail plaza with 15 tenants, well-maintained. Clean loss history. Lisa Wong approved terms yesterday. Ready to generate and send quote package.",
    aiAnomalies: [],
  },
  /* ── s10: Coastal Condo ── */
  {
    id: "s10",
    account: "Coastal Condo",
    broker: "David Park",
    brokerFirm: "Gallagher",
    uwAssigned: "Robert Chen",
    stage: "bind",
    daysInStage: 1,
    daysInPipeline: 14,
    nextAction: "Verify final payment received",
    riskStatus: "green",
    riskFlags: [],
    premium: "$156,000",
    tiv: "$18M",
    locations: 1,
    classOfBusiness: "Habitational / Condo",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
      { name: "Signed Application", status: "complete" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-01-28" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-01-28" },
    ],
    activity: [
      { date: "2026-02-08", action: "Premium payment received", by: "Finance" },
      { date: "2026-02-07", action: "Policy issuance initiated", by: "Amy C." },
      { date: "2026-02-05", action: "All subjectivities cleared", by: "Emily R." },
    ],
    aiSummary:
      "48-unit oceanfront condo association. All subjectivities cleared. Premium payment received this morning. Policy issuance in progress.",
    aiAnomalies: [],
  },
  /* ── s11: Heritage Manufacturing ── */
  {
    id: "s11",
    account: "Heritage Manufacturing",
    broker: "Sarah Kim",
    brokerFirm: "Willis Towers Watson",
    uwAssigned: "Maria Lopez",
    stage: "intake",
    daysInStage: 1,
    daysInPipeline: 1,
    nextAction: "Order ProMetrix and CLUE",
    riskStatus: "green",
    riskFlags: [],
    tiv: "$8.5M",
    locations: 2,
    classOfBusiness: "Manufacturing / Light Industrial",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "pending", lastUpdated: "-" },
      { type: "CLUE Report", status: "pending", lastUpdated: "-" },
    ],
    activity: [
      { date: "2026-02-08", action: "Submission received -- appears complete", by: "Emily R." },
    ],
    aiSummary:
      "New submission received this morning. Light manufacturing -- metal fabrication. Two buildings on same campus. Submission appears complete.",
    aiAnomalies: [],
  },
  /* ── s12: Trinity Church ── */
  {
    id: "s12",
    account: "Trinity Church",
    broker: "Rachel Kim",
    brokerFirm: "Brown & Brown",
    uwAssigned: "Lisa Wong",
    stage: "uw-review",
    daysInStage: 3,
    daysInPipeline: 6,
    nextAction: "Await UW pricing decision",
    riskStatus: "green",
    riskFlags: ["Historic building"],
    premium: "$45,000",
    tiv: "$5.2M",
    locations: 3,
    classOfBusiness: "Religious / Non-Profit",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-02-03" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-02-03" },
    ],
    activity: [
      { date: "2026-02-06", action: "Lisa Wong reviewing historic structure valuation", by: "Lisa W." },
      { date: "2026-02-03", action: "Data orders complete", by: "System" },
      { date: "2026-02-02", action: "Intake completed", by: "Emily R." },
    ],
    aiSummary:
      "Three properties -- main church (1920s historic), parish hall, and parsonage. Lisa Wong reviewing; main consideration is the historic structure and replacement cost valuation.",
    aiAnomalies: [
      "Main church built 1924 -- historic structure replacement cost may differ significantly from standard valuation.",
    ],
  },
  /* ── s13: Oakwood Apts ── */
  {
    id: "s13",
    account: "Oakwood Apts",
    broker: "Tom Bradley",
    brokerFirm: "Aon Risk Solutions",
    uwAssigned: "Robert Chen",
    stage: "quote",
    daysInStage: 5,
    daysInPipeline: 11,
    nextAction: "Broker response to quote -- follow up",
    riskStatus: "yellow",
    riskFlags: ["Quote aging -- 5 days"],
    premium: "$210,000",
    tiv: "$28M",
    locations: 1,
    classOfBusiness: "Habitational / Apartments",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
      { name: "Quote Package", status: "complete" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-01-31" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-01-31" },
      { type: "D&B Financial", status: "complete", lastUpdated: "2026-02-01" },
    ],
    activity: [
      { date: "2026-02-03", action: "Quote delivered to broker at $210K", by: "Robert C." },
      { date: "2026-02-01", action: "UW approved terms", by: "Robert C." },
      { date: "2026-01-31", action: "All data orders complete", by: "System" },
    ],
    aiSummary:
      "120-unit apartment complex. Quote delivered Feb 3 at $210K. Tom said client was comparing options. No response in 5 days -- may be negotiating with competitor.",
    aiAnomalies: [
      "Quote aging 5 days -- win rate drops significantly after 7 days.",
    ],
  },
  /* ── s14: Precision Auto ── */
  {
    id: "s14",
    account: "Precision Auto",
    broker: "David Park",
    brokerFirm: "Gallagher",
    uwAssigned: "Maria Lopez",
    stage: "uw-review",
    daysInStage: 6,
    daysInPipeline: 8,
    nextAction: "Resolve sprinkler deficiency question",
    riskStatus: "yellow",
    riskFlags: ["Sprinkler deficiency noted"],
    premium: "$78,000",
    tiv: "$9M",
    locations: 1,
    classOfBusiness: "Warehouse / Distribution",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
      { name: "LC Survey Report", status: "complete" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-02-01" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-02-01" },
      { type: "D&B Financial", status: "complete", lastUpdated: "2026-02-02" },
    ],
    activity: [
      { date: "2026-02-08", action: "LC survey complete -- sprinkler deficiency noted", by: "Sarah L. (LC)" },
      { date: "2026-02-05", action: "LC survey conducted", by: "LC Team" },
      { date: "2026-02-02", action: "Data orders complete", by: "System" },
    ],
    aiSummary:
      "Auto parts distribution warehouse. LC survey found sprinkler heads in high-rack area are older model, recommend replacement. Maria Lopez deciding whether to require upgrade as condition of coverage or accept with higher deductible.",
    aiAnomalies: [
      "Sprinkler heads in rack storage area need replacement per LC survey.",
    ],
  },
  /* ── s15: Maple Grove Schools ── */
  {
    id: "s15",
    account: "Maple Grove Schools",
    broker: "Jane Mitchell",
    brokerFirm: "Marsh & McLennan",
    uwAssigned: "Robert Chen",
    stage: "bind",
    daysInStage: 3,
    daysInPipeline: 18,
    nextAction: "Chase signed application from school board",
    riskStatus: "yellow",
    riskFlags: ["Awaiting board signature"],
    premium: "$340,000",
    tiv: "$48M",
    locations: 8,
    classOfBusiness: "Public Entity / Schools",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "complete" },
      { name: "Loss Runs (5yr)", status: "complete" },
      { name: "Signed Application", status: "pending" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "complete", lastUpdated: "2026-01-25" },
      { type: "CLUE Report", status: "complete", lastUpdated: "2026-01-25" },
      { type: "D&B Financial", status: "complete", lastUpdated: "2026-01-26" },
    ],
    activity: [
      { date: "2026-02-06", action: "Jane pushing to get on Feb 12 board agenda", by: "Jane M." },
      { date: "2026-02-04", action: "All terms agreed, awaiting board signature", by: "Emily R." },
      { date: "2026-01-28", action: "Quote delivered", by: "Robert C." },
    ],
    aiSummary:
      "8 school buildings including elementary, middle, and high school. All terms agreed. Waiting for school board to sign application -- they meet monthly. Jane Mitchell pushing to get on Feb 12 agenda.",
    aiAnomalies: [
      "School board meets Feb 12 -- if signature not obtained, bind will delay to March.",
    ],
  },
  /* ── s16: Lakeside Office ── */
  {
    id: "s16",
    account: "Lakeside Office",
    broker: "Sarah Kim",
    brokerFirm: "Willis Towers Watson",
    uwAssigned: "Lisa Wong",
    stage: "intake",
    daysInStage: 5,
    daysInPipeline: 5,
    nextAction: "Chase broker for financials",
    riskStatus: "red",
    riskFlags: ["Missing financials", "Broker unresponsive"],
    tiv: "$32M",
    locations: 3,
    classOfBusiness: "Office / Commercial",
    documents: [
      { name: "ACORD 125", status: "complete" },
      { name: "Statement of Values", status: "complete" },
      { name: "Financials (3yr)", status: "missing" },
      { name: "Loss Runs (5yr)", status: "pending" },
    ],
    dataOrders: [
      { type: "ProMetrix", status: "pending", lastUpdated: "-" },
      { type: "CLUE Report", status: "pending", lastUpdated: "-" },
    ],
    activity: [
      { date: "2026-02-07", action: "Second follow-up email sent -- no response", by: "Emily R." },
      { date: "2026-02-05", action: "Follow-up email sent re: missing financials", by: "Emily R." },
      { date: "2026-02-03", action: "Financials requested from Sarah Kim", by: "Emily R." },
      { date: "2026-02-03", action: "Submission received -- financials missing", by: "Emily R." },
    ],
    aiSummary:
      "Three-building suburban office park. Submission missing 2 years of financials required for this TIV. Sarah Kim has not responded to two email requests. May need to escalate or decline.",
    aiAnomalies: [
      "Financials not received -- requested Feb 3.",
      "Broker not responding to emails -- 5 days without response.",
    ],
  },
]

/* ── Queue Items (expanded) ──────────────────────────────────────── */

export const queueItems: {
  lossControl: QueueItem[]
  compliance: QueueItem[]
  policyIssuance: QueueItem[]
} = {
  lossControl: [
    {
      id: "q1",
      fileName: "Johnson Mfg",
      owner: "Mike Reynolds",
      status: "Blocked",
      daysInQueue: 4,
      blocker: "Insured not returning calls",
    },
    {
      id: "q2",
      fileName: "ABC Corporation",
      owner: "Mike Reynolds",
      status: "Blocked",
      daysInQueue: 6,
      blocker: "Survey ordered Day 4, vendor can't reach insured",
    },
    {
      id: "q3",
      fileName: "Summit Logistics",
      owner: "Mike Reynolds",
      status: "Scheduled",
      daysInQueue: 5,
      blocker: "Ammonia inspection Feb 12 -- specialist vendor",
    },
    {
      id: "q4",
      fileName: "Riverside Medical",
      owner: "Sarah Lin",
      status: "Scheduled",
      daysInQueue: 1,
      blocker: "Hospital survey Feb 14 -- 4 buildings",
    },
    {
      id: "q5",
      fileName: "Trinity Church",
      owner: "Mike Reynolds",
      status: "In Progress",
      daysInQueue: 2,
      blocker: "Historic structure assessment -- specialist reviewing",
    },
    {
      id: "q6",
      fileName: "Greenleaf Hosp",
      owner: "Sarah Lin",
      status: "Complete",
      daysInQueue: 0,
      blocker: "Report submitted to UW",
    },
    {
      id: "q7",
      fileName: "Precision Auto",
      owner: "Sarah Lin",
      status: "Complete",
      daysInQueue: 0,
      blocker: "Sprinkler deficiency noted -- UW reviewing",
    },
  ],
  compliance: [
    {
      id: "q8",
      fileName: "Maple Grove Schools",
      owner: "Jennifer Wu",
      status: "Approved",
      daysInQueue: 0,
      blocker: "Awaiting signed docs from school board",
    },
    {
      id: "q9",
      fileName: "Westfield Props",
      owner: "Mike Davis",
      status: "In Review",
      daysInQueue: 2,
      blocker: "Multi-state filing (IL, WI, IN). Expected complete today.",
    },
    {
      id: "q10",
      fileName: "Metro Logistics",
      owner: "Mike Davis",
      status: "In Review",
      daysInQueue: 1,
    },
    {
      id: "q11",
      fileName: "Coastal Condo",
      owner: "Jennifer Wu",
      status: "Approved",
      daysInQueue: 0,
    },
    {
      id: "q12",
      fileName: "Oakwood Apts",
      owner: "Mike Davis",
      status: "In Review",
      daysInQueue: 3,
      blocker: "TX habitational forms. Pending hurricane deductible disclosure.",
    },
  ],
  policyIssuance: [
    {
      id: "q13",
      fileName: "Coastal Condo",
      owner: "Amy Chen",
      status: "In Progress",
      daysInQueue: 1,
    },
    {
      id: "q14",
      fileName: "Westfield Props",
      owner: "Pending",
      status: "Pending",
      daysInQueue: 0,
      blocker: "Awaiting UW bind authorization",
    },
    {
      id: "q15",
      fileName: "Downtown Plaza",
      owner: "Amy Chen",
      status: "In Progress",
      daysInQueue: 0,
    },
    {
      id: "q16",
      fileName: "Maple Grove Schools",
      owner: "Bob Martinez",
      status: "Pending",
      daysInQueue: 0,
      blocker: "Awaiting signed application from school board",
    },
  ],
}

/* ── Brokers (5 total) ───────────────────────────────────────────── */

export const brokers: Broker[] = [
  {
    id: "b1",
    name: "Jane Mitchell",
    firm: "Marsh & McLennan",
    relationshipScore: 92,
    activeSubmissions: 4,
    lastContact: "2026-02-06",
    preferences: {
      communicationStyle: "Phone + short emails",
      ccList: "Always CC assistant Lisa (lisa.r@marsh.com)",
      typicalGaps: "Often missing loss runs initially",
    },
    history: {
      totalSubmissions: 28,
      winRate: 72,
      avgCycleTime: "18 days",
    },
    aiNote:
      "This broker prefers phone calls followed by short confirmation emails. Always CC assistant Lisa. Tends to submit without loss runs -- proactively request at intake.",
  },
  {
    id: "b2",
    name: "Tom Bradley",
    firm: "Aon Risk Solutions",
    relationshipScore: 85,
    activeSubmissions: 4,
    lastContact: "2026-02-07",
    preferences: {
      communicationStyle: "Email only -- detailed",
      ccList: "CC regional manager Dave (dave.k@aon.com) on accounts > $500K",
      typicalGaps: "SOV formatting inconsistencies",
    },
    history: {
      totalSubmissions: 35,
      winRate: 65,
      avgCycleTime: "22 days",
    },
    aiNote:
      "Tom prefers detailed email communication. CC Dave on large accounts. SOV formatting is often inconsistent -- verify location data carefully.",
  },
  {
    id: "b3",
    name: "Sarah Kim",
    firm: "Willis Towers Watson",
    relationshipScore: 78,
    activeSubmissions: 3,
    lastContact: "2026-02-04",
    preferences: {
      communicationStyle: "Email with follow-up call",
      ccList: "No standard CC",
      typicalGaps: "Engineering reports often delayed",
    },
    history: {
      totalSubmissions: 15,
      winRate: 60,
      avgCycleTime: "25 days",
    },
    aiNote:
      "Sarah responds well to email followed by a quick phone check-in. Engineering reports are a frequent bottleneck with her submissions.",
  },
  {
    id: "b4",
    name: "David Park",
    firm: "Gallagher",
    relationshipScore: 88,
    activeSubmissions: 3,
    lastContact: "2026-02-06",
    preferences: {
      communicationStyle: "Quick emails and Teams messages",
      ccList: "CC underwriting assistant Pat (pat.h@gallagher.com)",
      typicalGaps: "Occasionally missing financials",
    },
    history: {
      totalSubmissions: 22,
      winRate: 68,
      avgCycleTime: "20 days",
    },
    aiNote:
      "David is very responsive via quick messages. CC Pat on all communications. Usually submits complete files but sometimes forgets financials.",
  },
  {
    id: "b5",
    name: "Rachel Kim",
    firm: "Brown & Brown",
    relationshipScore: 74,
    activeSubmissions: 2,
    lastContact: "2026-02-05",
    preferences: {
      communicationStyle: "Email preferred, calls for urgent items",
      ccList: "CC team lead Anita (anita.c@bbrown.com) on healthcare accounts",
      typicalGaps: "SOV data often incomplete for large accounts",
    },
    history: {
      totalSubmissions: 9,
      winRate: 56,
      avgCycleTime: "21 days",
    },
    aiNote:
      "Newer broker relationship. Rachel tends to submit incomplete SOVs for complex accounts -- flag missing data early. Responsive once contacted.",
  },
]

/* ── UW Profiles (4 total) ───────────────────────────────────────── */

export const uwProfiles: UWProfile[] = [
  {
    id: "uw1",
    name: "Robert Chen",
    portfolioFocus: "Commercial Property, Real Estate",
    riskAppetite: "Moderate -- prefers accounts with strong loss history and D&B > 70",
    preferredFormat: "PDF summaries with data tables",
    presentationStyle: "Concise executive summary on page 1, details in appendix",
    petPeeves: [
      "Wants loss runs summarized, not raw",
      "Prefers anomalies flagged in yellow highlight",
      "Dislikes receiving incomplete files -- hold until all docs are in",
    ],
    currentWorkload: 14,
    maxWorkload: 20,
  },
  {
    id: "uw2",
    name: "Maria Lopez",
    portfolioFocus: "Manufacturing, Hospitality, Specialty",
    riskAppetite: "Aggressive on well-documented risks -- willing to write complex accounts",
    preferredFormat: "Spreadsheet format with pivot-ready data",
    presentationStyle: "Deep-dive analysis with LC findings front and center",
    petPeeves: [
      "Wants all data orders complete before review starts",
      "Prefers narrative AI summaries over bullet points",
      "Don't schedule meetings before 10 AM",
    ],
    currentWorkload: 11,
    maxWorkload: 18,
  },
  {
    id: "uw3",
    name: "Lisa Wong",
    portfolioFocus: "Retail, Religious, Small Commercial",
    riskAppetite: "Conservative on historic properties, moderate otherwise",
    preferredFormat: "PDF with summary cover page",
    presentationStyle: "Brief overview with photos when available",
    petPeeves: [
      "Wants historic building valuations flagged upfront",
      "Prefers files submitted with complete data orders",
      "Dislikes back-and-forth emails -- compile all requests into one",
    ],
    currentWorkload: 8,
    maxWorkload: 15,
  },
]
