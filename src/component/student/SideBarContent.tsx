import React, { useState } from 'react';
import { ListItem, ListItemAvatar, Typography } from '@mui/material';
import Avatar from '@/component/ui/Avatar';
import Checkbox from '@/component/ui/inputs/Checkbox';
import { typographyH4 } from '@/styles/typography';
import styled from '@emotion/styled';
import { guttersPx } from '@/styles/variables';
import Image from 'next/image';
import MessageComponent from '@/component/common/MessageComponent';
import { styles } from '@/styles/globleStyle';
import { BLACK_TEXT, GREY } from '@/styles/color';
import { messageData } from '@/utils/constant/Data';
import { mqMax } from '@/styles/base';
const avtarSize = 80;

const SideBarContent = () => {
  const { textFieldText } = styles;
  const [checked, setChecked] = useState(false);
  return (
    <>
      <UserNameAvatar />
      <Typography sx={{ ...textFieldText, my: 2 }} component="div" variant="h6">
        Week 2: Numbers
      </Typography>
      <CheckBoxContainer>
        <Checkbox
          label="Scientific Notation"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />

        <Image
          src="/assets/png/!.png"
          width={20}
          height={20}
          unoptimized
          alt="20"
        />
      </CheckBoxContainer>
      <MessageComponent data={messageData} />
    </>
  );
};

export default SideBarContent;

const UserName = styled(Typography)`
  ${typographyH4};
  color: ${BLACK_TEXT};
  margin-left: ${guttersPx.small};
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  label {
    color: ${BLACK_TEXT};
  }
`;

const StyledListItemAvatar = styled(ListItemAvatar)`
  div {
    font-weight: 700;
    ${mqMax.max} {
      width: 50px;
      height: 50px;
      font-size: 20px !important;
    }
  }
`;

export const UserNameAvatar = () => {
  return (
    <ListItem sx={{ my: 2, p: 0 }}>
      <StyledListItemAvatar>
        <Avatar
          alt={''}
          size={avtarSize}
          sx={{ bgcolor: '#CFD8E5', color: GREY }}
          name={'Mr. Jardin'}
        />
      </StyledListItemAvatar>
      <UserName>Mr. Jardin</UserName>
    </ListItem>
  );
};
