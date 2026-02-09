// Submission-specific action data for all 6 submissions
// Each submission has detailed content for 4 action modals:
// Generate Quote Package, Draft Broker Email, Escalate to UW, Mark Complete

export interface QuotePackageData {
  status: "ready" | "warning" | "blocked"
  statusMessage: string
  preCheckItems?: { icon: "check" | "warning" | "error"; text: string }[]
  recommendation?: string
  components?: { label: string; checked: boolean; disabled?: boolean; disabledReason?: string }[]
  coverLetter?: string
  suggestions?: string[]
  delivery?: { to: string; cc?: string; ccNote?: string; subject: string }
  alternativeActions?: { label: string; action: string }[]
  notifyOption?: boolean
}

export interface BrokerEmailData {
  contextItems: string[]
  emailTypes: string[]
  selectedType: string
  generatedEmail: { subject: string; body: string }
  suggestions?: string[]
  quickActions?: { label: string; action: string }[]
  subjectivityChecklist?: { label: string; complete: boolean; detail?: string }[]
  aiInsight?: string
}

export interface EscalateData {
  currentUW: string
  aiAnalysis: string
  reasons: { label: string; value: string }[]
  defaultReason?: string
  prefilledMessage?: string
  fileContext?: { label: string; value: string }[]
  notificationPreview?: string
  additionalFieldsOnReason?: Record<string, { fields: { label: string; type: "dropdown" | "text" | "textarea"; options?: string[]; placeholder?: string }[] }>
}

export interface MarkCompleteData {
  status: "allowed" | "warning" | "blocked"
  warningMessage?: string
  openItems?: { icon: "error" | "warning"; text: string }[]
  reasons: { label: string; value: string }[]
  defaultReason?: string
  lostCompetitorFields?: boolean
  boundFields?: boolean
  aiInsight?: string
  aiCelebration?: string
  alternativeActions?: { label: string; action: string }[]
  fileStatus?: { label: string; value: string }[]
}

