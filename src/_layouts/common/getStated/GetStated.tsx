'use client';
import GetBanner from '@/component/common/GetBanner';
import React from 'react';
import GetButton from '@/component/common/GetButton';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import styled from '@mui/system/styled';

interface GetStatedProps {
  title: string;
  subTitle: string;
  studentButton: string;
  teacherButton: string;
}

const FullHeightGrid = styled(Grid)({
  height: '100vh',
});

const BannerGridItem = styled(Grid)(({ theme }) => ({
  width: '1120px',
  [theme.breakpoints.down('xl')]: {
    width: '1000px',
  },
  [theme.breakpoints.down('lg')]: {
    width: '800px',
  },
  [theme.breakpoints.down('md')]: {
    width: '600px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const ButtonGridItem = styled(Grid)(({ theme }) => ({
  position: 'relative',
  width: '800px',
  [theme.breakpoints.down('xl')]: {
    width: '600px',
  },
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
}));

const GetStated: React.FC<GetStatedProps> = ({
  title,
  subTitle,
  studentButton,
  teacherButton,
}) => {
  return (
    <>
      <CssBaseline />
      <FullHeightGrid container>
        <BannerGridItem item xs={12} sm={4} md={7}>
          <GetBanner />
        </BannerGridItem>

        <ButtonGridItem item xs={12} sm={8} md={5}>
          <GetButton
            title={title}
            subTitle={subTitle}
            studentButton={studentButton}
            teacherButton={teacherButton}
          />
        </ButtonGridItem>
      </FullHeightGrid>
    </>
  );
};

export default GetStated;
