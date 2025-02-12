import { auth } from '@clerk/nextjs/server'
import { Suspense } from 'react'

import PageNotFound from '@/app/not-found'
import { getUserInfo } from '@/lib/actions/user.actions'

import LoadingPlayer from './@player/LoadingPlayer'
import LoadingOutline from './@outline/LoadingOutline'
import LessonWrapper from './LessonWrapper'

const Layout = async ({ player, outline }: { player: React.ReactNode; outline: React.ReactNode }) => {
  const { userId } = auth()
  if (!userId) return <PageNotFound />
  const findUser = await getUserInfo({ userId })
  if (!findUser) return <PageNotFound />

  return (
    <LessonWrapper>
      <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </LessonWrapper>
  )
}

export default Layout
