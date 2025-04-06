'use client';
import DashboardTable from '@/component/common/DashboardTable';
import DropdownButton from '@/component/common/DropdownButton';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { DROPDOWN_BTN_TYPE, headers, rows } from '@/utils/constant/Data';
import styled from '@emotion/styled';
import React from 'react';

const TopicLists = () => {
  const { isTeacher } = useGlobalContext();
  return (
    <Container>
      <DashboardTable headers={headers} rows={rows} isTeacher={isTeacher} />
      <ButtonContainer>
        <DropdownButton
          variant="contained"
          color="primary"
          items={DROPDOWN_BTN_TYPE}
        >
          Class A
        </DropdownButton>
      </ButtonContainer>
    </Container>
  );
};

export default TopicLists;

const ButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  margin-top: 43px;
  position: relative;
  height: 100%;
`;
