'use client';
// components/DropdownButton.tsx
import React, { useState } from 'react';
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  MenuItem,
  Popover,
} from '@mui/material';
import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import {
  DARK_BLUE,
  BUTTON_YELLOW,
  WHITE,
  BUTTON_BACKGROUND,
  BLACK_TEXT,
} from '@/styles/color';
import {
  typographyBody2,
  typographyH6SemiBold,
  typographyBody2Semibold,
} from '@/styles/typography';
import { guttersPx } from '@/styles/variables';
import { mqMax } from '@/styles/base';

interface DropdownItem {
  title: string;
}

interface CustomButtonProps extends MUIButtonProps {
  button_background?: string;
  button_hover?: string;
  items?: DropdownItem[];
  width?: string;
  borderRadius?: string;
  sx?: any;
}

const DropdownButton: React.FC<CustomButtonProps> = ({
  button_background = DARK_BLUE,
  button_hover = BUTTON_YELLOW,
  items = [], // Default items to an empty array
  sx,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<string>(items[0]?.title);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index: string) => {
    setSelectedIndex(index);
    handleClose();
  };

  return (
    <>
      <StyledButton
        button_background={button_background}
        button_hover={button_hover}
        {...props}
        onClick={handleClick}
      >
        {selectedIndex}
      </StyledButton>
      <StyledPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={sx}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            width: 220,
            borderRadius: 8,
          },
        }}
      >
        {items.map((item, index) => (
          <StyledMenuItem
            key={index}
            onClick={() => handleMenuItemClick(item.title)}
          >
            {selectedIndex === item.title && (
              <CheckIconContainer>
                <CheckIconStyled />
              </CheckIconContainer>
            )}
            <MenuItemLabel>{item.title}</MenuItemLabel>
          </StyledMenuItem>
        ))}
      </StyledPopover>
    </>
  );
};

export default DropdownButton;

const shouldForwardProp = (prop: string) =>
  !['width', 'button_background', 'borderRadius', 'button_hover'].includes(
    prop,
  );

export const StyledButton = styled(MUIButton, {
  shouldForwardProp,
})<CustomButtonProps>`
  width: ${({ width }) => width || '136px'};
  height: 56px;
  gap: 0px;
  opacity: 1; /* Ensure the button is visible */
  padding: ${guttersPx.small};
  ${guttersPx.large};
  color: white;
  background-color: ${({ button_background }) =>
    button_background || '#330066'};
  ${typographyH6SemiBold};
  ${mqMax.max} {
    ${typographyBody2Semibold}
  }
  border-radius: ${({ borderRadius }) => borderRadius || '20px 20px 0 0'};
  &:hover {
    background-color: ${({ button_hover }) => button_hover || '#FFC801'};
  }
`;

const StyledPopover = styled(Popover)`
  .MuiPaper-root {
    background: ${WHITE};
    opacity: 1;
    overflow-y: auto;
    max-height: 70vh; /* Adjust the max height as needed */
  }
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  width: 220px;
  height: 44px;
  gap: 0px;
  opacity: 1;
  padding: 0 ${guttersPx.small};
  position: relative;
`;

const MenuItemLabel = styled.span`
  ${typographyBody2}
  text-align: left;
  padding-left: ${guttersPx.medium};
  color: ${BLACK_TEXT};
`;

const CheckIconContainer = styled.div`
  position: absolute;
  left: 0;
  padding: 0 ${guttersPx.smallHalf} 0 ${guttersPx.smallHalf};
`;

const CheckIconStyled = styled(CheckIcon)`
  color: ${BUTTON_BACKGROUND};
`;
