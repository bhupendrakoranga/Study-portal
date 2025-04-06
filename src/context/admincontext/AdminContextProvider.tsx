'use client';
import { IGAdmin } from '@/types/global';
import React, { PropsWithChildren, useState } from 'react';
import { AdminContextContainer } from './AdminContext';

function AdminContextProvider({ children }: PropsWithChildren) {
  const [activeadminTab, setActiveAdminTab] = useState<string>('Selector');
  const contextValues: IGAdmin = {
    setActiveAdminTab,
    activeadminTab,
  };

  return (
    <AdminContextContainer value={contextValues}>
      {children}
    </AdminContextContainer>
  );
}

export default AdminContextProvider;
