import { BACKGROUND_GREY } from '@/styles/color';
import { LayoutProps } from '@/types/global';
import CommonLayout from '@/_layouts/common/CommonLayout';
import React from 'react';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CommonLayout background={BACKGROUND_GREY} isSideBar>
      {children}
    </CommonLayout>
  );
};

export default Layout;
