import { ActiveLink } from '@/components/common/active-link'
import { MenuItemProps } from '@/types'

export function MenuItem({ url = '/', title = '', icon, onlyIcon }: MenuItemProps) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {onlyIcon ? null : title}
      </ActiveLink>
    </li>
  )
}
