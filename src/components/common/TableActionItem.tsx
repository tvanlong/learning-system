import Link from 'next/link'

import { commonClassNames } from '@/constants'

import { IconCheck, IconDelete, IconEdit, IconEye, IconStudy } from '../icons'

type TableActionIcon = 'edit' | 'delete' | 'view' | 'study' | 'approve'

interface ITableActionItemProps {
  onClick?: () => void
  type: TableActionIcon
  url?: string
}

const TableActionItem = ({ onClick, type, url }: ITableActionItemProps) => {
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

export default TableActionItem
