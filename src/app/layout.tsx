import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/app/components/header'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
