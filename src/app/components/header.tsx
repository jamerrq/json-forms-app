'use client'

import { usePathname } from 'next/navigation'

function HeaderButton ({ href, children, isActive }: {
  href: string
  children: React.ReactNode
  isActive?: boolean
}) {
  return (
    <a href={href} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 text-center"
    style={{
      borderBottomWidth: isActive === true ? '2px' : '1px',
      borderBottomColor: isActive === true ? '#4ADE80' : 'var(--gray-100)'
    }}>
      {children}
      </a>
  )
}

export default function Header () {
  const pathname = usePathname()
  return (
    <div className="flex gap-5 flex-row justify-center mt-5 font-bold">
      <HeaderButton href="/" isActive={pathname === '/'}>Convertidor</HeaderButton>
      <HeaderButton href="/forms" isActive={pathname === '/forms'}>Formularios</HeaderButton>
      <HeaderButton href="/instructions" isActive={pathname === '/instructions'}>Información</HeaderButton>
    </div>
  )
}
