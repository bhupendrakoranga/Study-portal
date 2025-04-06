'use client';
import styled from '@emotion/styled';
import MessageLists from '@/component/common/MessageLists';
import StudentList from '@/component/common/StudentList';
import TopicLayout from '../common/TopicLayout';
import { mqMax } from '@/styles/base';

const Topic = () => {
  return (
    <TopicLayout islist>
      <Container>
        <ChatboxContainer>
          <MessageLists />
        </ChatboxContainer>
        <StudentListContainer>
          <StudentList />
        </StudentListContainer>
      </Container>
    </TopicLayout>
  );
};

export default Topic;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100vw;
  overflow-x: hidden;
`;

const StudentListContainer = styled.div`
  position: fixed;
  right: 0;
  width: 240px;
  bottom: 0;
  ${mqMax.max} {
    width: 17%;
  }
`;

const ChatboxContainer = styled.div`
  width: 1320px;
  ${mqMax.max} {
    width: 79%;
  }
  margin-top: 20px;
`;
