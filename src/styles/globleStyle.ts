import styled from '@emotion/styled';
import { Checkbox } from '@mui/material';
import { css } from '@emotion/react';
interface InputContainerProps {
  marginBottom?: string;
}

import {
  BACKGROUND_GREY,
  BACKGROUND_YELLOW,
  BLACK_TEXT,
  BUTTON_BACKGROUND,
  BUTTON_YELLOW,
  GREY,
  NEUTRALS_GREY4,
  WHITE,
} from './color';
import { guttersPx } from './variables';
import { typographyBody1Bold, typographyBody2Bold } from './typography';
import { mqMax } from './base';

export const styles = {
  gridItem: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  titleTest: {
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '34px',
    marginBottom: '10px',
  },
  subTitleTest: {
    color: GREY,
    fontSize: '18px',
    lineHeight: '27px',
    fontWeight: 400,
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '14px',
    justifyContent: 'center',
  },
  button: {
    color: WHITE,
    backgroundColor: BUTTON_BACKGROUND,
    textTransform: 'capitalize',
    minWidth: '240px',
    minHeight: '56px',
    borderRadius: '40px',
    '&:hover': {
      background: BUTTON_YELLOW,
    },
  },
  imageBox: {
    backgroundImage: `url(/assets/png/home-icon.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: BACKGROUND_YELLOW,
    height: '100%',
    paddingTop: '14px',
    position: 'relative',
  },
  logo: {
    backgroundImage: `url(/assets/svg/logo.svg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '100%',
    maxWidth: '330px',
    height: '86px',
    marginLeft: '20px',
  },
  mainContainer: {
    backgroundColor: WHITE,
    position: 'fixed',
    zIndex: '99',
    boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.15)',
    height: '72px',
    display: 'flex',
    justifyContent: 'center',
  },
  parentDiv: {
    backgroundColor: BACKGROUND_GREY,
    width: '100%',
    mt: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '56px',
    lineHeight: '84px',
    fontWeight: '700',
    color: BLACK_TEXT,
  },
  cardContainer: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },

  Text: {
    textAlign: 'center',
    fontSize: '22px',
    lineHeight: '28px',
    fontWeight: '700',
    color: BLACK_TEXT,
  },
  containerFooter: {},
  titleDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textFieldText: {
    fontWeight: '700',
    fontSize: '22px',
    lineHeight: '28px',
    color: BLACK_TEXT,
  },
};

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

export const StyledCheckBox = styled(Checkbox)`
  width: 24px !important;
  height: 24px !important;
  border-radius: 6px;
  color: ${NEUTRALS_GREY4};
  .MuiIconButton-root {
    padding: 9px;
    border-radius: 8px; /* Adjust the border radius as needed */
  }
`;

export const formControlLabelStyles = css`
  margin: ${guttersPx.smallHalf} 0;
  gap: 8px;

  .MuiCheckbox-root {
    color: ${NEUTRALS_GREY4};
    border-radius: 36px;
  }

  .MuiTypography-body1 {
    ${typographyBody1Bold};
  }

  ${mqMax.max} {
    .MuiTypography-body1 {
      ${typographyBody2Bold};
    }
  }
`;

export const InputContainer = styled.div<InputContainerProps>`
  margin-bottom: ${({ marginBottom }) => marginBottom || guttersPx.mediumHalf};
`;

export const StyledTextarea = styled.textarea`
  border-radius: 8px;
  background: #f1f4f9;
  width: 100%;
  border: none;
  padding: 10px;
  &:focus {
    outline: none;
  }
  resize: none;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${BUTTON_BACKGROUND};
  border-radius: 50px;
  height: 24px;
  width: 24px;
  color: ${WHITE};
  cursor: pointer;
`;