export const quotePackageDataMap: Record<string, QuotePackageData> = {
  s1: {
    status: "warning",
    statusMessage: "File has open items that may affect quote package:",
    preCheckItems: [
      { icon: "error", text: "Missing: 5-year loss runs (only 2-year on file)" },
      { icon: "warning", text: "Quote expires: Friday, Feb 14 (2 days)" },
      { icon: "check", text: "UW approval: Confirmed by Robert Chen on Feb 7" },
      { icon: "check", text: "Premium: $245,000 confirmed" },
    ],
    recommendation:
      "Recommend proceeding with quote package but noting in cover letter that 5-year loss runs are pending. This allows broker to present to client while we obtain remaining documentation.",
    components: [
      { label: "Proposal cover letter", checked: true },
      { label: "Quote schedule ($245,000 premium, $25K deductible)", checked: true },
      { label: "Location schedule (3 locations, $18.2M TIV)", checked: true },
      { label: "Form schedule (IL standard forms, 14 endorsements)", checked: true },
      { label: "Coverage summary", checked: true },
      { label: "Loss run summary", checked: false, disabled: true, disabledReason: "5-year runs not available" },
    ],
    coverLetter: `Dear Jane,

Thank you for the opportunity to quote ABC Corp. Please find attached our indication for this 3-location manufacturing portfolio.

QUOTE SUMMARY:
- Premium: $245,000
- Effective: March 1, 2025
- Deductible: $25,000
- Coinsurance: 90%

This quote is subject to receipt of 5-year loss runs from the prior carrier. We have reviewed the 2-year history on file showing clean experience.

Note: We applied favorable pricing for Location 1 given the confirmed 2019 gut rehab with full system replacement.

This indication is valid through Friday, February 14. Please let me know if you have questions.

Best regards,
Sarah Chen`,
    suggestions: [
      "Add urgency: Mention Friday expiration deadline",
      "Add value: Highlight sprinkler credit applied",
      "Add ask: Request loss runs by Wednesday to finalize",
    ],
    delivery: {
      to: "jane.mitchell@marshmclennan.com",
      cc: "lisa.park@marshmclennan.com",
      ccNote: "Jane's assistant, per her preferences",
      subject: "ABC Corp -- Quote Indication -- $245,000",
    },
  },
  s2: {
    status: "blocked",
    statusMessage: "Cannot generate quote package yet. File is in Intake stage.",
    preCheckItems: [
      { icon: "error", text: "Data orders not placed (ProMetrix, CLUE)" },
      { icon: "error", text: "UW has not reviewed file" },
      { icon: "error", text: "No pricing approved" },
    ],
    recommendation:
      'Complete these steps first:\n1. Order ProMetrix and CLUE reports\n2. Submit to UW for review\n3. Obtain pricing approval',
    alternativeActions: [
      { label: "Order Data Reports", action: "order-data" },
    ],
  },
  s3: {
    status: "warning",
    statusMessage: "File is in UW Review. Quote package requires UW approval first.",
    preCheckItems: [
      { icon: "warning", text: "UW: Maria Lopez" },
      { icon: "warning", text: "Status: Awaiting Loss Control survey" },
      { icon: "warning", text: "LC Survey ordered: Feb 3" },
      { icon: "error", text: "LC Status: Vendor unable to reach insured (5 attempts)" },
    ],
    recommendation:
      "Unblock the LC survey first. Once survey complete, Maria can finalize terms and you can generate quote package.",
    alternativeActions: [
      { label: "Contact broker to push insured", action: "contact-broker" },
      { label: "Escalate to Maria Lopez", action: "escalate" },
      { label: "View LC survey status", action: "view-lc" },
    ],
  },
  s4: {
    status: "warning",
    statusMessage: "Quote already issued on Feb 1. File is now in Bind stage.",
    alternativeActions: [
      { label: "Regenerate quote package with same terms", action: "regenerate" },
      { label: "Request revised quote from UW", action: "revise" },
      { label: "Generate binder instead", action: "binder" },
    ],
    recommendation:
      "Since file is ready to bind, you may want to generate the binder/policy documents instead.",
  },
  s5: {
    status: "blocked",
    statusMessage: "Cannot generate yet -- UW analysis in progress.",
    preCheckItems: [
      { icon: "warning", text: "UW: Maria Lopez" },
      { icon: "warning", text: "Status: Reviewing COPE data and loss history" },
      { icon: "check", text: "Data orders: All complete" },
      { icon: "warning", text: "Expected decision: Feb 12 (tomorrow)" },
    ],
    recommendation:
      "Check back after Maria completes her review. Based on her typical turnaround, expect quote terms by end of day tomorrow.",
    notifyOption: true,
  },
  s6: {
    status: "ready",
    statusMessage: "File is ready for quote package generation.",
    preCheckItems: [
      { icon: "check", text: "UW approval: Confirmed by Robert Chen on Feb 5" },
      { icon: "check", text: "Premium: $312,000 confirmed" },
      { icon: "check", text: "All locations rated: 5 locations" },
      { icon: "check", text: "Forms selected: Multi-state (IL, WI, IN)" },
      { icon: "check", text: "Loss runs: 5-year complete" },
      { icon: "check", text: "LC survey: Complete Feb 8" },
    ],
    components: [
      { label: "Proposal cover letter", checked: true },
      { label: "Quote schedule ($312,000 premium)", checked: true },
      { label: "Location schedule (5 locations, $28.5M TIV)", checked: true },
      { label: "Form schedule (3 states, 22 endorsements)", checked: true },
      { label: "Coverage summary", checked: true },
      { label: "Loss run summary", checked: true },
      { label: "LC survey summary", checked: true },
    ],
    coverLetter: `Dear Tom,

Thank you for the opportunity to quote Metro Logistics We are pleased to provide the following indication for this 5-location warehouse and distribution portfolio.

QUOTE SUMMARY:
- Premium: $312,000
- Effective: March 15, 2025
- Deductible: $50,000
- Coinsurance: 90%

This is a well-maintained portfolio with excellent loss history and strong fire protection across all locations. We've applied our best pricing given the sprinkler protection and favorable COPE characteristics.

Quote valid for 30 days. Please let me know if you have any questions.

Best regards,
Sarah Chen`,
    delivery: {
      to: "tom.bradley@aon.com",
      subject: "Metro Logistics -- Quote Indication -- $312,000",
    },
  },
}

