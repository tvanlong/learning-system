import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

import PageNotFound from '@/app/not-found'
import { getUserInfo } from '@/lib/actions/user.actions'
import { EUserRole } from '@/types/enums'

interface IAdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = async ({ children }: IAdminLayoutProps) => {
  const { userId } = auth()
  if (!userId) return redirect('/sign-in')
  const user = await getUserInfo({ userId })

  if (user && user.role !== EUserRole.ADMIN) return <PageNotFound />

  return <div>{children}</div>
}

export default AdminLayout
