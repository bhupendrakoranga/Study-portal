import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  breakpointsMax,
  breakpointsMin,
  containerMaxWidth,
  gutters,
} from './variables';

interface TruncateMultiLineProps {
  lines?: number;
}

export const mqMin = {
  medium: `@media (min-width: ${breakpointsMin.medium}px)`,
  large: `@media (min-width: ${breakpointsMin.large}px)`,
  desktop: `@media (min-width: ${breakpointsMin.desktop}px)`,
  max: `@media (min-width: ${breakpointsMin.max}px)`,
};

export const mqMax = {
  medium: `@media (max-width: ${breakpointsMax.medium}px)`,
  large: `@media (max-width: ${breakpointsMax.large}px)`,
  desktop: `@media (max-width: ${breakpointsMax.desktop}px)`,
  max: `@media (max-width: ${breakpointsMax.max}px)`,
};

export const mqPrint = '@media print';

export const mqIE = `@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)`;

export const mqDesktopOnly = '@media (hover: hover)';

export const container = css`
  flex-grow: 1;
  margin: 0 auto;
  max-width: ${containerMaxWidth};
  padding-right: ${gutters.small}px;
  padding-left: ${gutters.small}px;
  ${mqMin.large} {
    padding-right: ${gutters.large}px;
    padding-left: ${gutters.large}px;
  }
`;

export const displayRow = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const row = css`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;

  align-items: stretch;
  justify-content: flex-start;

  margin-right: -${gutters.small / 2}px;
  margin-left: -${gutters.small / 2}px;

  ${mqIE} {
    flex: 0 0 100%;
  }
  ${mqMin.large} {
    margin-right: -${gutters.large / 2}px;
    margin-left: -${gutters.large / 2}px;
  }
`;

export const hideScrollbar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const singleLineTruncation = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TruncateMultiLine = styled.div<TruncateMultiLineProps>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  --line-clamp: ${(props) =>
    props.lines || 2}; /* Default to 2 lines if no prop is provided */
  -webkit-line-clamp: var(--line-clamp);
`;
