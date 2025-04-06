import React from 'react';
import styled from '@emotion/styled';
import { DARK_BLUE, NEUTRALS_GREY8, WHITE, GREY } from '@/styles/color';
import { guttersPx } from '@/styles/variables';
import { DeleteIcon, PlusIcon } from '@/utils/constant/SVG';
import Button from '../ui/buttons/Button';

const AddLeftContent = ({
  handleOpenModal,
  isDelete = true,
  onDelete,
}: {
  handleOpenModal: (arg: string) => void;
  isDelete?: boolean;
  onDelete?: () => void;
}) => {
  return (
    <Wrapper>
      <StyledBtn
        startIcon={<PlusIcon color={WHITE} width={18} height={18} />}
        onClick={() => handleOpenModal('Student')}
      >
        ADD STUDENT
      </StyledBtn>
      <StyledBtn
        background="transparent"
        textcolor={NEUTRALS_GREY8}
        startIcon={<PlusIcon color={NEUTRALS_GREY8} width={18} height={18} />}
        onClick={() => handleOpenModal('Teacher')}
      >
        ADD TEACHER
      </StyledBtn>
      {isDelete && (
        <StyledBtn
          onClick={onDelete}
          background="transparent"
          textcolor={NEUTRALS_GREY8}
          startIcon={
            <DeleteIcon color={NEUTRALS_GREY8} width={18} height={18} />
          }
        >
          DELETE
        </StyledBtn>
      )}
    </Wrapper>
  );
};

export default AddLeftContent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${guttersPx.small};
  align-items: center;
  justify-content: center;
`;

const StyledBtn = styled(Button)<{ textcolor?: string; background?: string }>(
  ({ textcolor, background }) => ({
    maxWidth: '208px',
    backgroundColor: background || DARK_BLUE,
    color: textcolor || WHITE,
    border: `1px solid ${background ? GREY : WHITE}`,
  }),
);
