'use client';
import { BLACK_TEXT, WHITE } from '@/styles/color';
import { typographyBody1Bold, typographyBody2 } from '@/styles/typography';
import { guttersPx } from '@/styles/variables';
import styled from '@emotion/styled';
import { MenuItem } from '@mui/material';
import React, { FC, forwardRef, Ref } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectProps {
  id: string;
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  classname?: string;
  onChange?: (event: SelectChangeEvent<unknown>) => void;
  onBlur?: (event: any) => void;
  value: string | string[];
  multiple?: boolean;
  disabled?: boolean;
}

const SelectBox: FC<SelectProps> = forwardRef(
  (
    {
      id,
      classname = 'select',
      label,
      name,
      options = [],
      onChange,
      onBlur,
      value,
      multiple = false,
      disabled,
      ...rest
    },
    ref: Ref<HTMLSelectElement>,
  ) => {
    const handleChange = (event: SelectChangeEvent<unknown>) => {
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <div className="relative">
        {label && (
          <Label htmlFor={id} className="sr-only">
            {label}
          </Label>
        )}
        <StyledSelect
          id={id}
          name={name}
          className={classname}
          onChange={handleChange}
          onBlur={onBlur}
          ref={ref}
          value={value}
          multiple={multiple}
          {...rest}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem key={option?.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelect>
      </div>
    );
  },
);

export default SelectBox;

SelectBox.displayName = 'SelectBox';

const Label = styled.label`
  ${typographyBody1Bold};
  color: ${BLACK_TEXT};
  display: block;
  margin-bottom: ${guttersPx.smallHalf};
`;

const StyledSelect = styled(Select)`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  ${typographyBody2};
  background-color: ${WHITE};
  padding: ${guttersPx.smallHalf};
  &:focus {
    outline: none;
  }
  svg {
    display: none;
  }
  &::placeholder {
    color: #444150;
  }
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  background-image: url('/assets/png/ExpandMoreIcon.png');
  background-position: calc(100% - 28px) center;
  background-repeat: no-repeat;
`;
