// app/student/[student_id]/page.tsx
import DrawerForm from '@/component/admin/DrawerForm';
import UnitTable from '@/component/admin/unitBuilder/UnitTable';
import React from 'react';

const Page = () => {
  return (
    <>
      <UnitTable />
      <DrawerForm isExpand={false} />
    </>
  );
};

export default Page;
