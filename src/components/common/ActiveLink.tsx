'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ActiveLinkProps } from '@/types'

const ActiveLink = ({ url, children }: ActiveLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === url

  return (
    <Link
      href={url}
      className={`p-3 rounded-md flex items-center gap-3 transition-all font-medium ${
        isActive
          ? 'text-white bg-primary svg-animate font-semibold'
          : 'hover:text-primary hover:bg-opacity-10 hover:bg-primary dark:hover:text-white'
      }`}
    >
      {children}
    </Link>
  )
}

export default ActiveLink
