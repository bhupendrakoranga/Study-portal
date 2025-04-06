import { LIGHT_STEEL_BLUE } from '@/styles/color';
import { typographyCaption } from '@/styles/typography';
import styled from '@emotion/styled';
import React from 'react';

interface ContainerProps {
  margin?: string;
  borderColor?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: ${(props) => props.margin || '20px 0'};

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: ${(props) => props.borderColor || '1px solid #000'};
  }

  &:not(:empty)::before {
    margin-right: 0.25em;
  }

  &:not(:empty)::after {
    margin-left: 0.25em;
  }
`;

const Text = styled.span`
  padding: 0 10px;
  ${typographyCaption};
  color: #969db2;
`;

interface HorizontalLineWithTextProps {
  text?: string;
  margin?: string;
  borderColor?: string;
}

const HorizontalLineWithText: React.FC<HorizontalLineWithTextProps> = ({
  text = 'OR',
  margin,
  borderColor = `1px solid ${LIGHT_STEEL_BLUE}`,
}) => {
  return (
    <Container margin={margin} borderColor={borderColor}>
      <Text>{text}</Text>
    </Container>
  );
};

export default HorizontalLineWithText;
