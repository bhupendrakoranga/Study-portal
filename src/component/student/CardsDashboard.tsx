import React from 'react';
import { Card, CardMedia, Typography, Box } from '@mui/material';
import Image from 'next/image';
import { CARDS_DATA } from '@/utils/constant/Data';
import styled from '@emotion/styled';
import { BLACK_TEXT } from '@/styles/color';
import { typographyH5 } from '@/styles/typography';
import CommonLink from '../ui/CommonLink';
import { guttersPx } from '@/styles/variables';

// Define styles using Emotion's styled and css
const Container = styled(Box)`
  display: flex;
  gap: 30px;
`;

const CardContainer = styled(Card)`
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  color: ${BLACK_TEXT};
  box-shadow: none;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }

  &:hover .card-image {
    border: 5px solid #6600cc;
    border-radius: 25px;
  }

  &:hover .text {
    opacity: 100%;
  }
`;

const CardImage = styled(Image)`
  border-radius: 25px;
  transition: border 0.3s;
`;

const Text = styled(Typography)`
  text-align: center;
  ${typographyH5};
  opacity: 40%;
  transition: opacity 0.3s;
`;

const CardContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${guttersPx.mediumHalf};
`;

const CardsDashboard = () => {
  return (
    <Container>
      {CARDS_DATA.map((item) => (
        <CommonLink
          key={item.id}
          href={`/student/dashboard/${item.title}`}
          query={{ course: item.title }}
        >
          <CardContainer key={item.id}>
            <CardContent>
              <CardMedia>
                <CardImage
                  src={item.image}
                  alt="img"
                  width={220}
                  height={220}
                  className="card-image"
                />
              </CardMedia>
              <Text gutterBottom variant="h5" className="text">
                {item.title}
              </Text>
            </CardContent>
          </CardContainer>
        </CommonLink>
      ))}
    </Container>
  );
};

export default CardsDashboard;
