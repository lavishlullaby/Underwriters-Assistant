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

export const priorities: PriorityItem[] = [
  {
    id: "p1",
    type: "urgent",
    title: "Quote for ABC Corp expires Friday",
    description: "Subjectivity still open -- awaiting updated loss runs from broker.",
    action: "/submissions/s1",
    actionLabel: "Call Broker",
    submissionId: "s1",
  },
  {
    id: "p2",
    type: "warning",
    title: "LC survey stuck Day 4",
    description: "Vendor waiting on insured callback for Johnson Manufacturing site access.",
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
    title: "Binding authority expiring for Westfield account",
    description: "Needs UW sign-off by EOD Wednesday. All documents are in.",
    action: "/submissions/s4",
    actionLabel: "Escalate to UW",
    submissionId: "s4",
  },
]

export const submissions: Submission[] = [
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
    riskFlags: ["Missing loss runs", "Quote expiring Friday"],
    premium: "$245,000",
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
  {
    id: "s3",
    account: "Johnson Manufacturing",
    broker: "Sarah Kim",
    brokerFirm: "Willis Towers Watson",
    uwAssigned: "Maria Lopez",
    stage: "uw-review",
    daysInStage: 4,
    daysInPipeline: 8,
    nextAction: "Awaiting Loss Control survey completion",
    riskStatus: "yellow",
    riskFlags: ["LC survey delayed"],
    premium: "$520,000",
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
      "Johnson Manufacturing is a large industrial account with 2 facilities. TIV $45M. All documents received but Loss Control survey is stuck. D&B score is strong at 82. Broker expects quote by end of next week.",
    aiAnomalies: [
      "High-hazard occupancy classification at Location 1 -- verify sprinkler adequacy.",
      "Claims frequency above industry average for similar class -- 3 WC claims in last 2 years.",
    ],
  },
  {
    id: "s4",
    account: "Westfield Properties",
    broker: "David Park",
    brokerFirm: "Gallagher",
    uwAssigned: "Robert Chen",
    stage: "bind",
    daysInStage: 2,
    daysInPipeline: 21,
    nextAction: "Obtain UW sign-off for binding",
    riskStatus: "yellow",
    riskFlags: ["Binding authority expires Wed"],
    premium: "$180,000",
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
      "Westfield Properties is a commercial real estate portfolio with 4 office buildings. TIV $28M. Clean loss history. All documents and approvals in place. Ready for binding pending UW final sign-off. Binding authority expires Wednesday.",
    aiAnomalies: [],
  },
  {
    id: "s5",
    account: "Greenleaf Hospitality",
    broker: "Jane Mitchell",
    brokerFirm: "Marsh & McLennan",
    uwAssigned: "Maria Lopez",
    stage: "uw-review",
    daysInStage: 2,
    daysInPipeline: 6,
    nextAction: "Complete UW analysis",
    riskStatus: "green",
    riskFlags: [],
    premium: "$310,000",
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
      "Greenleaf Hospitality operates a chain of 6 boutique hotels. TIV $52M. Strong financial position with D&B score of 88. No anomalies detected in initial analysis. Broker Jane Mitchell has a strong relationship history with the carrier.",
    aiAnomalies: [],
  },
  {
    id: "s6",
    account: "Metro Logistics Inc.",
    broker: "Tom Bradley",
    brokerFirm: "Aon Risk Solutions",
    uwAssigned: "Robert Chen",
    stage: "quote",
    daysInStage: 1,
    daysInPipeline: 14,
    nextAction: "Finalize pricing model",
    riskStatus: "green",
    riskFlags: [],
    premium: "$415,000",
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
      "Metro Logistics operates 8 warehouse and distribution centers. TIV $68M. Complex account with mixed occupancies. LC survey completed with no major findings. Pricing model in development. Broker expects competitive quote given incumbent renewal.",
    aiAnomalies: [
      "Location 4 has flood zone AE designation -- ensure proper flood sub-limit.",
    ],
  },
]

export const queueItems: {
  lossControl: QueueItem[]
  compliance: QueueItem[]
  policyIssuance: QueueItem[]
} = {
  lossControl: [
    {
      id: "q1",
      fileName: "Johnson Manufacturing",
      owner: "Sarah (LC Coordinator)",
      status: "Survey Pending",
      daysInQueue: 4,
      blocker: "Insured not returning vendor calls",
    },
    {
      id: "q2",
      fileName: "Metro Logistics Inc.",
      owner: "Mark (LC Coordinator)",
      status: "Complete",
      daysInQueue: 0,
    },
    {
      id: "q3",
      fileName: "Greenleaf Hospitality",
      owner: "Sarah (LC Coordinator)",
      status: "Scheduled",
      daysInQueue: 1,
    },
  ],
  compliance: [
    {
      id: "q4",
      fileName: "Westfield Properties",
      owner: "Linda (Compliance)",
      status: "Review In Progress",
      daysInQueue: 2,
    },
    {
      id: "q5",
      fileName: "ABC Corporation",
      owner: "Linda (Compliance)",
      status: "Pending",
      daysInQueue: 3,
      blocker: "Missing updated endorsement language",
    },
    {
      id: "q6",
      fileName: "Pacific Retail Group",
      owner: "James (Compliance)",
      status: "Queued",
      daysInQueue: 0,
    },
  ],
  policyIssuance: [
    {
      id: "q7",
      fileName: "Westfield Properties",
      owner: "Karen (Policy Tech)",
      status: "Rating Complete",
      daysInQueue: 1,
    },
    {
      id: "q8",
      fileName: "Metro Logistics Inc.",
      owner: "Karen (Policy Tech)",
      status: "Pending Rating",
      daysInQueue: 0,
    },
  ],
}

export const brokers: Broker[] = [
  {
    id: "b1",
    name: "Jane Mitchell",
    firm: "Marsh & McLennan",
    relationshipScore: 92,
    activeSubmissions: 2,
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
    activeSubmissions: 2,
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
    activeSubmissions: 1,
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
    activeSubmissions: 1,
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
]

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
]
