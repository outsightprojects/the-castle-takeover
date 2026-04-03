'use client'

import { use } from 'react'
import { PageShell } from '@/components/page-shell'
import { HomeContent } from '@/components/home-content'

export default function InvitationPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = use(params)

  return (
    <PageShell>
      <HomeContent guestName={decodeURIComponent(name)} />
    </PageShell>
  )
}
