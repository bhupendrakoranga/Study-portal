'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from '@mui/material';
import { BLACK_TEXT, NEUTRALS_GREY } from '@/styles/color';
import Logo from '../../../../public/assets/png/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { styles } from '@/styles/globleStyle';
import UserMenu from '@/component/userMenu/UserMenu';
import styled from '@emotion/styled';
import { guttersPx } from '@/styles/variables';
import Avatar from '@/component/ui/Avatar';
import { mqMax } from '@/styles/base';
import { User } from '@/types/global';
import { getCookies } from '@/utils/action';

const Navbar = ({ data }: { data?: User }) => {
  const router = useRouter();
  const { mainContainer } = styles;
  const [loginEmail, setLoginEmail] = useState('');
  const handleLogoClick = () => {
    router.push('/');
  };

  async function getToken() {
    const userData = await getCookies('users');
    const parseData = userData?.value ? JSON.parse(userData.value) : null;
    return parseData?.userObj?.email || null;
  }

  getToken().then(userEmail => {
    setLoginEmail(userEmail);
  });
  
  return (
    <AppBar sx={mainContainer} position="fixed">
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <LogoStyled
            src={Logo}
            onClick={handleLogoClick}
            alt="img"
            width={230}
            height={50}
            style={{ cursor: 'pointer' }}
          />
          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt={''}
                src="/assets/png/user.png"
                size={40}
                imgHeight={22}
                imgWidth={22}
                sx={{ bgcolor: '#CFD8E5', color: NEUTRALS_GREY }}
                name=""
              />
            </IconButton>
            <UserMenueItem>
              <Typography
                variant="body1"
                noWrap
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingInline: '12px',
                  color: BLACK_TEXT,
                }}
              >
                {loginEmail || 'alex.grade8@gmail.com'}
              </Typography>
              <UserMenu />
            </UserMenueItem>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

const LogoStyled = styled(Image)`
  margin-left: ${guttersPx.medium};
  width: 252px;
  height: 56px;
  ${mqMax.max} {
    width: 212px;
    height: 46px;
  }
`;

const UserMenueItem = styled.div`
  display: flex;
  gap: 20px;
`;
