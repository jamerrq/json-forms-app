import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthBannerClient } from '@/app/components/auth-banner-client'
import { IconCodeCircle } from '@tabler/icons-react'

export async function AuthBanner () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div className="">
      <AuthBannerClient session={session} />
      {
        process.env.NODE_ENV === 'development' && (
          <IconCodeCircle className="text-[#22C55E] fixed bottom-1 right-1" color="#4ADE80"/>
        )
      }
    </div>
  )
}
