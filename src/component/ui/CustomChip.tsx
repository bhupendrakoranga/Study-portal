// CustomChip.js
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { GREY, WHITE } from '@/styles/color';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { typographyBody1Bold } from '@/styles/typography';
import { mqMax } from '@/styles/base';

const CustomChipWrapper = styled(Box)`
  background: ${GREY};
  color: ${WHITE};
  border-radius: 50px;
  display: flex;
  height: 32px;
  padding: 8px 4px 8px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  ${mqMax} {
    height: 24px;
    padding: 4px 2px 4px 4px;
  }
`;

const TextLabel = styled(Typography)`
  text-shadow: 0px 1px 2px 0px #00000080;
  ${typographyBody1Bold}
`;

const CustomChip = ({
  label,
  iconSrc,
}: {
  label: string | number;
  iconSrc: string;
}) => {
  return (
    <CustomChipWrapper>
      <TextLabel sx={{ flexGrow: 1, textAlign: 'center' }}>{label}</TextLabel>
      <Avatar src={iconSrc} sizes=" 24" sx={{ width: 24, height: 24 }} />
    </CustomChipWrapper>
  );
};

export default CustomChip;
