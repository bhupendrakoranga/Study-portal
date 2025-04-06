import { css } from '@emotion/react';
import {
  // Import font sizes and font weights from variables
  fontSizeH1,
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  fontSizeH5,
  fontSizeH6,
  fontSizeBody1,
  fontSizeBody2,
  fontSizeCaption,
  fontSizeCaptionSmall,
  fontWeightRegular,
  fontWeightSemibold,
  fontWeightBold,
  fontWeightNormal,
  fontExtraLarge,
  fontSizeBody3,
} from './variables';

// Define typography styles using Emotion's css function
export const typographyXl = css`
  font-size: ${fontExtraLarge};
  font-weight: ${fontWeightBold};
`;

export const typographyH1 = css`
  font-size: ${fontSizeH1};
  font-weight: ${fontWeightBold};
`;

export const typographyH2 = css`
  font-size: ${fontSizeH2};
  font-weight: ${fontWeightBold};
`;

export const typographyH3 = css`
  font-size: ${fontSizeH3};
  font-weight: ${fontWeightSemibold};
`;

export const typographyH4 = css`
  font-size: ${fontSizeH4};
  font-weight: ${fontWeightBold};
`;

export const typographyH5 = css`
  font-size: ${fontSizeH5};
  font-weight: ${fontWeightBold};
`;

export const typographyH6 = css`
  font-size: ${fontSizeH6};
  font-weight: ${fontWeightBold};
`;

export const typographyH6SemiBold = css`
  font-size: ${fontSizeH6};
  font-weight: ${fontWeightSemibold};
`;

export const typographyBody1 = css`
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightRegular};
`;

export const typographyBody1Semibold = css`
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightSemibold};
`;

export const typographyBody1Bold = css`
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightBold};
`;

export const typographyBody1Normal = css`
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightNormal};
`;

export const typographyBody2 = css`
  font-size: ${fontSizeBody2};
  font-weight: ${fontWeightRegular};
`;

export const typographyBody2Semibold = css`
  font-size: ${fontSizeBody2};
  font-weight: ${fontWeightSemibold};
`;

export const typographyBody2Bold = css`
  font-size: ${fontSizeBody2};
  font-weight: ${fontWeightBold};
`;

export const typographyBody2Normal = css`
  font-size: ${fontSizeBody2};
  font-weight: ${fontWeightNormal};
`;

export const typographyBodyNormal = css`
  font-size: ${fontSizeBody3};
  font-weight: ${fontWeightRegular};
`;

export const typographyBodyBold = css`
  font-size: ${fontSizeBody3};
  font-weight: ${fontWeightBold};
`;

export const typographyCaption = css`
  font-size: ${fontSizeCaption};
  font-weight: ${fontWeightRegular};
`;

export const typographyCaptionSemibold = css`
  font-size: ${fontSizeCaption};
  font-weight: ${fontWeightSemibold};
`;

export const typographyCaptionBold = css`
  font-size: ${fontSizeCaption};
  font-weight: ${fontWeightBold};
`;

export const typographyCaptionNormal = css`
  font-size: ${fontSizeCaption};
  font-weight: ${fontWeightNormal};
`;

export const typographyCaptionSmall = css`
  font-size: ${fontSizeCaptionSmall};
  font-weight: ${fontWeightRegular};
`;

export const typographyCaptionSmallSemibold = css`
  font-size: ${fontSizeCaptionSmall};
  font-weight: ${fontWeightSemibold};
`;

export const typographyCaptionSmallBold = css`
  font-size: ${fontSizeCaptionSmall};
  font-weight: ${fontWeightBold};
`;

export const typographyCaptionSmallNormal = css`
  font-size: ${fontSizeCaptionSmall};
  font-weight: ${fontWeightNormal};
`;
