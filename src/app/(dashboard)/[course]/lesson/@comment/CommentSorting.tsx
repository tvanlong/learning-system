'use client'

import { useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import useQueryString from '@/hooks/useQueryString'

const CommentSorting = () => {
  const params = useSearchParams()
  const sortValue = params.get('sort')
  const { createQueryString } = useQueryString()

  const handleSortComment = () => {
    createQueryString('sort', sortValue === 'recent' ? 'oldest' : 'recent')
  }

  return (
    <Select onValueChange={handleSortComment}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Sắp xếp' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sắp xếp theo:</SelectLabel>
          <SelectItem value='recent'>bình luận mới nhất</SelectItem>
          <SelectItem value='oldest'>bình luận cũ nhất</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default CommentSorting
