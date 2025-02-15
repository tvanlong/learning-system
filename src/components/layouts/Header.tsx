'use client'

import { useAuth, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

import { ModeToggle } from '@/components/common/ModeToggle'
import { IconUsers } from '@/components/icons'

import { InstructionsButton } from '../common'

const Header = () => {
  const { userId } = useAuth()

  return (
    <div className='py-3 px-5 bgDarkMode flex items-center justify-between gap-5 static lg:fixed top-0 left-[300px] right-0 z-50 xl:h-16 shadow-sm'>
      <Link className='font-bold text-xl inline-flex items-baseline gap-0.5 lg:hidden' href='/'>
        <Image alt='Ucademy' src='/logo.png' width={20} height={20} />
        <span className='text-primary'>cademy</span>
      </Link>
      <div className='rounded-full gap-4 h-10 px-5 bgDarkMode w-[min(100%,390px)] items-center lg:flex hidden borderDarkMode'>
        <InstructionsButton />
      </div>
      <div className='flex items-center gap-3'>
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

export default Header
