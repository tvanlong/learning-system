'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { createComment } from '@/lib/actions/comment.actions'
import { cn } from '@/lib/utils'
import { ICommentItem } from '@/types'

const formSchema = z.object({
  content: z
    .string({ message: 'Comment must be a string' })
    .min(10, { message: 'Comment must be at least 10 character long' })
})

interface ICommentFormProps {
  userId: string
  lessonId: string
  comment?: ICommentItem
  isReply?: boolean
  closeReply?: () => void
}

const CommentForm = ({ userId, lessonId, comment, isReply, closeReply }: ICommentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  })
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const slug = useSearchParams().get('slug')
  const path = `${pathname}?slug=${slug}`

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const newComment = await createComment({
        content: values.content,
        lesson: lessonId,
        user: userId,
        level: comment && comment?.level >= 0 ? comment?.level + 1 : 0,
        parentId: comment?._id,
        path
      })
      if (!newComment) {
        toast.error('Không thể gửi bình luận')
        return
      }
      toast.success('Bình luận của bạn đã được gửi')
      form.setValue('content', '')
      closeReply?.()
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off' className='flex flex-col relative gap-5'>
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder='Nhập bình luận...'
                    className={cn('min-h-[150px]', {
                      'bg-gray-50': isReply
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            isLoading={isPending}
            variant='primary'
            className={cn('w-[140px] ml-auto rounded-lg h-10', {
              'w-24': isReply
            })}
            type='submit'
          >
            {isReply ? 'Phản hồi' : 'Gửi bình luận'}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default CommentForm
