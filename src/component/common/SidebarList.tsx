import React, { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SideBarContent from '../student/SideBarContent';
import TopicSidebarContent from './TopicSidebarContent';
import GetForm from './GetForm';
import AdminSidebar from '@/_layouts/common/sidebar/AdminSidebar';

const SidebarList = ({ role }: { role: string }) => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const getContentToRender = useMemo(() => {
    if (pathname.includes('admin') || role === 'Admin') {
      return <AdminSidebar />;
    }
    if (searchParam.has('course')) {
      return <SideBarContent />;
    }
    if (searchParam.has('topic')) {
      return <TopicSidebarContent />;
    } else {
      return <GetForm />;
    }
  }, [searchParam, router, pathname, role]);

  return <>{getContentToRender}</>;
};

export default SidebarList;