export const brokerEmailDataMap: Record<string, BrokerEmailData> = {
  s1: {
    contextItems: [
      "Missing: 5-year loss runs (requested Feb 6, no response)",
      "Quote expires: Friday, Feb 14",
      "Last contact with Jane: Feb 8 (4 days ago)",
      "Jane's preference: Prefers phone for urgent items, email for follow-up",
    ],
    emailTypes: ["Chase Missing Docs", "Status Update", "Urgent Deadline", "Custom"],
    selectedType: "Chase Missing Docs",
    generatedEmail: {
      subject: "ABC Corp -- Need 5-year loss runs by Wednesday",
      body: `Hi Jane,

Quick follow-up on ABC Corp. We're in great shape to finalize the quote at $245,000, but I still need the 5-year loss runs from the prior carrier to complete the file.

Could you check with your client on the status? If we can get these by Wednesday, I can have the final quote package to you Thursday, well ahead of Friday's expiration.

Current status:
[check] UW approved terms
[check] All data orders complete
[x] Awaiting 5-year loss runs

Let me know if you're having trouble getting these -- happy to discuss alternatives.

Thanks,
Sarah`,
    },
    suggestions: [
      "Add: Offer to extend quote deadline if runs delayed",
      "Add: Mention you can proceed with 2-year if client confirms no prior losses",
      "Tone: More urgent -- emphasize Friday deadline",
    ],
    quickActions: [
      { label: "Call instead -- Jane's number: (312) 555-1234", action: "call" },
      { label: "Copy to clipboard", action: "copy" },
    ],
  },
  s2: {
    contextItems: [
      "New submission received today from Tom Bradley. File appears complete.",
    ],
    emailTypes: ["Acknowledgment", "Request Missing Docs", "Status Update", "Custom"],
    selectedType: "Acknowledgment",
    generatedEmail: {
      subject: "Pacific Retail -- Submission Received",
      body: `Hi Tom,

Thanks for sending over Pacific Retail. I've received the submission and will have it to underwriting shortly.

Quick confirmation of what's on file:
[check] ACORD 125/140
[check] Statement of Values (4 locations)
[check] 3-year loss runs
[check] Current dec page

I'm ordering property data reports today and expect to have this in front of Robert Chen for review by tomorrow.

I'll keep you posted on timing. Let me know if anything changes on your end.

Thanks,
Sarah`,
    },
  },
  s3: {
    contextItems: [
      "Critical blocker: LC vendor has attempted to reach insured 5 times since Feb 3. No callback.",
    ],
    emailTypes: ["Chase Missing Docs", "LC Survey Blocker", "Status Update", "Custom"],
    selectedType: "LC Survey Blocker",
    generatedEmail: {
      subject: "Johnson Mfg -- Need Help Reaching Your Client",
      body: `Hi Sarah,

I need your help unblocking Johnson Mfg. Our loss control vendor (ABC Inspections) has tried to reach your client 5 times since Feb 3 to schedule the required survey, but hasn't been able to connect.

Vendor contact attempts:
- Feb 3: Called, left voicemail
- Feb 4: Called, left voicemail
- Feb 6: Called + emailed
- Feb 7: Called, left voicemail
- Feb 10: Called, left voicemail

They've been trying to reach:
Robert Martinez, Facilities Manager
(555) 867-5309
robert.martinez@johnsonmfg.com

Could you reach out to your client and ask Robert to return the call? The survey takes about 2 hours and we can accommodate any time that works for them.

Once the survey is complete, we can move quickly to quote.

Thanks,
Sarah

P.S. Vendor contact for scheduling: ABC Inspections, (555) 234-5678, ref #LC-2025-0892`,
    },
    suggestions: [
      "Add: Offer alternative contacts at the insured",
      "Add: Note that survey can be done virtually if easier",
      "Tone: More urgent -- Day 8 in pipeline",
    ],
  },
  s4: {
    contextItems: [
      "File ready to bind. Waiting on: UW sign-off for binding.",
    ],
    emailTypes: ["Bind Confirmation", "Subjectivity Status", "Chase Signature", "Custom"],
    selectedType: "Chase Signature",
    generatedEmail: {
      subject: "Westfield Props -- Ready to Bind, Awaiting Final Docs",
      body: `Hi David,

Great news -- we're ready to bind Westfield Props. Just need a couple of final items:

Outstanding items for binding:
[ ] Signed application (sent Feb 8 -- can you check with client?)
[ ] Certificate of insurance for lender (Wells Fargo)
[ ] Deposit payment: $62,500 (25% of $250,000 premium)

Once I have these, I can have the policy issued same-day.

The quote is valid through Feb 18, so we have a bit of time, but I'd love to get this wrapped up for you.

Let me know if you need anything from my end.

Thanks,
Sarah`,
    },
    subjectivityChecklist: [
      { label: "Loss control survey", complete: true, detail: "Complete Feb 10" },
      { label: "Updated financials", complete: true, detail: "Received Feb 12" },
      { label: "Signed application", complete: false, detail: "Sent to client Feb 8, awaiting return" },
      { label: "Lender certificate", complete: false, detail: "Wells Fargo, 123 Main St, New York NY" },
      { label: "Premium deposit", complete: false, detail: "$62,500" },
    ],
  },
  s5: {
    contextItems: [
      "File is with UW Maria Lopez. All documents complete. On track for quote by Feb 13.",
    ],
    emailTypes: ["Status Update", "Request Additional Info", "Custom"],
    selectedType: "Status Update",
    generatedEmail: {
      subject: "Greenleaf Hosp -- Status Update",
      body: `Hi Jane,

Quick update on Greenleaf Hosp -- file is with our underwriter Maria Lopez for final review. All data orders are complete and the file looks clean.

Current timeline:
- UW review: In progress (expect complete by Feb 12)
- Quote delivery: Targeting Feb 13

Everything is tracking well. I'll reach out as soon as I have terms.

Let me know if your client has any timing concerns.

Thanks,
Sarah`,
    },
  },
  s6: {
    contextItems: [
      "File complete and quoted. No outstanding items.",
    ],
    emailTypes: ["Deliver Quote", "Follow-up on Decision", "Custom"],
    selectedType: "Follow-up on Decision",
    generatedEmail: {
      subject: "Metro Logistics -- Checking In on Quote",
      body: `Hi Tom,

Wanted to check in on Metro Logistics. We delivered the quote on Feb 5 at $312,000 -- has your client had a chance to review?

Happy to jump on a call if there are questions about terms or if we need to discuss anything.

Any sense of timing on a decision?

Thanks,
Sarah`,
    },
    aiInsight:
      "Quote is 14 days old. Industry benchmark: quotes over 10 days have 40% lower bind rate. Consider proactive follow-up.",
  },
}

