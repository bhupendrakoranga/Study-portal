'use client';
import { WHITE } from '@/styles/color';
import { IconWrapper } from '@/styles/globleStyle';
import { typographyBody1Normal } from '@/styles/typography';
import { guttersPx } from '@/styles/variables';
import { PlusIcon } from '@/utils/constant/SVG';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import React from 'react';
import Image from '../Image';

interface BottomDrawerProps {
  children: React.ReactNode;
  show: boolean;
  onOpen: () => void;
  title?: string;
  isRight?: boolean;
  isPlus?: boolean;
  isExpand?: boolean;
  schoolName?: string;
}

const rightborder = '0 12px 0px 0px';
const leftborder = '12px 0 0px 0px';

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  children,
  show,
  isRight = false,
  isPlus = false,
  title = '',
  onOpen,
  isExpand = true,
  schoolName,
}) => {
  const heading = isExpand ? title : schoolName;
  return (
    <DrawerContainer isRight={isRight}>
      {!show ? (
        <DrawerItem isRight={isRight}>
          <TextContent>{heading}</TextContent>
          <Icons>
            {isPlus && (
              <IconWrapper>
                <PlusIcon color={WHITE} width={12} height={12} />
              </IconWrapper>
            )}
            {isExpand && (
              <IconButton onClick={onOpen}>
                <Image
                  src="/assets/png/maximize.png"
                  alt="maximize"
                  width={24}
                  height={24}
                />
              </IconButton>
            )}
          </Icons>
        </DrawerItem>
      ) : (
        <DrawerContent show={show}>{children}</DrawerContent>
      )}
    </DrawerContainer>
  );
};

export default BottomDrawer;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const DrawerContainer = styled.div`
  min-width: 388px;
  position: fixed;
  bottom: 0;
  right: 0;
  overflow: auto;
  right: ${({ isRight }: { isRight: boolean }) => (!isRight ? 0 : 'auto')};
  max-height: 80vh;
  z-index: ${({ isRight }: { isRight: boolean }) => (isRight ? 1000 : 'auto')};
`;

const DrawerItem = styled.div`
  background: ${WHITE};
  padding: ${guttersPx.small};
  display: flex;
  justify-content: space-between;
  border-radius: ${({ isRight }: { isRight: boolean }) =>
    isRight ? rightborder : leftborder};
  height: 70px;
`;

const TextContent = styled.p`
  ${typographyBody1Normal}
`;

interface DrawerContentProps {
  show: boolean;
}

const DrawerContent = styled.div<DrawerContentProps>`
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform 0.3s ease-in-out;
  background: ${WHITE};
  border-radius: 12px 0px 0px 0px;
  padding: ${guttersPx.small};
  box-shadow: 0 4px 21px rgba(0, 0, 0, 0.05);
  z-index: 100;
`;
