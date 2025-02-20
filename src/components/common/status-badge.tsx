import { commonClassNames } from '@/constants'
import { cn } from '@/lib/utils'

interface IStatusBadgeProps {
  item?: {
    className?: string
    title: string
  }
  onClick?: () => void
}

export const StatusBadge = ({ item, onClick }: IStatusBadgeProps) => {
  return (
    <span className={cn(commonClassNames.status, item?.className)} onClick={onClick}>
      {item?.title}
    </span>
  )
}
