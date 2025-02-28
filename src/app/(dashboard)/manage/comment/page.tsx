import type { Metadata } from 'next'

import { Heading } from '@/components/common/heading'

export const metadata: Metadata = {
  title: 'Quản lý bình luận',
  description: 'Quản lý bình luận',
  icons: '/logo.png'
}

const page = () => {
  return (
    <>
      <Heading>Quản lý bình luận</Heading>
    </>
  )
}

export default page
