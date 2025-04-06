import Button from '@/component/ui/buttons/Button';
import Image from '@/component/ui/Image';
import { BLACK_TEXT, DARK_BLUE, NEUTRALS_GREY, WHITE } from '@/styles/color';
import { guttersPx } from '@/styles/variables';
import styled from '@emotion/styled';
import React from 'react';

const SidebarContainer = styled.div`
  max-width: 250px;
  width: 100%;
  height: 100%;
  background-color: ${NEUTRALS_GREY};
  border-radius: ${guttersPx.smallHalf};
  padding: ${guttersPx.medium} 0;
  position: sticky;
`;

const ButtonContatiner = styled.div`
  display: flex;
  align-items: center;
  gap: ${guttersPx.mediumHalf};
  justify-content: center;
  padding: 0 ${guttersPx.mediumHalf};
`;

const StyledButton = styled(Button)`
  min-width: auto;
  color: ${BLACK_TEXT};
  padding: ${guttersPx.smallHalf} ${guttersPx.medium};
  min-height: auto;
`;

const NoteItem = styled.div`
  padding: ${guttersPx.mediumHalf};
  margin: ${guttersPx.medium} 0;
  background-color: ${DARK_BLUE};
  color: ${WHITE};
  cursor: pointer;
`;

interface Note {
  title: string;
  content?: string;
  id: string;
}

interface NotesActionProps {
  notes: Note[];
  addNote: () => void;
  deleteNote: () => void;
  selectNote: (index: number) => void;
}

const NotesAction: React.FC<NotesActionProps> = ({
  notes,
  addNote,
  deleteNote,
  selectNote,
}) => (
  <SidebarContainer>
    <ButtonContatiner>
      <StyledButton
        button_background={WHITE}
        onClick={addNote}
        startIcon={
          <Image src="/assets/png/file.png" width={24} height={24} alt="file" />
        }
      >
        New
      </StyledButton>
      <StyledButton
        button_background={WHITE}
        onClick={deleteNote}
        startIcon={
          <Image
            src="/assets/png/delete2.png"
            width={24}
            height={24}
            alt="file"
          />
        }
      >
        Delete
      </StyledButton>
    </ButtonContatiner>
    {notes.map((note, index) => (
      <NoteItem key={index} onClick={() => selectNote(index)}>
        {note.title}
      </NoteItem>
    ))}
  </SidebarContainer>
);

export default NotesAction;
