import React from 'react';
import { FormControlLabel } from '@mui/material';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { formControlLabelStyles, StyledCheckBox } from '@/styles/globleStyle';
import Image from '../Image';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium';
  labelFontSize?: string;
  labelFontWeight?: number;
  name?: string;
}

const StyledFormControlLabel = styled(FormControlLabel)`
  ${formControlLabelStyles}
`;

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  color = 'primary',
  size = 'medium',
  name = 'checkbox',
}) => {
  const theme = useTheme();

  return (
    <StyledFormControlLabel
      control={
        <StyledCheckBox
          checked={checked}
          onChange={onChange}
          color={color}
          size={size}
          name={name}
          icon={<CheckIcons src="/assets/png/Checkbox.png" />}
          checkedIcon={<CheckIcons src="/assets/png/CheckboxCheked.png" />}
        />
      }
      label={label}
      theme={theme}
    />
  );
};

export default Checkbox;

const CheckIcons = ({ src }: { src: string }) => {
  return <Image src={src} alt="check" width={20} height={20} />;
};
