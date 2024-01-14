'use client'

import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import GitHubIcon from '../icons/GithubIcon'
import { IconLogout } from '@tabler/icons-react'
import Image from 'next/image'

const REDIRECTION_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/auth/callback' : 'https://json-forms-app.vercel.app/auth/callback'

export function AuthBannerClient ({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: REDIRECTION_URL
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const buttonStyle = 'text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 self-center'

  return (
    <header className="flex fixed bottom-0 backdrop-blur-2xl py-1 items-center justify-center gap-2 w-full bg-[#475569]">
      {
        session === null
          ? (
            <button onClick={handleSignIn} type="button" className={buttonStyle}>
              <GitHubIcon />
              Iniciar sesión con Github
            </button>
            )
          : (
            <div className="flex gap-2 items-center">
              <Image src={session.user?.user_metadata?.avatar_url} alt="" width={40} height={40} className="rounded-xl border-2 border-[#4ADE80] inline">
              </Image>
          <button className={buttonStyle} onClick={handleSignOut}>
            <div title="Local Environment">
            <IconLogout />
            </div>
            &nbsp;Cerrar sesión
          </button>
            </div>
            )
      }
    </header>
  )
}
