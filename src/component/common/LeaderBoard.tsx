import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import {
  typographyBody1,
  typographyBody1Bold,
  typographyCaptionBold,
  typographyH5,
} from '@/styles/typography';
import {
  BACKGROUND_YELLOW,
  BLACK_TEXT,
  NEUTRALS_GREY,
  WHITE,
  NEUTRALS_GREY8,
} from '@/styles/color';
import { Chip } from '@mui/material';
import { guttersPx } from '@/styles/variables';
import Image from 'next/image';
import { topstudents } from '@/utils/constant/Data';
import { DropdownUpIcon } from '@/utils/constant/SVG';
import { hideScrollbar, mqMax } from '@/styles/base';

export default function LeaderBoard() {
  return (
    <div>
      <AccordionWrapper>
        <StyledAccordionSummary
          expandIcon={<DropdownUpIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ContentWrapper>
            <WinnerIcon
              src="/assets/png/Leaderboard.png"
              alt="wiinericon"
              height={24}
              width={24}
            />
            <AccordionHeading>LEADERBOARD</AccordionHeading>
            <StyledChip label="Top 15" color="primary" />
          </ContentWrapper>
        </StyledAccordionSummary>
        <AccordionDetailsWrapper>
          <DetailsWrapper>
            {topstudents.map((item, index) => (
              <StudentsWrapper key={index}>
                <LeftContent>
                  <NumberContent>{`${index + 1}.`}</NumberContent>
                  <NameContent>{item.name}</NameContent>
                </LeftContent>
                <RightContent>
                  <Marks>{item.marks}</Marks>
                  {item.rank ? (
                    <Image
                      src={item.src}
                      alt="winner icon"
                      height={24}
                      width={24}
                    />
                  ) : (
                    <span style={{ width: '24px', height: '24px' }}>
                      &nbsp;
                    </span>
                  )}
                </RightContent>
              </StudentsWrapper>
            ))}
          </DetailsWrapper>
        </AccordionDetailsWrapper>
      </AccordionWrapper>
    </div>
  );
}

const AccordionWrapper = styled(Accordion)`
  background: ${BLACK_TEXT};
  border-radius: 0 !important;
  border-bottom: 1px solid ${WHITE};
  z-index: 3;
`;

const AccordionDetailsWrapper = styled(AccordionDetails)`
  height: 252px;
  overflow: auto;
  ${hideScrollbar}
`;

const AccordionHeading = styled(Typography)`
  ${typographyH5};
  color: ${WHITE};
  ${mqMax.max} {
    font-size: 16px;
  }
`;
const StyledChip = styled(Chip)`
  color: ${BACKGROUND_YELLOW};
  border: 1px solid ${BACKGROUND_YELLOW};
  background: transparent;
  border-radius: ${guttersPx.smallHalf};
  ${typographyCaptionBold}
`;
const StyledAccordionSummary = styled(AccordionSummary)`
  gap: ${guttersPx.mediumHalf};
  border-bottom: 1px solid ${NEUTRALS_GREY8};
  .MuiAccordionSummary-content {
    flex-grow: 0;
  }
  svg {
    color: ${NEUTRALS_GREY};
  }
  height: 60px;
  min-height: auto !important;
`;
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${guttersPx.mediumHalf} !important;
  justify-content: center;
`;
const WinnerIcon = styled(Image)``;

const DetailsWrapper = styled.div`
  padding-left: ${guttersPx.mediumHalf};
  ${mqMax.max} {
    padding-left: 0px;
  }
`;
const StudentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${WHITE};
  margin-bottom: ${guttersPx.mediumHalf};
  height: 40px;
  padding: ${guttersPx.smallHalf};
`;

const LeftContent = styled.div`
  display: flex;
  align-items: flex-start; /* Align items at the start of the cross axis */
  justify-content: space-between;
  min-width: 100px;
`;

const NumberContent = styled.p`
  ${typographyBody1Bold};
  margin: 0; /* Reset margin to ensure consistent spacing */
`;

const NameContent = styled.p`
  ${typographyBody1Bold};
  margin: 0; /* Reset margin to ensure consistent spacing */
  text-align: start;
  min-width: 70px;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  ${typographyBody1};
  gap: ${guttersPx.small};
`;

const Marks = styled.span``;
