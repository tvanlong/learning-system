'use client'

import { useState } from 'react'

import { MAX_COMMENT_LEVEL } from '@/constants'
import { cn } from '@/lib/utils'
import { ICommentItem } from '@/types'
import { formatDate } from '@/utils'

import { CommentForm } from './comment-form'

interface ICommentReplyProps {
  comment: ICommentItem
  lessonId: string
  userId: string
}

export const CommentReply = ({ comment, lessonId, userId }: ICommentReplyProps) => {
  const [showReply, setShowReply] = useState(false)

  return (
    <>
      <div className='flex items-center gap-5 text-sm text-gray-400 font-medium mb-5'>
        <span>{formatDate(comment.created_at)}</span>
        {comment.level <= MAX_COMMENT_LEVEL && (
          <>
            <button
              type='button'
              className={cn('text-gray-400 font-bold', {
                underline: showReply
              })}
              onClick={() => setShowReply(!showReply)}
            >
              Phản hồi
            </button>
          </>
        )}
      </div>
      {showReply && (
        <div className='mt-3'>
          <CommentForm
            isReply
            closeReply={() => setShowReply(false)}
            comment={comment}
            lessonId={lessonId}
            userId={userId}
          />
        </div>
      )}
    </>
  )
}
