'use client';
import React, { useState, ReactNode } from 'react';
import { Card, CardContent, IconButton, Box } from '@mui/material';
import styled from '@emotion/styled';
import { typographyBody1Bold } from '@/styles/typography';
import LinearProgressBar from '../ui/inputs/LinearProgressBar';
import {
  BLACK_TEXT,
  LIGHT_SILVER,
  WHITE,
  LIGHT_YELLOW,
  GREY,
} from '@/styles/color';
import { guttersPx } from '@/styles/variables';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import CommonLink from '../ui/CommonLink';
import TopicCheckbox from './TopicCards/TopicCheckbox';
import { mqMax, TruncateMultiLine } from '@/styles/base';
import { DropdownDownIcon, DropdownUpIcon } from '@/utils/constant/SVG';
import { css } from '@emotion/react';

interface StyledCardProps {
  isborder: boolean;
  isactive?: boolean;
  isparent?: boolean;
}

interface ConnectorProps {
  isConnect: boolean;
}

const getMarginAndBorder = ({ isborder, isparent }: StyledCardProps) => {
  const border = `1px solid ${LIGHT_SILVER}`;
  const baseStyles = css`
    margin-bottom: ${guttersPx.small};
    border-radius: ${guttersPx.small};
    border: ${isborder ? border : 'none'};
    width: ${!isborder ? '100%' : 'auto'};
  `;

  const beforeStyles = !isparent
    ? css`
        &::before {
          content: '-';
          position: absolute;
          margin-top: 20px;
          left: -10px;
          font-size: 30px;
          color: ${GREY};
        }
      `
    : '';

  return css`
    ${baseStyles}
    ${beforeStyles}
  `;
};

const shouldForwardProp = (prop: string) =>
  !['isborder', 'isactive', 'isparent', 'isConnect'].includes(prop);

const StyledCard = styled(Card, { shouldForwardProp })<StyledCardProps>`
  box-shadow: none;
  box-shadow: 0px 0px 5px 0px ${WHITE};
  width: 100%;
  height: 84px;
  ${({ isborder, isparent }) => getMarginAndBorder({ isborder, isparent })}
  background-color: ${({ isactive }) => (isactive ? LIGHT_YELLOW : WHITE)};
  &:focus {
    outline: none;
    background-color: ${LIGHT_YELLOW};
  }
  &:focus-visible {
    outline: none;
    background-color: ${LIGHT_YELLOW};
  }
  ${mqMax.max} {
    width: auto !important;
    height: 76px;
  }
`;

const CardHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  height: 48px;
  ${mqMax.max} {
    margin-bottom: 5px;
    height: 44px;
  }
`;

const ProgressWrapper = styled.div<{ ischild: boolean }>`
  margin-bottom: ${({ ischild }) => (ischild ? guttersPx.small : '0')};
  &:last-child {
    margin-bottom: 0;
  }
`;

const HeadingName = styled(TruncateMultiLine)`
  ${typographyBody1Bold};
  color: ${BLACK_TEXT};
  ${mqMax.max} {
    font-size: 14px;
  }
`;

export const Connector = styled(Box, { shouldForwardProp })<ConnectorProps>`
  position: relative;
  margin-left: 12px; /* Adjust as needed */
  ${({ isConnect }) =>
    isConnect &&
    `
    &::before {
      content: "";
      position: absolute;
      top: -20px;
      left: -9px; /* Adjust as needed */
      width: 2px; /* Thickness of the line */
      height: calc(100% - 25px);
      ${mqMax.max} {
        height: calc(100% - 15px);
      }
      background-color: ${GREY};
    }
  `}
`;

const StyledContent = styled(CardContent)`
  padding: 16px 24px;
  ${mqMax.max} {
    padding: 16px;
  }
