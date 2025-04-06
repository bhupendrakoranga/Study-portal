import React from 'react';
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Image from '../Image';
import { typographyH4 } from '@/styles/typography';
import { guttersPx } from '@/styles/variables';
import { DARK_BLUE, WHITE } from '@/styles/color';
import { InputContainer } from '@/styles/globleStyle';
import Button, { SaveButton } from '../buttons/Button';

// Interface for props
interface AdminFormRootModalProps {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showCancelButton?: boolean;
}

// Styled Components
const ModalContent = styled(DialogContent)`
  border-radius: ${guttersPx.mediumHalf};
  padding: 40px 60px;
`;

const ModalBody = styled.div`
  margin-bottom: ${guttersPx.medium};
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;

const Header = styled.div`
  background-image: url('/assets/png/formheader.png');
  background-color: ${DARK_BLUE};
  width: 490px;
  height: 88px;
  display: grid;
  align-items: center;
  border-radius: ${guttersPx.smallHalf};
  padding: ${guttersPx.extraLarge};
`;

const HeaderText = styled.div`
  ${typographyH4};
  color: ${WHITE};
`;

const StyledForm = styled.form`
  padding: 30px 0;
  padding-bottom: 0;
`;

const ButtonContainer = styled(InputContainer)`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

// Functional Component
const AdminFormRootModal: React.FC<AdminFormRootModalProps> = ({
  title,
  isOpen,
  children,
  maxWidth = 'lg',
  showCancelButton = false,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog
      open={isOpen}
      maxWidth={maxWidth}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px',
          background: '#edf0f3',
          marginTop: '100px',
        },
      }}
    >
      <CloseIcon onClick={onClose}>
        <Image
          src="/assets/png/cancel.png"
          alt="cancel"
          width={24}
          height={24}
        />
      </CloseIcon>
      <ModalContent>
        <Header>
          <HeaderText>{title}</HeaderText>
        </Header>
        <StyledForm onSubmit={onSubmit}>
          <ModalBody>{children}</ModalBody>
          <ButtonContainer>
            <SaveButton />
            {showCancelButton && <Button onClick={onClose} />}
          </ButtonContainer>
        </StyledForm>
      </ModalContent>
    </Dialog>
  );
};

export default AdminFormRootModal;
