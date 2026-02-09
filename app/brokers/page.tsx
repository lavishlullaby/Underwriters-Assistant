"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Phone,
  Mail,
  History,
  ChevronDown,
  ChevronUp,
  FileText,
  Star,
  Linkedin,
  MapPin,
  Clock,
  AlertTriangle,
  Calendar,
  PenLine,
  ExternalLink,
  Target,
  ClipboardList,
  TrendingUp,
  Award,
  BarChart3,
  Sparkles,
} from "lucide-react"
import { brokers, submissions } from "@/lib/data"
import { brokerDetailMap } from "@/lib/broker-details"
import type { TimelineEntry, ActiveSubmissionRow } from "@/lib/broker-details"
import { cn } from "@/lib/utils"

/* ── Helpers ──────────────────────────────────────────────────── */

function scoreColor(score: number) {
  if (score >= 85) return "text-emerald-700 bg-emerald-50 border-emerald-200"
  if (score >= 70) return "text-amber-700 bg-amber-50 border-amber-200"
  return "text-red-700 bg-red-50 border-red-200"
}

const riskDot: Record<string, string> = {
  green: "bg-[#22C55E]",
  yellow: "bg-[#F59E0B]",
  red: "bg-[#EF4444]",
}

const riskLabel: Record<string, string> = {
  green: "On Track",
  yellow: "Attention",
  red: "At Risk",
}

