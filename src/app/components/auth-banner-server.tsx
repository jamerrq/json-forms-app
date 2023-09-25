import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthBannerClient } from '@/app/components/auth-banner-client'

export async function AuthBanner () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  return <AuthBannerClient session={session} />
}
