import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Header from '@/app/components/header'
import { AuthBanner } from '@/app/components/auth-banner-server'

export const dynamic = 'force-dynamic'

const spaceGrotesk = localFont({
  src: '../../public/fonts/SpaceGrotesk-VariableFont_wght.ttf'
})

export const metadata: Metadata = {
  title: 'Json Forms Generator',
  description: 'Generador de formularios a partir de un archivo JSON'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <Header />
        {children}
        <AuthBanner />
      </body>
    </html>
  )
}
