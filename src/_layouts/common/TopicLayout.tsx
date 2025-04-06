'use client';
import { mqMax } from '@/styles/base';
import styled from '@emotion/styled';
import React from 'react';
import Chatbot from './chatbox/ChatBot/Chatbot';
import ChatInput from './chatbox/ChatInput';

const TopicLayout = ({
  children,
  islist,
}: {
  children: React.ReactNode;
  islist?: boolean;
}) => {
  return (
    <TopicContainer>
      {children}
      <ChatContainer islist={islist}>
        <ChatInput />
      </ChatContainer>
      <ChatBoxContainer islist={islist}>
        <Chatbot />
      </ChatBoxContainer>
    </TopicContainer>
  );
};

export default TopicLayout;

const TopicContainer = styled.div``;

const ChatContainer = styled.div`
  position: fixed;
  min-width: 600px;
  bottom: 50px;
  ${mqMax.max} {
    left: ${(props: { islist?: boolean }) => (props?.islist ? '26%' : '35%')};
  }
  left: ${(props: { islist?: boolean }) => (props?.islist ? '29%' : '35%')};
`;

const ChatBoxContainer = styled.div`
  position: fixed;
  min-width: 720px;
  bottom: 0px;
  left: ${(props: { islist?: boolean }) => (props?.islist ? '34%' : '40%')};
  margin-top: 20px;
  ${mqMax.max} {
    left: ${(props: { islist?: boolean }) => (props?.islist ? '30%' : '39%')};
    min-width: 600px;
  }
`;
