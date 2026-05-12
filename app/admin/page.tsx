import { listCoaches, loadCoach } from "./actions"
import AdminClient from "./AdminClient"

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ coach?: string }>
}) {
  const params = await searchParams
  const coaches = await listCoaches()
  const initialSlug = params.coach ?? ""
  const initialRaw = initialSlug ? await loadCoach(initialSlug) : null

  return (
    <AdminClient
      coaches={coaches}
      initialSlug={initialSlug}
      initialRaw={initialRaw}
    />
  )
}
