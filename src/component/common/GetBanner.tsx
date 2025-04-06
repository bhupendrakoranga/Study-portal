import React from 'react';
import { Box } from '@mui/material';
import { styles } from '@/styles/globleStyle';
import useTypewriter from '@/hooks/useTypewriter';
import styled from '@emotion/styled';
import { Sentence } from '@/types/global';
import { BLACK_TEXT, BUTTON_BACKGROUND } from '@/styles/color';
import Image from '../ui/Image';
import { typographyH2, typographyXl } from '@/styles/typography';
import { mqMax } from '@/styles/base';
import { Mathica, Newton, Shakespeare } from '@/utils/constant/SVG';

const GetBanner = () => {
  const { imageBox } = styles;
  const { displayText, currentSentenceIndex } = useTypewriter({
    sentences,
    speed: 50,
  });

  return (
    <Box sx={imageBox}>
      <StyledLogo
        src="/assets/svg/logo.svg"
        width={450}
        height={100}
        alt="logo"
      />
      <Container>
        {sentences[currentSentenceIndex].image}
        <Text>
          {displayText} <Span></Span>
        </Text>
      </Container>
    </Box>
  );
};

export default GetBanner;

const StyledLogo = styled(Image)`
  margin-left: 40px;
  ${mqMax.max} {
    width: 350px;
    height: 80px;
  }
`;

const Span = styled.p`
  width: 40px;
  height: 40px;
  background-color: ${BUTTON_BACKGROUND};
  border-radius: 50%;
  display: inline-block;
  ${mqMax.max} {
    width: 24px;
    height: 24px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: absolute;
  align-items: center;
  top: 50%;
  left: 47%;
  transform: translate(-47%, -50%);
  ${mqMax.max} {
    left: 55%;
  }
`;

const Text = styled.div`
  font-size: 24px;
  min-width: 400px;
  width: 100%;
  ${typographyXl}
  color: ${BLACK_TEXT};
  ${mqMax.max} {
    ${typographyH2}
  }
`;

const sentences: Sentence[] = [
  {
    text: 'Mathica',
    image: <Mathica />,
    duration: 1000, // milliseconds
  },
  {
    text: 'Shakespeare',
    image: <Shakespeare />,
    duration: 1000, // milliseconds
  },
  {
    text: 'Newton',
    image: <Newton />,
    duration: 1000, // milliseconds
  },
];