export const escalateDataMap: Record<string, EscalateData> = {
  s1: {
    currentUW: "Robert Chen",
    aiAnalysis: "I've analyzed why you might be escalating. Select the reason or describe your own:",
    reasons: [
      { label: "Need deadline extension (quote expires Friday)", value: "deadline" },
      { label: "Need decision on proceeding without 5-year loss runs", value: "loss-runs" },
      { label: "Broker requesting pricing adjustment", value: "pricing" },
      { label: "Risk concern identified", value: "risk" },
      { label: "Custom reason", value: "custom" },
    ],
    defaultReason: "custom",
    prefilledMessage: `Jane is having difficulty obtaining 5-year loss runs from prior carrier (Hartford). Quote expires Friday.

Options:
1. Extend quote to Feb 21 to allow more time
2. Proceed with bind subject to loss runs
3. Accept 2-year loss runs + signed warranty

Recommend: Option 2 -- this is a clean account and Jane has strong track record. Request your guidance.`,
    fileContext: [
      { label: "Premium", value: "$245,000" },
      { label: "TIV", value: "$18.2M" },
      { label: "Loss history (2-year)", value: "Clean, $0 losses" },
      { label: "D&B Score", value: "72 (Low risk)" },
      { label: "Broker win rate", value: "68% with Jane Mitchell" },
    ],
    notificationPreview:
      "Robert Chen will receive Teams message + email with this escalation. Expected response: Within 4 hours (based on Robert's typical response time)",
  },
  s2: {
    currentUW: "Robert Chen",
    aiAnalysis: "This file is Day 1 in Intake. Escalation typically not needed at this stage. Did you want to:",
    reasons: [
      { label: "Fast-track: Request expedited UW review", value: "fast-track" },
      { label: "Flag risk concern: Something in submission needs early UW attention", value: "risk-flag" },
      { label: "Reassign: Request different UW", value: "reassign" },
    ],
    additionalFieldsOnReason: {
      "risk-flag": {
        fields: [
          { label: "Describe the concern", type: "textarea", placeholder: "Describe the concern..." },
        ],
      },
    },
    prefilledMessage:
      "Tom mentioned client has quote from Travelers expiring Feb 15. May need expedited review to compete.",
  },
  s3: {
    currentUW: "Maria Lopez",
    aiAnalysis: "LC survey blocked for 8 days. Here are the options:",
    reasons: [
      { label: "Continue waiting (risk losing deal)", value: "wait" },
      { label: "Proceed with desktop review only (no on-site survey)", value: "desktop" },
      { label: "Request broker escalate to client leadership", value: "broker-escalate" },
      { label: "Custom", value: "custom" },
    ],
    prefilledMessage: `LC survey blocked for 8 days -- vendor unable to reach insured despite 5 attempts.

Options:
1. Continue waiting (risk losing deal)
2. Proceed with desktop review only (no on-site survey)
3. Request broker escalate to client leadership

Recommend: Option 3 first, then consider Option 2 if still no response by Feb 12.

Question: Would you accept a desktop review for this account given clean loss history?`,
    fileContext: [
      { label: "Insured", value: "Johnson Mfg" },
      { label: "TIV", value: "$12.5M" },
      { label: "Loss history", value: "Clean (3 years)" },
      { label: "Prior carrier", value: "Travelers (non-renewed for premium, not loss)" },
    ],
  },
  s4: {
    currentUW: "Robert Chen",
    aiAnalysis: "File is ready to bind. What do you need from Robert?",
    reasons: [
      { label: "Need binding authority sign-off", value: "bind-signoff" },
      { label: "Client requesting last-minute term change", value: "term-change" },
      { label: "Subjectivity waiver request", value: "waiver" },
      { label: "Premium adjustment needed", value: "premium" },
      { label: "Custom", value: "custom" },
    ],
    defaultReason: "bind-signoff",
    prefilledMessage: `Westfield Props ready to bind. All subjectivities cleared:
[check] LC survey complete
[check] Financials received
[pending] Signed app expected today per broker

Request: Pre-approve binding authority so I can bind immediately upon receiving signed application.

Premium: $250,000
Terms: As quoted Feb 1`,
  },
  s5: {
    currentUW: "Maria Lopez",
    aiAnalysis: "File is On Track and Day 6. Escalation may not be needed. Did broker request expedite?",
    reasons: [
      { label: "Broker needs expedited quote", value: "expedite" },
      { label: "Question about risk I noticed", value: "risk-question" },
      { label: "Request to prioritize", value: "prioritize" },
      { label: "Custom", value: "custom" },
    ],
  },
  s6: {
    currentUW: "Robert Chen",
    aiAnalysis: "Quote delivered 14 days ago, no response from broker. What's happening?",
    reasons: [
      { label: "Broker says we're not competitive on price", value: "price" },
      { label: "Client requesting coverage change", value: "coverage" },
      { label: "Need to extend quote validity", value: "extend" },
      { label: "Broker says competitor offered lower", value: "competitor" },
      { label: "Custom", value: "custom" },
    ],
    additionalFieldsOnReason: {
      competitor: {
        fields: [
          { label: "Competitor", type: "dropdown", options: ["Travelers", "Chubb", "Hartford", "Liberty", "Other"] },
          { label: "Their premium (if known)", type: "text", placeholder: "$" },
          { label: "Broker's ask", type: "dropdown", options: ["Match?", "Get closer?", "Best and final?"] },
        ],
      },
    },
    prefilledMessage: `Tom Bradley says client received $285,000 indication from Travelers.

Our quote: $312,000 (9% higher)

Request: Can we revisit pricing? Account has clean loss history and strong protection.

Options:
1. Hold firm at $312K
2. Reduce to $295K (match + differentiate on service)
3. Offer multi-year deal at $305K/year`,
  },
}

