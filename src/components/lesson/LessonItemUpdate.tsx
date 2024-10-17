'use client';
import { Form } from '@/components/ui/form';
import { ILesson } from '@/database/lesson.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateLesson } from '@/lib/actions/lession.actions';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Editor } from '@tinymce/tinymce-react';
import { editorOptions } from '@/constants';
import { useRef } from 'react';
import { useTheme } from 'next-themes';

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const editorRef = useRef<any>(null);
  const { theme } = useTheme();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug,
      duration: lesson.duration,
      video_url: lesson.video_url,
      content: lesson.content,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await updateLesson({
        lessonId: lesson._id,
        updateData: values,
        path: `/manage/course/update-content?slug=${lesson.slug}`,
      });
      if (res?.success) {
        toast.success('Cập nhật bài học thành công');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-8'>
            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đường dẫn</FormLabel>
                  <FormControl>
                    <Input placeholder='bai-1-tong-quan' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='duration'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thời lượng</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='bai-1-tong-quan'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='video_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://youtube.com/abcdefXZ'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div></div>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem className='col-start-1 col-end-3'>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Editor
                      apiKey={process.env.TINY_MCE_API_KEY}
                      onInit={(_evt, editor) => {
                        (editorRef.current = editor).setContent(
                          lesson.content || ''
                        );
                      }}
                      value={field.value}
                      {...editorOptions(field, theme)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex justify-end gap-5 items-center mt-8'>
            <Button type='submit'>Cập nhật</Button>
            <Link href='/' className='text-sm text-slate-600'>
              Xem trước
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default LessonItemUpdate;