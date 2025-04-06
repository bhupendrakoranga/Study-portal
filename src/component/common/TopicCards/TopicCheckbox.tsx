import React from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import styled from '@emotion/styled';

const CheckboxContainer = styled.div`
  position: absolute;
  top: -3px;
  right: 0px;
  svg {
    font-size: 14px;
  }
`;

interface ConditionalCheckboxProps {
  isTeacher: boolean;
  name: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: { inputProps: { 'aria-label': string } };
}

const TopicCheckbox: React.FC<ConditionalCheckboxProps> = ({
  isTeacher,
  name,
  checked,
  onChange,
  label,
}) => {
  const checkboxElement = (
    <CheckboxContainer>
      <Checkbox
        {...label}
        icon={<PanoramaFishEyeIcon fontSize="small" />}
        checkedIcon={
          <ErrorOutlineRoundedIcon fontSize="small" color="warning" />
        }
        name={name}
        checked={checked}
        disabled={!isTeacher}
        onChange={onChange}
      />
    </CheckboxContainer>
  );

  return isTeacher ? (
    checkboxElement
  ) : (
    <Tooltip title="Urgent" placement="right-end">
      {checkboxElement}
    </Tooltip>
  );
};

export default TopicCheckbox;
