// app/student/[student_id]/page.tsx
import React from 'react';
import DashboardTable from '@/component/common/DashboardTable';
import { headers, rows } from '@/utils/constant/Data';

interface PageProps {
  params: {
    student_id: string;
  };
}

const Page: React.FC<PageProps> = () => {
  return (
    <>
      <DashboardTable headers={headers} rows={rows} isTeacher={false} />
    </>
  );
};

export default Page;
