'use client';
import React from 'react';
import styled from '@emotion/styled';
import Button from '@/component/ui/buttons/Button';
import { BLACK_TEXT, GREY, WHITE } from '@/styles/color';
import { guttersPx } from '@/styles/variables';

const PageNotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${WHITE};
`;

const Title = styled.h1`
  font-size: 5rem;
  color: ${BLACK_TEXT};
  margin: 0;
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: ${GREY};
  margin: ${guttersPx.medium} 0 ${guttersPx.extraLarge} 0;
`;

const PageNotFound = () => {
  return (
    <PageNotFoundWrapper>
      <Title>404</Title>
      <Description>Page Not Found</Description>
      <Button href="/">Go to Home</Button>
    </PageNotFoundWrapper>
  );
};

export default PageNotFound;
