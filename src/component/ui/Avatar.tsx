import React, { useState } from 'react';
import { Avatar as MUIAvatar, SxProps } from '@mui/material';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface AvatarProps {
  src?: string;
  alt: string;
  name: string;
  imgWidth?: number;
  imgHeight?: number;
  size?: number;
  sx?: SxProps;
}

function getfontSize(tsize: number) {
  return tsize / 2.5;
}

const StyledAvatar = styled(MUIAvatar)<{
  size: number;
  imgwidth?: number;
  imgheight?: number;
}>(
  ({ size, imgheight, imgwidth }) => css`
    width: ${size}px;
    height: ${size}px;
    font-size: ${getfontSize(size)}px;
    img {
      width: ${imgwidth}px;
      height: ${imgheight}px;
    }
  `,
);

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 40,
  sx,
  imgWidth,
  imgHeight,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  const getInitials = (uname: string) => {
    const trimmedName = uname.trim();
    if (trimmedName.length === 0) return '';
    return `${trimmedName[0]}${trimmedName[trimmedName.length - 1]}`;
  };

  return (
    <StyledAvatar
      src={!imageError && src ? src : undefined}
      alt={alt}
      size={size}
      sx={sx}
      imgwidth={imgWidth}
      imgheight={imgHeight}
      onError={handleError}
      {...props}
    >
      {(!src || imageError) && getInitials(name)}
    </StyledAvatar>
  );
};

export default Avatar;
