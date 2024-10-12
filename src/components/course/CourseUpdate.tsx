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
import { ECourseLevel, ECourseStatus } from '@/types/enums';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { updateCourse } from '@/lib/actions/course.actions';
import { ICourse } from '@/database/course.model';
import slugify from 'slugify';
import { useImmer } from 'use-immer';
import { IconAdd } from '@/components/icons';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { courseLevel, courseStatus } from '@/constants';
import { UploadButton } from '@/utils/uploadthing';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(10, 'Tên khóa học phải có ít nhất 10 ký tự'),
  slug: z.string().optional(),
  price: z.number().int().positive().optional(),
  sale_price: z.number().int().positive().optional(),
  intro_url: z.string().optional(),
  desc: z.string().optional(),
  image: z.string().optional(),
  views: z.number().int().optional(),
  status: z
    .enum([
      ECourseStatus.APPROVED,
      ECourseStatus.PENDING,
      ECourseStatus.REJECTED,
    ])
    .optional(),
  level: z
    .enum([
      ECourseLevel.BEGINNER,
      ECourseLevel.INTERMEDIATE,
      ECourseLevel.ADVANCED,
    ])
    .optional(),
  info: z.object({
    requirements: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    qa: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),
  }),
});

const CourseUpdate = ({ data }: { data: ICourse }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseInfo, setCourseInfo] = useImmer({
    requirements: data.info.requirements,
    benefits: data.info.benefits,
    qa: data.info.qa,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      slug: data.slug,
      price: data.price,
      sale_price: data.sale_price,
      intro_url: data.intro_url,
      desc: data.desc,
      image: data.image,
      status: data.status,
      level: data.level,
      views: data.views,
      info: {
        requirements: data.info.requirements,
        benefits: data.info.benefits,
        qa: data.info.qa,
      },
    },
  });

  const imageWatch = form.watch('image');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const res = await updateCourse({
        slug: data.slug,
        updateData: {
          ...values,
          slug: slugify(values.title, { lower: true, locale: 'vi' }),
          info: {
            ...values.info,
            requirements: courseInfo.requirements,
            benefits: courseInfo.benefits,
            qa: courseInfo.qa,
          },
          status: values.status,
          level: values.level,
          image: values.image,
        },
      });
      if (values.slug !== data.slug) {
        router.replace(`/manage/course/update?slug=${values.slug}`);
      }
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off'>
        <div className='grid grid-cols-2 gap-8 mt-10 mb-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khóa học *</FormLabel>
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
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá khuyến mãi</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='599.000'
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
            name='sale_price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá gốc</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='999.000'
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
            name='desc'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả khóa học</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Nhập mô tả...'
                    {...field}
                    className='h-[200px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormControl>
                  <div className='h-[200px] bg-white rounded-md border border-gray-200 flex items-center justify-center relative'>
                    {!imageWatch ? (
                      <UploadButton
                        endpoint='imageUploader'
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          form.setValue('image', res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                          console.error(`ERROR! ${error.message}`);
                        }}
                      />
                    ) : (
                      <Image
                        alt=''
                        src={imageWatch}
                        fill
                        className='w-full h-full object-cover rounded-lg'
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='intro_url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube URL</FormLabel>
                <FormControl>
                  <Input placeholder='https://youtube.com/axfgdr5' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='views'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lượt xem</FormLabel>
                <FormControl>
                  <Input
                    placeholder='1000'
                    type='number'
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
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Trạng thái' />
                    </SelectTrigger>
                    <SelectContent>
                      {courseStatus.map((status) => (
                        <SelectItem value={status.value} key={status.value}>
                          {status.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='level'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trình độ</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Trình độ' />
                    </SelectTrigger>
                    <SelectContent>
                      {courseLevel.map((level) => (
                        <SelectItem value={level.value} key={level.value}>
                          {level.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='info.requirements'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center justify-between gap-5'>
                  <span>Yêu cầu</span>
                  <button
                    className='text-primary'
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.requirements.push('');
                      });
                    }}
                    type='button'
                  >
                    <IconAdd className='size-5' />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.requirements.map((r, index) => (
                      <Input
                        key={index}
                        placeholder={`Yêu cầu số ${index + 1}`}
                        value={r}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.requirements[index] = e.target.value;
                          });
                        }}
                      />
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='info.benefits'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center justify-between gap-5'>
                  <span>Lợi ích</span>
                  <button
                    className='text-primary'
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.benefits.push('');
                      });
                    }}
                    type='button'
                  >
                    <IconAdd className='size-5' />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.benefits.map((r, index) => (
                      <Input
                        key={index}
                        placeholder={`Lợi ích số ${index + 1}`}
                        value={r}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.benefits[index] = e.target.value;
                          });
                        }}
                      />
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='info.qa'
            render={({ field }) => (
              <FormItem className='col-start-1 col-end-3'>
                <FormLabel className='flex items-center justify-between gap-5'>
                  <span>Q.A</span>
                  <button
                    className='text-primary'
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.qa.push({
                          question: '',
                          answer: '',
                        });
                      });
                    }}
                    type='button'
                  >
                    <IconAdd className='size-5' />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.qa.map((item, index) => (
                      <div className='grid grid-cols-2 gap-5' key={index}>
                        <Input
                          key={index}
                          placeholder={`Câu hỏi số ${index + 1}`}
                          value={item.question}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.qa[index].question = e.target.value;
                            });
                          }}
                        />
                        <Input
                          key={index}
                          placeholder={`Câu trả lời số ${index + 1}`}
                          value={item.answer}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.qa[index].answer = e.target.value;
                            });
                          }}
                        />
                      </div>
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          isLoading={isSubmitting}
          variant='primary'
          type='submit'
          className='w-[150px]'
          disabled={isSubmitting}
        >
          Cập nhật khóa học
        </Button>
      </form>
    </Form>
  );
};

export default CourseUpdate;