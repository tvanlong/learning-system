import Link from 'next/link'

import { IconPlus } from '@/components/icons/icon-plus'

export const BouncedLink = ({ url }: { url: string }) => {
  return (
    <Link
      href={url}
      className='size-10 rounded-full bg-primary flex justify-center items-center text-white fixed right-5 bottom-5 animate-bounce'
    >
      <IconPlus />
    </Link>
  )
}
