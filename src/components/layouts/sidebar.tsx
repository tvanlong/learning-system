'use client'

import Image from 'next/image'
import Link from 'next/link'

import { menuItems } from '@/constants'

import { MenuItem } from './menu-item'

export const Sidebar = () => {
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
    </div>
  )
}
