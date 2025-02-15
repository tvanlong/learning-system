'use client'

import { useEffect } from 'react'

import { lastLessonKey } from '@/constants'

interface ILessonSaveUrlProps {
  url: string
  course: string
}

const LessonSaveUrl = ({ url, course }: ILessonSaveUrlProps) => {
  useEffect(() => {
    let results: any[] = JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || []
    const item = {
      course,
      lesson: url
    }
    results = results.filter((el) => el.course !== course)
    results.push(item)
    localStorage?.setItem(lastLessonKey, JSON.stringify(results))
  }, [course, url])

  return null
}

export default LessonSaveUrl
