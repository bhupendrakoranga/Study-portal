'use client';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import DropdownButton from './DropdownButton'; // Import the DropdownButton
import { STUDENT_LIST, DROPDOWN_BTN_TYPE } from '@/utils/constant/Data';
import Button from '@/component/ui/buttons/Button';
import Checkbox from '../ui/inputs/Checkbox';
import { fontSizeBody2, fontWeightRegular } from '@/styles/variables';
import { BLACK_TEXT } from '@/styles/color';
import { hideScrollbar, mqMax } from '@/styles/base';
import {
  typographyBody2Semibold,
  typographyH6SemiBold,
} from '@/styles/typography';

const SidebarContainer = styled.div`
  width: 100%;
  height: calc(100vh - 73px); // Make the height responsive to the screen height
  top: 73px;
  right: 0;
  border-left: 1px solid #cfd8e5;
  background-color: #fff;
  display: flex;
  flex-direction: column; /* Ensure all elements are stacked vertically */
  justify-content: space-between;
`;

const CheckboxesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 3px;
  .MuiTypography-body1 {
    font-size: ${fontSizeBody2} !important;
    font-weight: ${fontWeightRegular} !important;
    color: ${BLACK_TEXT};
  }
  .MuiFormControlLabel-root {
    padding: 16px;
    gap: 16px;
  }
  ${mqMax.max} {
    .MuiFormControlLabel-root {
      padding: 8px 16px;
      gap: 8px;
    }
  }
  flex-grow: 1; /* Allow this container to grow and take available space */
  overflow: auto;
  margin-bottom: 60px;
  ${hideScrollbar}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: -webkit-fill-available;
`;

const StyledBottomBtn = styled(Button)`
  border-radius: 0;
  width: 100%;
  ${typographyH6SemiBold};
  ${mqMax.max} {
    ${typographyBody2Semibold}
  }
`;

const StudentList: React.FC = () => {
  const [checkboxes, setCheckboxes] = useState(
    STUDENT_LIST.map((item) => ({
      label: item,
      checked: false,
    })),
  );

  const handleCheckboxChange = (index: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxes(newCheckboxes);
  };

  const handleSelectAll = () => {
    const allChecked = checkboxes.every((checkbox) => checkbox.checked);
    const newCheckboxes = checkboxes.map((checkbox) => ({
      ...checkbox,
      checked: !allChecked,
    }));
    setCheckboxes(newCheckboxes);
  };

  const selectAllText = checkboxes.every((checkbox) => checkbox.checked)
    ? 'Deselect All'
    : 'Select All';

  return (
    <SidebarContainer>
      <DropdownButton
        items={DROPDOWN_BTN_TYPE}
        width="100%" /* Ensure the dropdown button takes full width */
        borderRadius="0"
        sx={{
          '.MuiPaper-root': {
            margin: '120px 0 0 10px',
          },
        }}
      >
        Class A
      </DropdownButton>
      <CheckboxesContainer>
        {checkboxes.map((checkbox, index) => (
          <Checkbox
            key={checkbox.label}
            label={checkbox.label}
            checked={checkbox.checked}
            onChange={() => handleCheckboxChange(index)}
          />
        ))}
      </CheckboxesContainer>
      <ButtonContainer>
        <StyledBottomBtn variant="contained" onClick={handleSelectAll}>
          {selectAllText}
        </StyledBottomBtn>
      </ButtonContainer>
    </SidebarContainer>
  );
};

export default StudentList;
