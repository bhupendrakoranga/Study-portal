import React from 'react';
import {
  TextField as MUiInput,
  TextFieldProps as MUiTextFieldProps,
} from '@mui/material';
import styled from '@emotion/styled';
import { typographyBody2Bold } from '@/styles/typography';
import { LIGHT_SILVER } from '@/styles/color';

interface LabeledTextFieldProps
  extends Omit<MUiTextFieldProps, 'variant' | 'size'> {
  label: string;
  variant?: 'outlined' | 'filled' | 'standard';
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  multiline?: boolean;
  rows?: number;
}

const StyledTextField = styled(MUiInput)`
  & .MuiOutlinedInput-root {
    border-radius: 10px !important;
    border: 1px solid ${LIGHT_SILVER};
  }
`;

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 3px;
  ${typographyBody2Bold};
  text-align: left;
  color: #667b99;
`;

const TextField: React.FC<LabeledTextFieldProps> = ({
  label,
  variant = 'outlined',
  fullWidth = true,
  size = 'small',
  multiline = false,
  rows = 1,
  ...props
}) => {
  return (
    <TextFieldContainer>
      <Label>{label}</Label>
      <StyledTextField
        variant={variant}
        fullWidth={fullWidth}
        size={size}
        multiline={multiline}
        rows={rows}
        {...props}
      />
    </TextFieldContainer>
  );
};

export default TextField;
