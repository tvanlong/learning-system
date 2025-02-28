import type { Metadata } from 'next'

import { Heading } from '@/components/common/heading'

export const metadata: Metadata = {
  title: 'Quản lý thành viên',
  description: 'Quản lý thành viên',
  icons: '/logo.png'
}

const page = () => {
  return (
    <>
      <Heading>Quản lý thành viên</Heading>
    </>
  )
}

export default page
