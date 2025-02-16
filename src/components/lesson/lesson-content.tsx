import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { IHistory } from '@/database/history.model'
import { TUpdateCourseLecture } from '@/types'

import { LessonItem } from './lesson-item'

interface ILessonContentProps {
  lectures: TUpdateCourseLecture[]
  course: string
  slug: string
  histories?: IHistory[]
}

export const LessonContent = ({ lectures, course, slug, histories = [] }: ILessonContentProps) => {
  return (
    <div className='flex flex-col gap-3'>
      {lectures.map((lecture: TUpdateCourseLecture) => (
        <Accordion type='single' collapsible className='w-full' key={lecture._id}>
          <AccordionItem value={lecture._id.toString()}>
            <AccordionTrigger>
              <div className='flex items-center gap-3 justify-between w-full pr-5'>
                <div className='text-sm text-left'>{lecture.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className='bg-white p-0'>
              <div className='flex flex-col gap-3 mt-2 p-4'>
                {lecture.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson._id}
                    lesson={lesson ? JSON.parse(JSON.stringify(lesson)) : {}}
                    url={!course ? '' : `/${course}/lesson?slug=${lesson.slug}`}
                    isActive={slug === lesson.slug}
                    isChecked={histories.some((el) => el.lesson.toString() === lesson._id.toString())}
                  ></LessonItem>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}