const avatarColors: Record<string, string> = {
  "Jane Mitchell": "#8B5CF6",
  "Tom Bradley": "#3B82F6",
  "Sarah Kim": "#F59E0B",
  "David Park": "#10B981",
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function BrokerHubPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Broker Hub</h1>
        <p className="text-sm text-muted-foreground">
          Manage broker relationships, preferences, and submission history
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {brokers.map((broker) => {
          const isExpanded = expandedId === broker.id
          const detail = brokerDetailMap[broker.id]
          const initials = broker.name
            .split(" ")
            .map((n) => n[0])
            .join("")
          const avatarBg = avatarColors[broker.name] ?? "#6366F1"

          return (
            <div
              key={broker.id}
              className={cn(
                "overflow-hidden rounded-lg border bg-card transition-shadow",
                isExpanded
                  ? "border-primary/30 shadow-md"
                  : "border-border shadow-sm"
              )}
            >
              {/* ── Collapsed header row ───────────────────────── */}
              <button
                type="button"
                onClick={() =>
                  setExpandedId(isExpanded ? null : broker.id)
                }
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/30"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ background: avatarBg }}
                >
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {broker.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {broker.firm}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {broker.activeSubmissions} active
                    </span>
                    <span>Last contact: {broker.lastContact}</span>
                  </div>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                    scoreColor(broker.relationshipScore)
                  )}
                >
                  <Star className="h-3 w-3" />
                  {broker.relationshipScore}
                </span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted">
                    <History className="h-3.5 w-3.5" />
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* ── Expanded detail ────────────────────────────── */}
              {isExpanded && detail && (
                <div className="border-t border-border">
                  {/* Row 1: Contact + Preferences + Stats & AI */}
                  <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-3">
                    {/* Contact Info */}
                    <div className="bg-card p-5">
                      <SectionHeading>Contact Info</SectionHeading>
                      <div className="flex flex-col gap-2.5">
                        <ContactRow icon={<Phone className="h-3.5 w-3.5" />} label="Office" value={detail.contact.office} />
                        <ContactRow icon={<Phone className="h-3.5 w-3.5" />} label="Mobile" value={detail.contact.mobile} />
                        <ContactRow icon={<Mail className="h-3.5 w-3.5" />} label="Email" value={detail.contact.email} />
                        <ContactRow icon={<Linkedin className="h-3.5 w-3.5" />} label="LinkedIn" value={detail.contact.linkedin} />
                        <ContactRow icon={<MapPin className="h-3.5 w-3.5" />} label="Location" value={`${detail.contact.location} (${detail.contact.timezone})`} />
                        <ContactRow icon={<Clock className="h-3.5 w-3.5" />} label="Best time" value={detail.contact.bestTimeToCall} />
                        <ContactRow icon={<AlertTriangle className="h-3.5 w-3.5 text-amber-500" />} label="Avoid" value={detail.contact.avoid} />
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-card p-5">
                      <SectionHeading>Preferences</SectionHeading>
                      <div className="flex flex-col gap-3">
                        <PreferenceItem label="Communication" value={broker.preferences.communicationStyle} />
                        <PreferenceItem label="CC List" value={broker.preferences.ccList} />
                        <PreferenceItem label="Typical Gaps" value={broker.preferences.typicalGaps} />
                      </div>
                    </div>

                    {/* Stats + AI Insight */}
                    <div className="bg-card p-5">
                      <SectionHeading>Submission History</SectionHeading>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <StatBox value={String(broker.history.totalSubmissions)} label="Total" />
                        <StatBox value={`${broker.history.winRate}%`} label="Win Rate" />
                        <StatBox value={broker.history.avgCycleTime} label="Avg Cycle" />
                      </div>
                      <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-3">
                        <div className="mb-1.5 flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                          <span className="text-xs font-semibold text-blue-700">AI Insight</span>
                        </div>
                        <p className="text-xs text-blue-800 leading-relaxed">{broker.aiNote}</p>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Relationship Timeline */}
                  <div className="border-t border-border bg-card p-5">
                    <div className="flex items-center justify-between mb-4">
                      <SectionHeading className="mb-0">Relationship Timeline</SectionHeading>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted"
                      >
                        <PenLine className="h-3 w-3" />
                        Add
                      </button>
                    </div>
                    <div className="relative ml-3 border-l-2 border-border pl-6">
                      {detail.timeline.map((entry, idx) => (
                        <TimelineItem key={entry.id} entry={entry} isLast={idx === detail.timeline.length - 1} />
                      ))}
                    </div>
                  </div>

                  {/* Row 3: Relationship Insights */}
                  <div className="border-t border-border bg-card">
                    <div className="p-5">
                      <SectionHeading>Relationship Insights</SectionHeading>
                    </div>
                    <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-2">
                      {/* Left: Profile + Values */}
                      <div className="bg-card p-5 pt-0">
                        <div className="flex flex-col gap-5">
                          {/* Broker Profile */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Broker Profile</span>
                            </div>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                              <ProfileRow label="Since" value={detail.profile.relationshipSince} />
                              <ProfileRow label="Accounts placed" value={String(detail.profile.totalAccountsPlaced)} />
                              <ProfileRow label="Total premium" value={detail.profile.totalPremium} />
                              <ProfileRow label="YoY growth" value={detail.profile.yoyGrowth} />
                              <ProfileRow label="Avg deal size" value={detail.profile.avgDealSize} />
                              <ProfileRow label="Loss ratio" value={detail.profile.lossRatio} />
                            </div>
                          </div>

                          {/* What broker values */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Award className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What {broker.name.split(" ")[0]} Values</span>
                            </div>
                            <ul className="flex flex-col gap-1">
                              {detail.values.values.map((v) => (
                                <li key={v} className="text-xs text-foreground leading-relaxed flex items-start gap-1.5">
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                                  {v}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Pain points */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pain Points</span>
                            </div>
                            <ul className="flex flex-col gap-1">
                              {detail.values.painPoints.map((p) => (
                                <li key={p} className="text-xs text-foreground leading-relaxed flex items-start gap-1.5">
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Right: Intel from broker + Market */}
                      <div className="bg-card p-5 pt-0">
                        <div className="flex flex-col gap-5">
                          {/* Intel from broker */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Target className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Intel from {broker.name.split(" ")[0]} (Last 90 days)
                              </span>
                            </div>
                            <ul className="flex flex-col gap-1.5">
                              {detail.marketIntel.intelFromBroker.map((i) => (
                                <li key={i} className="rounded-md bg-muted/50 px-3 py-2 text-xs text-foreground leading-relaxed">
                                  &ldquo;{i}&rdquo;
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Market intel */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Market Intel</span>
                            </div>
                            <ul className="flex flex-col gap-1">
                              {detail.marketIntel.marketTrends.map((t) => (
                                <li key={t} className="text-xs text-foreground leading-relaxed flex items-start gap-1.5">
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Active Submissions */}
                  <div className="border-t border-border bg-card p-5">
                    <SectionHeading>
                      Active Submissions with {broker.name.split(" ")[0]}
                    </SectionHeading>
                    <div className="flex flex-col gap-2">
                      {detail.activeSubmissions.map((sub) => (
                        <ActiveSubRow key={sub.id} sub={sub} />
                      ))}
                    </div>
                  </div>

                  {/* Row 5: Quick Actions */}
                  <div className="border-t border-border bg-muted/30 px-5 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <QuickAction icon={<Phone className="h-3.5 w-3.5" />} label={`Call ${broker.name.split(" ")[0]}`} />
                      <QuickAction icon={<Mail className="h-3.5 w-3.5" />} label="Draft Email" />
                      <QuickAction icon={<Calendar className="h-3.5 w-3.5" />} label="Schedule Meeting" />
                      <QuickAction icon={<PenLine className="h-3.5 w-3.5" />} label="Log Interaction" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Sub-components ───────────────────────────────────────────── */

function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h4
      className={cn(
        "mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
        className
      )}
    >
      {children}
    </h4>
  )
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-muted-foreground shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-xs text-foreground break-all">{value}</p>
      </div>
    </div>
  )
}

function PreferenceItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
      <p className="text-xs text-foreground leading-relaxed">{value}</p>
    </div>
  )
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-muted p-2.5 text-center">
      <p className="text-base font-bold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  )
}

function TimelineItem({
  entry,
  isLast,
}: {
  entry: TimelineEntry
  isLast: boolean
}) {
  const isPhone = entry.type === "phone"
  return (
    <div className={cn("relative pb-5", isLast && "pb-0")}>
      {/* Dot on the line */}
      <span
        className={cn(
          "absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background",
          isPhone ? "bg-blue-500" : "bg-amber-500"
        )}
      >
        {isPhone ? (
          <Phone className="h-2 w-2 text-white" />
        ) : (
          <Mail className="h-2 w-2 text-white" />
        )}
      </span>

      {/* Content */}
      <div className="rounded-lg border border-border bg-muted/30 p-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground">
              {entry.date}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {entry.label}
              {entry.duration && ` (${entry.duration})`}
              {entry.messageCount && ` (${entry.messageCount} messages)`}
            </span>
          </div>
          <button
            type="button"
            className="text-[11px] font-medium text-primary hover:underline flex items-center gap-0.5"
          >
            {isPhone ? "View notes" : "View full thread"}
            <ExternalLink className="h-2.5 w-2.5" />
          </button>
        </div>

        {entry.subject && (
          <p className="text-[11px] text-muted-foreground mb-1">
            Subject: &ldquo;{entry.subject}&rdquo;
          </p>
        )}

        <p className="text-xs text-foreground leading-relaxed mb-2">
          {entry.summary}
        </p>

        {(entry.intelCaptured || entry.actionTaken) && (
          <div className="flex flex-col gap-1">
            {entry.intelCaptured && (
              <div className="flex items-start gap-1.5 rounded bg-purple-50 px-2 py-1">
                <Target className="h-3 w-3 mt-0.5 shrink-0 text-purple-600" />
                <span className="text-[11px] text-purple-800">
                  Intel captured: &ldquo;{entry.intelCaptured}&rdquo;
                </span>
              </div>
            )}
            {entry.actionTaken && (
              <div className="flex items-start gap-1.5 rounded bg-blue-50 px-2 py-1">
                <ClipboardList className="h-3 w-3 mt-0.5 shrink-0 text-blue-600" />
                <span className="text-[11px] text-blue-800">
                  Action taken: {entry.actionTaken}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ActiveSubRow({ sub }: { sub: ActiveSubmissionRow }) {
  return (
    <Link
      href={`/submissions/${sub.id}`}
      className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 px-4 py-3 transition-colors hover:bg-muted/50"
    >
      <span className="text-sm font-medium text-foreground flex-1 min-w-0 truncate">
        {sub.account}
      </span>
      <span className="text-xs text-muted-foreground shrink-0">{sub.stage}</span>
      <span className="inline-flex items-center gap-1 shrink-0">
        <span className={cn("h-1.5 w-1.5 rounded-full", riskDot[sub.riskStatus])} />
        <span className="text-[11px] font-medium text-muted-foreground">
          {riskLabel[sub.riskStatus]}
        </span>
      </span>
      <span className="text-xs font-medium text-foreground shrink-0 w-14 text-right">
        {sub.premium}
      </span>
      <span className="text-xs text-muted-foreground shrink-0 w-8 text-right">
        {sub.daysInPipeline}d
      </span>
      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
    </Link>
  )
}

function QuickAction({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
    >
      {icon}
      {label}
    </button>
  )
}
