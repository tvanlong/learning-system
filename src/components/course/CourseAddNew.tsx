'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import slugify from 'slugify';
import { createCourse } from '@/lib/actions/course.actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(5, 'Tên khóa học phải có ít nhất 5 ký tự'),
  slug: z.string().optional(),
});

const CourseAddNew = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug || slugify(values.title, { lower: true, locale: 'vi' }),
      };

      const res = await createCourse(data);
      if (res?.success) {
        toast.success(res.message);
      }
      if (res?.data) {
        router.push(`/manage/course/update?slug=${res.data.slug}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off'>
        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-8 mt-10 mb-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên khóa học <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Tên khóa học' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn khóa học</FormLabel>
                <FormControl>
                  <Input placeholder='khoa-hoc-lap-trinh' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className='w-[120px]'
          isLoading={isSubmitting}
          variant='primary'
          disabled={isSubmitting}
          type='submit'
        >
          Thêm khóa học
        </Button>
      </form>
    </Form>
  );
};

export default CourseAddNew;
