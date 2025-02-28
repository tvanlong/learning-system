import { SignIn } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng nhập tài khoản',
  description: 'Đăng nhập tài khoản',
  icons: '/logo.png'
}

export default function Page() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <SignIn />
    </div>
  )
}
