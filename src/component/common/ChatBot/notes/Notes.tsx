import { mqMax } from '@/styles/base';
import { WHITE } from '@/styles/color';
import { guttersPx } from '@/styles/variables';
import styled from '@emotion/styled';
import React from 'react';
import NotesAction from '../messages/NotesAction';

const Notes = () => {
  const addNote = () => {
    console.log('Adding');
  };
  const deleteNote = () => {
    console.log('deleteNote');
  };
  const selectNote = () => {
    console.log('selectNote');
  };
  return (
    <NotesContainer>
      <RightContent>
        <NotesAction
          notes={notes}
          addNote={addNote}
          deleteNote={deleteNote}
          selectNote={selectNote}
        />
      </RightContent>
      <LeftContent>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
        rerum rem quod officia dolor possimus accusamus Lorem ipsum dolor sit
        amet, consectetur adipisicing elit. Similique rerum rem quod officia
        dolor possimus accusamus o officiis tempore repellat eos? Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Similique rerum rem quod
        officia dolor possimus accusamus Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Similique rerum rem quod officia dolor possimus
        accusamus o officiis tempore repellat eos?
      </LeftContent>
    </NotesContainer>
  );
};

export default Notes;

const NotesContainer = styled.div`
  position: relative;
  display: flex;
  max-height: 400px;
  overflow: auto;
`;

const RightContent = styled.div`
  margin: ${guttersPx.medium};
  position: sticky;
  top: ${guttersPx.medium};
`;

const LeftContent = styled.div`
  margin: ${guttersPx.medium};
  color: ${WHITE};
  max-width: 350px;
  ${mqMax.max} {
    max-width: 250px;
  }
`;

const notes = [
  {
    id: '1',
    title: 'Scientific Notation',
  },
  {
    id: '2',
    title: 'Large Numbers',
  },
];
