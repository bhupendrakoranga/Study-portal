import React from 'react';
import { LinearProgress, LinearProgressProps } from '@mui/material';
import styled from '@emotion/styled';
import { LIGHT_STEEL_BLUE, SUCCESS_GREEN } from '@/styles/color';
import { mqMax } from '@/styles/base';

type StyledProgressProps = LinearProgressProps & {
  backgroundColor?: string;
  progressHeight?: string;
  width?: string;
};

const shouldForwardProp = (prop: string) =>
  !['width', 'progressHeight'].includes(prop);

const StyledProgress = styled(LinearProgress, {
  shouldForwardProp,
})<StyledProgressProps>`
  min-width: 125px;
  width: ${({ width }) => width};
  height: ${({ progressHeight }) => progressHeight};
  border-radius: 40px;
  margin-top: 5px;
  ${mqMax.max} {
    width: 100% !important;
  }
`;

const LinearProgressBar: React.FC<StyledProgressProps> = ({
  variant,
  value,
  valueBuffer,
  backgroundColor,
  progressHeight = '4px',
  width = '226px',
  ...props
}) => {
  return (
    <StyledProgress
      variant={variant}
      value={value}
      progressHeight={progressHeight}
      valueBuffer={valueBuffer}
      width={width}
      {...props}
      sx={{
        '& .MuiLinearProgress-bar': {
          backgroundColor: backgroundColor || SUCCESS_GREEN,
        },
        '& .MuiLinearProgress-dashed': {
          backgroundColor: LIGHT_STEEL_BLUE,
          backgroundImage: 'none',
          animation: 'none',
        },
      }}
    />
  );
};

export default LinearProgressBar;