export const markCompleteDataMap: Record<string, MarkCompleteData> = {
  s1: {
    status: "warning",
    warningMessage: "This file has open items. Are you sure you want to mark complete?",
    openItems: [
      { icon: "error", text: "5-year loss runs not received" },
      { icon: "error", text: "Quote not yet bound" },
      { icon: "warning", text: "Quote expires Friday" },
    ],
    reasons: [
      { label: "Bound -- policy issued", value: "bound" },
      { label: "Lost to competitor", value: "lost" },
      { label: "Broker withdrew submission", value: "withdrew" },
      { label: "Declined by UW", value: "declined" },
      { label: "Quote expired -- no response", value: "expired" },
      { label: "Other", value: "other" },
    ],
    lostCompetitorFields: true,
    aiInsight:
      "This data helps improve our win rate. Lost deals with documented reasons are reviewed monthly by UW leadership.",
  },
  s2: {
    status: "blocked",
    warningMessage: "This file is in Intake stage (Day 1). Cannot mark complete.",
    fileStatus: [
      { label: "Stage", value: "Intake" },
      { label: "Data orders", value: "Not started" },
      { label: "UW review", value: "Not started" },
      { label: "Quote", value: "Not issued" },
    ],
    reasons: [],
    alternativeActions: [
      { label: "Archive submission -- broker withdrew", action: "archive" },
      { label: "Decline submission -- doesn't meet appetite", action: "decline" },
    ],
  },
  s3: {
    status: "warning",
    warningMessage: "File is in UW Review with open LC survey. Are you sure?",
    reasons: [
      { label: "Bound", value: "bound" },
      { label: "Lost to competitor", value: "lost" },
      { label: "Broker withdrew", value: "withdrew" },
      { label: "Declined by UW", value: "declined" },
      { label: "Insured unresponsive -- closing file", value: "unresponsive" },
    ],
  },
  s4: {
    status: "allowed",
    warningMessage: "Completing a Bind-stage file. Please confirm outcome:",
    reasons: [
      { label: "Bound -- policy issued", value: "bound" },
      { label: "Lost to competitor", value: "lost" },
      { label: "Broker withdrew", value: "withdrew" },
      { label: "Declined -- subjectivities not met", value: "declined" },
    ],
    defaultReason: "bound",
    boundFields: true,
    aiCelebration: "Great work! This is your 3rd bind this month with broker David Park.",
  },
  s5: {
    status: "warning",
    warningMessage: "File is in UW Review -- not yet quoted. Are you sure?",
    reasons: [
      { label: "Bound", value: "bound" },
      { label: "Lost to competitor", value: "lost" },
      { label: "Broker withdrew", value: "withdrew" },
      { label: "Declined by UW", value: "declined" },
      { label: "Other", value: "other" },
    ],
  },
  s6: {
    status: "allowed",
    reasons: [
      { label: "Bound -- policy issued", value: "bound" },
      { label: "Lost to competitor", value: "lost" },
      { label: "Broker withdrew", value: "withdrew" },
      { label: "Quote expired -- no response", value: "expired" },
      { label: "Other", value: "other" },
    ],
    lostCompetitorFields: true,
    aiInsight:
      "This is the 2nd Metro-area logistics account lost to Travelers this quarter on price. Pattern flagged for UW leadership review.",
  },
}
