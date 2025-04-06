'use client';

import Loader from '@/component/ui/Loader';
import useUserType from '@/hooks/useUserType';
import { IGlobal } from '@/types/global';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useState } from 'react';
import { GlobalContextContainer } from './GlobalContext';

function GlobalContextProvider({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [drawerTitle, setDrawerTitle] = useState('');

  const [admintopicmodal, setAadmintopicModal] = useState({
    isOpen: false,
    data: null,
  });
  const [activeadminTab, setActiveAdminTab] = useState<string>('Selector');
  const [loading, setLoading] = useState(false);
  const role = useUserType();
  const isTeacher = role === 'Teacher';
  const pathname = usePathname();
  const contextValues: IGlobal = {
    setActiveTab,
    setDrawerTitle,
    setActiveAdminTab,
    setAadmintopicModal,
    setLoading,
    activeTab,
    admintopicmodal,
    drawerTitle,
    isTeacher,
    pathname,
    role,
    activeadminTab,
  };

  return (
    <GlobalContextContainer value={contextValues}>
      {children}
      <Loader open={loading} />
    </GlobalContextContainer>
  );
}

export default GlobalContextProvider;
