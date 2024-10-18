import Link from 'next/link';
import { IconPlay } from '@/components/icons';
import { ILesson } from '@/database/lesson.model';
import { cn } from '@/lib/utils';

const LessonItem = ({
  lesson,
  url,
  isActive,
}: {
  lesson: ILesson;
  url?: string;
  isActive?: boolean;
}) => {
  return (
    <div
      className={cn(
        'mb-5 pb-5 border-b border-dashed dark:border-b-slate-500 last:pb-0 last:mb-0 last:border-b-0 flex items-center gap-2 text-sm font-medium',
        {
          'text-primary font-bold dark:text-primary pointer-events-none':
            isActive,
          '': !isActive,
        }
      )}
    >
      <IconPlay className='size-5 shrink-0' />
      <Link href={url || ''} className='flex-1 text-left'>
        <div className='line-clamp-1'>{lesson.title}</div>
      </Link>
      <span className='ml-auto font-semibold text-xs flex-shrink-0'>
        {lesson.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
