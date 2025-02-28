import { auth } from '@clerk/nextjs/server'
import { Suspense } from 'react'

import PageNotFound from '@/app/not-found'
import { LessonWrapper } from '@/components/lesson/lesson-wrapper'
import { LoadingOutline } from '@/components/lesson/loading-outline'
import { LoadingPlayer } from '@/components/lesson/loading-player'
import { getUserInfo } from '@/lib/actions/user.actions'

interface ILayoutProps {
  player: React.ReactNode
  outline: React.ReactNode
  comment: React.ReactNode
}

const Layout = async ({ player, outline, comment }: ILayoutProps) => {
  const { userId } = auth()
  if (!userId) return <PageNotFound />
  const findUser = await getUserInfo({ userId })
  if (!findUser) return <PageNotFound />

  return (
    <LessonWrapper>
      <Suspense fallback={<LoadingPlayer />}>
        <div>
          {player}
          {comment}
        </div>
      </Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </LessonWrapper>
  )
}

export default Layout
