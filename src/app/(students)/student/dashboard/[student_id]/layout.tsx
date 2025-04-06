import CommonLayout from '@/_layouts/common/CommonLayout';
import { LayoutProps } from '@/types/global';
import React from 'react';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <CommonLayout isSideBar>{children}</CommonLayout>;
};

export default Layout;
