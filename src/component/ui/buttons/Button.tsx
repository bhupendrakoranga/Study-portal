// components/Button.tsx
import React from 'react';
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from '@mui/material';
import styled from '@emotion/styled';
import { BUTTON_YELLOW, DARK_BLUE, NEUTRALS_GREY8 } from '@/styles/color';
import Image from 'next/image';

interface CustomButtonProps extends MUIButtonProps {
  button_background?: string;
  button_hover?: string;
}

const StyledButton = styled(MUIButton)<CustomButtonProps>`
  color: white;
  background-color: ${({ button_background }) =>
    button_background || NEUTRALS_GREY8};
  text-transform: capitalize;
  min-width: 240px;
  min-height: 56px;
  border-radius: 40px;
  &:hover {
    background-color: ${({ button_hover }) => button_hover || '#ffeb3b'};
  }
`;

const Button: React.FC<CustomButtonProps> = ({
  children,
  button_background = DARK_BLUE,
  button_hover = BUTTON_YELLOW,
  ...props
}) => {
  return (
    <StyledButton
      button_background={button_background}
      button_hover={button_hover}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

export const SaveButton = () => {
  return (
    <Button
      type="submit"
      sx={{ width: '152px', minWidth: 'auto !important' }}
      startIcon={
        <Image src="/assets/png/save.png" alt="save" width={18} height={18} />
      }
    >
      SAVE
    </Button>
  );
};
