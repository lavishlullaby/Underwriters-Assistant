# UWA Agent -- Underwriting Assistant

An AI-powered command center for commercial property insurance underwriting assistants. Built with Next.js 16, Tailwind CSS, and shadcn/ui components.

---

## Overview

UWA Agent is a dashboard application designed for underwriting assistants at commercial property insurance carriers. It centralizes submission tracking, broker relationship management, internal queue monitoring, underwriter preference profiles, and AI-driven insights into a single workspace.

The application is built around the persona of **Emily Rodriguez**, an underwriting assistant managing a pipeline of 6 active submissions across 4 brokers and 2 underwriters.

---

## Features

### 1. Dashboard (Home)

The main command center displays:

- **Priority Action Cards** -- Color-coded (urgent/warning/info) cards for items needing immediate attention, such as expiring quotes, stuck surveys, and queue backlogs. Each card links to the relevant submission or queue.
- **Kanban Pipeline** -- A four-column board (Intake, UW Review, Quote, Bind) showing all active submissions. Each card displays the account name, broker, days in stage, risk status indicator, and next action. Cards are clickable and link to the full submission detail view.
- **AI Chat Panel** -- A sidebar-style conversational assistant (right rail on desktop, bottom section on mobile) with pre-built quick-action prompts like "Summarize my pipeline", "Draft broker email", and "Check data orders".

### 2. My Submissions (`/submissions`)

A full-width data table listing all active submissions with columns for:

- Account name
- Broker name
- Assigned underwriter
- Pipeline stage (color-coded chip)
- Days in pipeline
- Risk status (green/yellow/red badge)
- Next action
- Link to detail view

### 3. Submission Detail (`/submissions/[id]`)

A deep-dive view into a single submission organized into tabbed sections:

- **Overview Tab** -- AI-generated summary of the account, risk flags with color-coded badges, premium amount, and assigned personnel.
- **Documents Tab** -- Checklist of required documents (ACORD 125, SOV, Financials, Loss Runs, etc.) with status indicators (complete/pending/missing).
- **Data Orders Tab** -- Status of third-party data orders (ProMetrix, CLUE Report, D&B Financial) with status badges and last-updated timestamps.
- **Activity Tab** -- Chronological timeline of all actions taken on the submission, including system events and human actions.
- **AI Anomalies Tab** -- AI-detected anomalies and discrepancies requiring attention, displayed as warning-styled cards.

### 4. Queue Monitor (`/queue`)

A three-column Kanban-style board monitoring internal team queues:

- **Loss Control** -- Tracks survey scheduling, vendor coordination, and completion status.
- **Compliance / Filing** -- Monitors regulatory review progress and endorsement language.
- **Policy Issuance** -- Tracks rating completion and policy document generation.

Each card shows the file name, assigned owner, status badge, days in queue, and any blockers (displayed as red alert callouts). An AI insight banner at the top provides a summary of queue health and staffing alerts.

### 5. Broker Hub (`/brokers`)

An expandable card list of all broker contacts featuring:

- **Header Row** -- Avatar initials, name, firm, active submission count, last contact date, relationship score (color-coded), and quick-action icons (phone/email/history).
- **Expanded Detail** (click to toggle):
  - **Preferences** -- Communication style, CC list rules, and typical submission gaps.
  - **Submission History** -- Total submissions, win rate percentage, and average cycle time displayed as metric cards.
  - **AI Note** -- An AI-generated relationship brief with behavioral patterns and tips.

### 6. UW Preferences (`/uw-preferences`)

Profile cards for each underwriter showing:

- **Workload Bar** -- Visual progress bar with color coding (green/amber/red) based on capacity percentage. Shows current vs. maximum active files.
- **Risk Appetite** -- Description of preferred account types and D&B score thresholds.
- **Preferred Format** -- How they want materials presented (PDF summaries, spreadsheets, etc.).
- **Presentation Style** -- Executive summary vs. deep-dive preference.
- **Pet Peeves** -- Highlighted warning cards listing specific preferences and things to avoid.

### 7. AI Insights (`/ai-insights`)

A dedicated analytics and recommendations page with:

