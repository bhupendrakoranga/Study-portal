'use client';
// TabComponents.tsx
import React, { Suspense, useMemo } from 'react';
import VideoPlayer from '@/_layouts/common/chatbox/VideoPlayer';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { useSearchParams } from 'next/navigation';
import TopicChat from '@/_layouts/common/chatbox/TopicChat/TopicChat';

export interface ChatMessageData {
  id: number;
  image: string;
  title: string;
  color: string;
  dec: string;
}
// Define type for data object

const TabComponents = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('video_id');
  const search2 = searchParams.get('learn') || searchParams.get('test');
  const { activeTab } = useGlobalContext();
  const renderComponent = useMemo(() => {
    switch (activeTab) {
      case 1:
        return <VideoPlayer videoUrl={''} search={search} isMessage />;
      case 2:
        return <TopicChat search={search2} data={data} />;
      default:
        return <TopicChat search={search2} data={data2} />;
    }
  }, [activeTab, search, search2]);

  return <>{renderComponent}</>;
};

const TabComponentsWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TabComponents />
    </Suspense>
  );
};

export default TabComponentsWrapper;

export const data: ChatMessageData = {
  id: 1,
  image: '/assets/png/Img-one.png',
  title: 'Mathica',
  color: '#F2F4F8',
  dec: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rerum rem quod officia dolor possimus accusamus officiis tempore repellat eos?',
};

const data2: ChatMessageData = {
  id: 2,
  image: '/assets/png/Img-one.png',
  title: 'Mathica',
  color: '#F2F4F8',
  dec: 'Hey Alex, let’s make sure now you have a better understanding of scientific notation. Here are the questions:\n\n1. Convert 2,230,000 to scientific notation.\n2. If I say "52.3 billion," express that in scientific notation.\n\nGo ahead and try answering these. If you\'re unsure about any of them, just let me know, and I\'ll help guide you towards the right answer.',
};
