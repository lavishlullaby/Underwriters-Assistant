import { notFound } from "next/navigation"
import { submissions } from "@/lib/data"
import { SubmissionDetail } from "@/components/submissions/submission-detail"

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const submission = submissions.find((s) => s.id === id)

  if (!submission) {
    notFound()
  }

  return <SubmissionDetail submission={submission} />
}
