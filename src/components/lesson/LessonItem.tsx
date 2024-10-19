'use client';

import Link from 'next/link';
import { IconPlay } from '@/components/icons';
import { ILesson } from '@/database/lesson.model';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { createHistory } from '@/lib/actions/history.actions';

const LessonItem = ({
  lesson,
  url,
  isActive = false,
  isChecked = false,
}: {
  lesson: ILesson;
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createHistory({
        course: lesson.course.toString(),
        lesson: lesson._id,
        checked,
        path: url || '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn(
        'mb-5 pb-5 border-b border-dashed dark:border-b-slate-500 last:pb-0 last:mb-0 last:border-b-0 flex items-center gap-2 text-sm font-medium',
        isActive ? 'text-primary font-bold dark:text-primary' : ''
      )}
    >
      {url && (
        <Checkbox
          defaultChecked={isChecked}
          className='flex-shrink-0 rounded-full'
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        />
      )}
      <IconPlay className='size-5 shrink-0' />
      {url ? (
        <Link
          href={url}
          className={cn('line-clamp-1', isActive && 'pointer-events-none')}
        >
          {lesson.title}
        </Link>
      ) : (
        <h4 className='line-clamp-1'>{lesson.title}</h4>
      )}
      <span className='ml-auto font-semibold text-xs flex-shrink-0'>
        {lesson.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
