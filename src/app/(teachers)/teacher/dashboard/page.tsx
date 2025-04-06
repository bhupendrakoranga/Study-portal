// app/student/[student_id]/page.tsx
const TopicLists = dynamic(() => import('@/_layouts/teacher/TopicLists'), {
  ssr: false,
});

import dynamic from 'next/dynamic';
import React from 'react';
interface PageProps {
  params: {
    student_id: string;
  };
}

const Page: React.FC<PageProps> = () => {
  return <TopicLists />;
};
export default Page;
