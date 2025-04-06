'use client';
import React from 'react';
import CardsDashboard from '@/component/student/CardsDashboard';
import styled from '@emotion/styled';
import { typographyXl } from '@/styles/typography';
import { BLACK_TEXT } from '@/styles/color';
import { guttersPx } from '@/styles/variables';

const Student = () => {
  return (
    <StudentContener>
      <Content>
        <UserNametext>Hi Alex:</UserNametext>
        <CardsDashboard />
      </Content>
    </StudentContener>
  );
};

export default Student;

const StudentContener = styled.div``;

const UserNametext = styled.h1`
  ${typographyXl};
  line-height: 84px;
  color: ${BLACK_TEXT};
  text-align: center;
  margin-bottom: ${guttersPx.extraLarge};
`;

const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
