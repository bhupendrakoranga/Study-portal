'use client';
import React, { Suspense } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import styled from '@emotion/styled';
import { useSearchParams } from 'next/navigation';
import { WHITE } from '@/styles/color';
const drawerWidth = 360;

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainContent = styled(Box)`
  display: flex;
  flex-grow: 1;
  background-color: ${(props: { background: string }) => props?.background};
  min-height: 100vh;
`;

interface CommonLayoutProps {
  children: React.ReactNode;
  isSideBar?: boolean;
  background?: string;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({
  children,
  isSideBar = false,
  background,
}) => {
  return (
    <Container>
      <CssBaseline />
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <ContentUI isSideBar={isSideBar} background={background}>
          {children}
        </ContentUI>
      </Suspense>
    </Container>
  );
};

export default CommonLayout;

interface ContentUIProps {
  isSideBar?: boolean;
  background?: string;
  children: React.ReactNode;
}

const ContentUI: React.FC<ContentUIProps> = ({
  isSideBar,
  background,
  children,
}) => {
  const searchParams = useSearchParams();
  const bg = searchParams.has('topic') ? WHITE : background;

  return (
    <MainContent background={bg || ''}>
      {isSideBar && <Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 3.5,
          height: '100%',
          position: 'relative',
          minHeight: 'calc(100vh - 20px)',
        }}
      >
        {children}
      </Box>
    </MainContent>
  );
};
