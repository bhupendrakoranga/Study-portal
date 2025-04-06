'use server';
import TopicLayout from '@/_layouts/common/TopicLayout';
import TabComponentsWrapper from '@/_layouts/student/courses/TabComponents';
import React from 'react';

const Page = () => {
  return (
    <TopicLayout>
      <TabComponentsWrapper />
    </TopicLayout>
  );
};

export default Page;
