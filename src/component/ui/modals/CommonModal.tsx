import React from 'react';
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import { typographyH4 } from '@/styles/typography';
import { guttersPx } from '@/styles/variables';
import Image from '../Image';

interface CommonModalProps {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: ${guttersPx.mediumHalf};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  ${typographyH4};
  margin: 0;
`;

const ModalBody = styled.div`
  margin-bottom: ${guttersPx.medium};
`;

const CloseIcon = styled.div`
  text-align: end;
  padding: ${guttersPx.medium} ${guttersPx.medium} 0 ${guttersPx.medium};
`;

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
}) => {
  return (
    <Dialog fullWidth maxWidth={false} open={isOpen} onClose={onClose}>
      <ModalContainer>
        <ModalContent>
          <CloseIcon onClick={onClose}>
            <Image
              src="/assets/png/cancel.png"
              alt="cancel"
              width={24}
              height={24}
            />
          </CloseIcon>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ModalContainer>
    </Dialog>
  );
};

export default CommonModal;
