'use client';

import { menuItems } from '@/constants';
import { ActiveLink } from '@/components/common';
import { MenuItemProps } from '@/types';
import { useAuth, UserButton } from '@clerk/nextjs';
import { ModeToggle } from '../common/ModeToggle';
import { IconUsers } from '../icons';
import Link from 'next/link';

const Sidebar = () => {
  const { userId } = useAuth();

  return (
    <div className='p-5 border-r border-r-gray-200 bg-white flex flex-col dark:bg-grayDarker dark:border-opacity-10'>
      <a href='/' className='font-bold text-3xl inline-block mb-5'>
        <span className='text-primary'>U</span>cademy
      </a>
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

        {userId ? (
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

function MenuItem({ url = '/', title = '', icon }: MenuItemProps) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