- **Key Metrics Row** -- Four metric cards showing Average Cycle Time, Active Submissions, Broker Win Rate, and Projected Premium with trend indicators.
- **Pipeline Health** -- AI analysis of pipeline velocity, bind-stage improvements, and portfolio summary.
- **Risk Alerts** -- Flagged items requiring attention with severity context and historical probability data.
- **Recommendations** -- Proactive suggestions for workflow optimization, workload balancing, and priority actions.

---

## Tech Stack

| Layer          | Technology                                        |
| -------------- | ------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router)    |
| Language       | [TypeScript](https://www.typescriptlang.org/)     |
| Styling        | [Tailwind CSS 3](https://tailwindcss.com/)        |
| UI Components  | [shadcn/ui](https://ui.shadcn.com/) + Radix UI   |
| Icons          | [Lucide React](https://lucide.dev/)               |
| Fonts          | Geist Sans + Geist Mono (via `next/font/google`)  |

---

## Project Structure

```
app/
  layout.tsx                     # Root layout with sidebar shell
  page.tsx                       # Dashboard (home) page
  globals.css                    # Global styles and design tokens
  submissions/
    page.tsx                     # Submissions table
    [id]/
      page.tsx                   # Submission detail (tabbed view)
  queue/
    page.tsx                     # Queue monitor (3-column Kanban)
  brokers/
    page.tsx                     # Broker hub (expandable cards)
  uw-preferences/
    page.tsx                     # UW preference profiles
  ai-insights/
    page.tsx                     # AI insights and metrics

components/
  app-sidebar.tsx                # Left navigation sidebar
  status-badge.tsx               # Risk status indicator (green/yellow/red)
  ai-insight-card.tsx            # Reusable AI insight callout card
  dashboard/
    priority-cards.tsx           # Priority action cards
    kanban-pipeline.tsx          # Kanban board component
    ai-chat-panel.tsx            # AI chat sidebar panel
  submissions/
    submission-detail.tsx        # Tabbed submission detail view

lib/
  data.ts                        # Mock data layer (types + sample data)
  utils.ts                       # Utility functions (cn class merger)
```

---

## Data Model

All data is currently served from a local mock data layer (`lib/data.ts`). Key types include:

- **`Submission`** -- Full submission record including account info, broker, underwriter, pipeline stage, risk status, documents, data orders, activity timeline, AI summary, and detected anomalies.
- **`PriorityItem`** -- Dashboard priority cards with type (urgent/warning/info), description, and linked actions.
- **`QueueItem`** -- Internal queue entries for Loss Control, Compliance, and Policy Issuance teams.
- **`Broker`** -- Broker profiles with relationship scores, communication preferences, submission history metrics, and AI notes.
- **`UWProfile`** -- Underwriter profiles with workload, risk appetite, format preferences, and pet peeves.

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/lavishlullaby/Underwriters-Assistant.git
cd Underwriters-Assistant

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Design System

The application uses a custom design token system defined in `app/globals.css` with support for light and dark themes. Key tokens include:

- **Primary**: Deep navy (`222.2 47.4% 11.2%`) for the main brand color
- **Background/Foreground**: Clean white and near-black for content contrast
- **Muted**: Subtle grays for secondary content and backgrounds
- **Accent**: Matching muted tones for interactive hover states
- **Destructive**: Red tones for error states and critical alerts
- **Sidebar**: Dedicated tokens for the navigation sidebar

Status colors use semantic Tailwind classes:
- **Green** (`emerald`) -- On track, no issues
- **Yellow** (`amber`) -- Attention needed, minor concern
- **Red** (`red`) -- Urgent, critical action required

---

## Deployment

The project is configured for deployment on [Vercel](https://vercel.com/). Push to the `main` branch or use the Vercel CLI:

```bash
npx vercel
```

---

## Future Enhancements

- Database integration (Supabase or Neon) to replace mock data
- Real-time AI chat powered by Vercel AI SDK
- File upload for submission documents
- Email drafting and sending via broker communication panel
- Role-based access control for underwriters vs. assistants
- Notification system for priority alerts
- Search and filtering across submissions
- Analytics dashboards with Recharts visualizations

---

## License

This project is private and proprietary.
