import dynamic from 'next/dynamic';
import React from 'react';
const GetStated = dynamic(
  () => import('@/_layouts/common/getStated/GetStated'),
  { ssr: false },
);

const Page = () => {
  return (
    <>
      <GetStated
        title="Get started"
        subTitle="Please select your role to sign in"
        studentButton="Student"
        teacherButton="Teacher"
      />
    </>
  );
};

export default Page;
