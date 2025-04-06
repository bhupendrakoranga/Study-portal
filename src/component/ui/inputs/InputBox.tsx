'use client';
import { BLACK_TEXT, LIGHT_STEEL_BLUE } from '@/styles/color';
import { typographyBody1Bold, typographyBody2 } from '@/styles/typography';
import { guttersPx } from '@/styles/variables';
import styled from '@emotion/styled';
import React, { FC, ChangeEvent, forwardRef, Ref } from 'react';

interface InputProps {
  type?: string;
  id: string;
  placeholder?: string;
  label?: string;
  name: string;
  icon?: any;
  classname?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: FC<InputProps & React.InputHTMLAttributes<HTMLInputElement>> =
  forwardRef(
    (
      {
        type = 'text',
        id,
        classname = 'input',
        placeholder,
        label,
        icon,
        name,
        onChange,
        ...rest
      },
      ref: Ref<HTMLInputElement>,
    ) => {
      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(event);
        }
      };

      return (
        <InputWrapper className="relative">
          {label && (
            <Label htmlFor={id} className="sr-only">
              {label}
            </Label>
          )}
          <StyledInput
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className={classname}
            onChange={handleChange}
            autoComplete="new-password"
            ref={ref}
            {...rest}
          />
          {icon && <IconSpan className="texticon">{icon}</IconSpan>}
        </InputWrapper>
      );
    },
  );

export default InputBox;

InputBox.displayName = 'InputBox';

const InputWrapper = styled.div`
  position: relative;
`;

export const Label = styled.label`
  ${typographyBody1Bold};
  color: ${BLACK_TEXT};
  display: block;
  margin-bottom: ${guttersPx.smallHalf};
`;

const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${LIGHT_STEEL_BLUE};
  ${typographyBody2};
  padding: ${guttersPx.smallHalf};
  &:focus {
    outline: none;
  }
  &placeholder {
    color: #444150;
  }
`;

const IconSpan = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0px, -50%);
`;
