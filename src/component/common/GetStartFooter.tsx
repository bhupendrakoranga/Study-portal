import { mqMax } from '@/styles/base';
import { NEUTRALS_GREY } from '@/styles/color';
import { typographyBodyNormal } from '@/styles/typography';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import Image from '../ui/Image';

const GetStartFooter: React.FC = () => {
  return (
    <FooterWrapper>
      <StyledImg
        src="/assets/svg/Logo_banner.svg"
        width={252}
        height={56}
        alt="footerimg"
        classname="footerImg"
      />
      <FooterContainer>
        <FooterText href="/">Terms of use</FooterText>
        <FooterDivder> | </FooterDivder>
        <FooterText href="/">Privacy policy</FooterText>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default GetStartFooter;

const StyledImg = styled(Image)`
  ${mqMax.max} {
    width: 225px;
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translate(-50%, -2%);
`;

const FooterContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  min-width: 500px;
  justify-content: center;
  ${mqMax.max} {
    gap: 10px;
  }
`;

const FooterText = styled(Link)`
  color: ${NEUTRALS_GREY};
  ${typographyBodyNormal}
`;

const FooterDivder = styled.div`
  color: ${NEUTRALS_GREY};
`;
