import Link from 'next/link'

import { IconCheck } from '@/components/icons/icon-check'
import { IconDelete } from '@/components/icons/icon-delete'
import { IconEdit } from '@/components/icons/icon-edit'
import { IconEye } from '@/components/icons/icon-eye'
import { IconStudy } from '@/components/icons/icon-study'
import { commonClassNames } from '@/constants'

type TableActionIcon = 'edit' | 'delete' | 'view' | 'study' | 'approve'

interface ITableActionItemProps {
  onClick?: () => void
  type: TableActionIcon
  url?: string
}

export const TableActionItem = ({ onClick, type, url }: ITableActionItemProps) => {
  const icon: Record<TableActionIcon, JSX.Element> = {
    edit: <IconEdit />,
    delete: <IconDelete />,
    view: <IconEye />,
    study: <IconStudy />,
    approve: <IconCheck />
  }
  if (url)
    return (
      <Link href={url} className={commonClassNames.action}>
        {icon[type]}
      </Link>
    )
  return (
    <button className={commonClassNames.action} onClick={onClick}>
      {icon[type]}
    </button>
  )
}
