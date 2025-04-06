'use client';
import React, { Suspense } from 'react';
import { Box, CssBaseline } from '@mui/material';
import styled from '@emotion/styled';
import { BACKGROUND_GREY } from '@/styles/color';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebar/Sidebar';
import { Container } from '../common/CommonLayout';
import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from '@/lib/api/api';
const drawerWidth = 360;

const MainContent = styled(Box)`
  display: flex;
  flex-grow: 1;
  background-color: ${BACKGROUND_GREY};
  min-height: 100vh; /* Set the height to 100vh */
`;

const AdminLayout: React.FC<{
  children: React.ReactNode;
  isSideBar?: boolean;
}> = ({ children, isSideBar = false }) => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUserDetails,
    staleTime: Infinity, // Prevents refetching on remount
    refetchOnWindowFocus: false, // Disable refetching when the window regains focus
    refetchOnMount: false, // Disable refetching on component mount
  });

  return (
    <Container>
      <CssBaseline />
      <Navbar data={data} />
      <MainContent>
        {isSideBar && <Sidebar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: '73px',
            height: '100%',
            position: 'relative',
            minHeight: 'calc(100vh - 20px)',
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </Box>
      </MainContent>
    </Container>
  );
};

export default AdminLayout;
