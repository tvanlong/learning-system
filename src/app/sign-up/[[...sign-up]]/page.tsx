import { SignUp } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng ký tài khoản',
  description: 'Đăng ký tài khoản',
  icons: '/logo.png'
}

export default function Page() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <SignUp />
    </div>
  )
}
