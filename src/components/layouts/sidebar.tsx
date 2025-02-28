'use client'

import { useAuth, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

import { ModeToggle } from '@/components/common/mode-toggle'
import { IconUsers } from '@/components/icons/icon-users'
import { menuItems } from '@/constants'

import { MenuItem } from './menu-item'

export const Sidebar = () => {
  const { userId } = useAuth()

  return (
    <div className='hidden p-5 border-r borderDarkMode bgDarkMode lg:flex flex-col fixed top-0 left-0 bottom-0 w-[300px]'>
      <Link href='/' className='font-bold text-3xl inline-flex items-baseline gap-0.5 mb-5 h-10 self-start pl-3'>
        <Image alt='Ucademy' src='/icon.png' width={32} height={32} />
        <span className='text-primary'>cademy</span>
      </Link>
      <ul className='flex flex-col gap-2'>
        {menuItems.map((item, index) => (
          <MenuItem key={index} url={item.url} title={item.title} icon={item.icon} />
        ))}
      </ul>
      <div className='mt-auto flex items-center justify-end gap-5'>
        <ModeToggle />
        {!userId ? (
          <Link
            href='/sign-in'
            className='size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1'
          >
            <IconUsers />
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  )
}
