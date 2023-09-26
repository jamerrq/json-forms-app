// 'use client'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import Dropzone from '@/app/components/dropzone'

export default async function Home () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  return (
    <main className="flex flex-col items-center justify-center p-6">
      <Dropzone session={session}/>
    </main>
  )
}
