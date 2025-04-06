import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import GetStartFooter from './GetStartFooter';
import { LOGIN_BTN_TYPE, Role } from '@/utils/constant/Data';
import styled from '@emotion/styled';
import Button from '../ui/buttons/Button';
import { guttersPx } from '@/styles/variables';
import {
  typographyBody1,
  typographyH4,
  typographyH6SemiBold,
  typographyBody2Semibold,
} from '@/styles/typography';
import CommonModal from '../ui/modals/CommonModal';
import {
  WHITE,
  BUTTON_BACKGROUND,
  BLACK_TEXT,
  GREY,
  DARK_BLUE,
} from '@/styles/color';
import AuthText from '@/_layouts/auth/AuthText';
import Login from '@/app/(auth)/login/Page';
import Register from '@/app/(auth)/signup/Page';
import { mqMax } from '@/styles/base';

interface GetButtonProps {
  title: string;
  subTitle: string;
  studentButton: string;
  teacherButton: string;
}

const HeaderText = styled.h1`
  margin: 0;
  text-align: center;
  ${typographyH4}
`;

const Container = styled(Box)`
  position: relative;
  padding: ${guttersPx.medium};
  border-radius: ${guttersPx.smallHalf};
  text-align: center;
  height: 100%;
`;

const AuthContainer = styled.div`
  min-width: 400px;
  background: ${WHITE};
  padding: ${guttersPx.medium};
`;

const TitleText = styled(Typography)`
  font-size: 32px;
  font-weight: 700;
  color: ${BLACK_TEXT};
  ${mqMax.max} {
    font-size: 24px;
  }
`;

const SubTitleText = styled(Typography)`
  ${typographyBody1};
  color: ${GREY};
  ${mqMax.max} {
    font-size: 16px;
  }
`;

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: ${guttersPx.large};
  button {
    ${typographyH6SemiBold}
  }
  ${mqMax.max} {
    button {
      min-width: 200px !important;
      min-height: 45px !important;
      ${typographyBody2Semibold}
    }
  }
`;

const CenterContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: ${guttersPx.extraLarge};
`;

const AdminText = styled.p`
  ${typographyBody1};
  color: ${BLACK_TEXT};
  margin-top: -20px !important;
`;

const Span = styled.span`
  color: ${DARK_BLUE};
  cursor: pointer;
`;

const GetButton: React.FC<GetButtonProps> = ({ title, subTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<Role>('Admin');
  const [isLogin, setLogin] = useState(false);

  const handleOpen = (rolename: Role) => {
    setIsOpen(true);
    setRole(rolename);
  };
  const handleClose = () => setIsOpen(false);
  const handleAuth = () => setLogin(!isLogin);

  return (
    <>
      <Container>
        <CenterContent>
          <TitleText variant="h3">{title}</TitleText>
          <SubTitleText variant="body1">{subTitle}</SubTitleText>
          <ButtonContainer>
            {LOGIN_BTN_TYPE.map((item) => (
              <Button
                button_background={BUTTON_BACKGROUND}
                key={item.title}
                onClick={() => handleOpen(item.title)}
              >
                {item.title}
              </Button>
            ))}
          </ButtonContainer>
          <AdminText>
            Login as an <Span onClick={() => handleOpen('Admin')}>Admin</Span>
          </AdminText>
        </CenterContent>
        <GetStartFooter />
      </Container>
      <CommonModal
        title=""
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleClose}
      >
        <AuthContainer>
          <HeaderText>{isLogin ? 'Signup' : 'Login'}</HeaderText>
          {!isLogin ? <Login role={role} /> : <Register />}
          <AuthText isRegistering={isLogin} handleAuth={handleAuth} />
        </AuthContainer>
      </CommonModal>
    </>
  );
};

export default GetButton;
