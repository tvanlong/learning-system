import { ObjectId } from 'mongoose'
import { Manrope } from 'next/font/google'

import { ICommentItem } from '@/types'

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope'
})

export const createOrderCode = () => `DH-${new Date().getTime().toString().slice(-6)}`

export const formatNumberToK = (views: number) => {
  if (views < 1000) return views
  return `${(views / 1000).toFixed(1)}k`
}

export const formatMinutesToHour = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainMinutes = minutes % 60
  return `${hours}h${remainMinutes}p`
}

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('vi-VN')
}
export const timeAgo = (date: string | Date): string => {
  const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  const units = [
    { label: 'năm', value: 31536000 },
    { label: 'tháng', value: 2592000 },
    { label: 'ngày', value: 86400 },
    { label: 'giờ', value: 3600 },
    { label: 'phút', value: 60 },
    { label: 'giây', value: 1 }
  ]
  for (const { label, value } of units) {
    const amount = Math.floor(diff / value)
    if (amount > 0) return `${amount} ${label} trước`
  }
  return 'Vừa xong'
}

export const getRepliesComment = (comments: ICommentItem[], parentId: string | ObjectId) => {
  return comments
    .filter((item) => item.parentId?.toString() === parentId.toString())
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export const formatTotalComments = (total: number) => {
  if (total === 0) return 'Chưa có bình luận nào'
  if (total > 0 && total < 10) return `0${total} bình luận`
  return `${total} bình luận`
}
