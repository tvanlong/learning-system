import { RatingManage } from '@/components/rating/rating-manage'
import { getRatings } from '@/lib/actions/rating.actions'
import { ERatingStatus } from '@/types/enums'

interface IPageProps {
  searchParams: {
    page: number
    search: string
    status: ERatingStatus
  }
}

const page = async ({ searchParams }: IPageProps) => {
  const ratings = await getRatings({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search,
    status: searchParams.status
  })
  return <RatingManage ratings={ratings} />
}

export default page
