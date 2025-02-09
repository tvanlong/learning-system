'use client';

import { menuItems } from '@/constants';
import { ActiveLink } from '@/components/common';
import { MenuItemProps } from '@/types';
import { useAuth, UserButton } from '@clerk/nextjs';
import { ModeToggle } from '../common/ModeToggle';
import { IconUsers } from '../icons';
import Link from 'next/link';
import Image from 'next/image';

const Sidebar = () => {
  const { userId } = useAuth();

  return (
    <div className='hidden p-5 border-r borderDarkMode bgDarkMode lg:flex flex-col fixed top-0 left-0 bottom-0 w-[300px]'>
      <Link
        href='/'
        className='font-bold text-3xl inline-flex items-baseline gap-0.5 mb-5 h-10 self-start pl-3'
      >
        <Image alt='Ucademy' src='/logo.png' width={20} height={20} />
        <span className='text-primary'>cademy</span>
      </Link>
      <ul className='flex flex-col gap-2'>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          ></MenuItem>
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
  );
};

export function MenuItem({
  url = '/',
  title = '',
  icon,
  onlyIcon,
}: MenuItemProps) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {onlyIcon ? null : title}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
