import { LayoutProps } from '@/types/global';
import React from 'react';
import AdminLayout from '@/_layouts/admin/AdminLayout';
import AdminContextProvider from '@/context/admincontext/AdminContextProvider';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AdminLayout isSideBar>
      <AdminContextProvider>{children}</AdminContextProvider>
    </AdminLayout>
  );
};

export default Layout;
