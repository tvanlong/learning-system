'use client';
import { Button } from '@/components/ui/button';
import useGlobalStore from '@/store';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LessonNavigation from '../LessonNavigation';

const VideoPlayer = ({
  videoId,
  nextLesson,
  prevLesson,
}: {
  videoId?: string;
  nextLesson: string;
  prevLesson: string;
}) => {
  const [isEndedVideo, setIsEndedVideo] = useState(false);
  const { expandedPlayer, setExpandedPlayer } = useGlobalStore();
  const router = useRouter();
  useEffect(() => {
    if (!isEndedVideo) return;
    const timer = setTimeout(() => {
      router.push(nextLesson);
    }, 5000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEndedVideo, nextLesson]);
  return (
    <>
      <div className='relative mb-5 aspect-video rounded-md overflow-hidden'>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls={true}
          width='100%'
          height='100%'
          onEnded={() => setIsEndedVideo(true)}
          onReady={() => setIsEndedVideo(false)}
        />
      </div>
      <div className='flex items-center justify-between mb-5'>
        <LessonNavigation
          nextLesson={nextLesson}
          prevLesson={prevLesson}
        ></LessonNavigation>
        <Button onClick={() => setExpandedPlayer(!expandedPlayer)}>
          {expandedPlayer ? 'Mặc định' : 'Mở rộng'}
        </Button>
      </div>
    </>
  );
};

export default VideoPlayer;