`;

// Props type for ExpandableCard component
interface ExpandableCardProps {
  name: string;
  progress?: number;
  children?: ReactNode;
  href?: string;
  query?: any;
  isTeacher?: boolean;
  isConnect?: boolean;
  isCheckbox?: boolean;
  isBorder?: boolean;
  isActive?: boolean;
  depth?: number;
  isVideoicon?: boolean;
  onclick?: (arg: string) => void;
}

// Component to render each card with a name, progress bar, and an accordion for nested cards
const ExpandableCard: React.FC<ExpandableCardProps> = ({
  name,
  progress,
  href = '/',
  children,
  query,
  isTeacher = false,
  isCheckbox = true,
  isConnect = true,
  isBorder = false,
  isActive,
  depth = 0,
  isVideoicon = true,
  onclick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [checkedinput, setCheckedInput] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleCheckbox = (e: {
    target: { name: string; checked: boolean };
  }) => {
    const { name: checkboxname, checked } = e.target;
    if (!isTeacher) {
      return;
    }
    setCheckedInput({ ...checkedinput, [checkboxname]: checked });
  };

  const renderIconButton = () => (
    <IconButton sx={{ p: 0 }} onClick={handleAccordionToggle}>
      {expanded ? <DropdownUpIcon /> : <DropdownDownIcon />}
    </IconButton>
  );

  const renderVideoButton = () =>
    isVideoicon ? (
      <CommonLink href={href} query={query}>
        <Image src="/assets/png/play.png" alt="play" width={24} height={24} />
      </CommonLink>
    ) : null;

  return (
    <>
      <StyledCard
        isborder={isBorder}
        tabIndex={0}
        isactive={isActive}
        isparent={depth === 0}
        className={depth !== 0 ? 'childcard' : 'rootcard'}
      >
        <StyledContent sx={{ position: 'relative', pb: '12px !important' }}>
          <CardHeader className="cardheader">
            {!isVideoicon && onclick ? (
              <CommonLink onclick={() => onclick(name)}>
                <HeadingName>{name}</HeadingName>
              </CommonLink>
            ) : (
              <HeadingName>{name}</HeadingName>
            )}
            {isCheckbox && (
              <TopicCheckbox
                label={label}
                onChange={isTeacher ? handleCheckbox : undefined}
                isTeacher={isTeacher}
                name={name}
                checked={isTeacher ? !!checkedinput?.[name] : true}
              />
            )}
            {children ? renderIconButton() : renderVideoButton()}
          </CardHeader>
          {progress !== undefined && (
            <ProgressWrapper ischild={!!children}>
              <LinearProgressBar
                variant="buffer"
                value={progress}
                valueBuffer={0}
              />
            </ProgressWrapper>
          )}
        </StyledContent>
      </StyledCard>
      {expanded && (
        <Connector className="connecter" isConnect={isConnect}>
          {children}
        </Connector>
      )}
    </>
  );
};

// Props type for NestedCards component
interface NestedCardsProps {
  data: any[];
  isTeacher?: boolean;
  depth?: number;
  isVideoicon?: boolean;
  onclick?: (arg: string) => void;
}

// Component to render nested cards based on data structure
const NestedCards: React.FC<NestedCardsProps> = ({
  data,
  isTeacher = false,
  depth = 0,
  isVideoicon = true,
  onclick,
}) => {
  const pathname = usePathname();
  return (
    <Box sx={{ position: 'relative' }}>
      {data.map((item, index) => (
        <ExpandableCard
          key={index}
          name={item.name}
          href={`${pathname}/${item.name}`}
          query={{ topic: item.name }}
          progress={item.progress}
          isTeacher={isTeacher}
          isCheckbox={isTeacher ? true : item.isCheckbox}
          depth={depth}
          isVideoicon={isVideoicon}
          onclick={onclick}
        >
          {item.children && (
            <NestedCards
              onclick={onclick}
              data={item.children}
              isTeacher={isTeacher}
              depth={depth + 1}
              isVideoicon={isVideoicon}
            />
          )}
        </ExpandableCard>
      ))}
    </Box>
  );
};

export { ExpandableCard, NestedCards };
