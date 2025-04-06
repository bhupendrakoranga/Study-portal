import ChatMessage from '@/component/common/ChatBot/ChatMessage';
import { ChatMessageData } from '@/_layouts/student/courses/TabComponents';
import styled from '@emotion/styled';
import React from 'react';

const typingOptions = {
  autoStart: true,
  loop: false,
  delay: 5, // Typing speed in milliseconds
  deleteSpeed: 0, // Speed of deleting text, 0 means no deletion
};

const TopicChat = ({
  search,
  data,
}: {
  search: any;
  data: ChatMessageData;
}) => {
  return search ? (
    <TopicChatContainer>
      <ChatMessage data={data} isTyping typingOptions={typingOptions} />
    </TopicChatContainer>
  ) : null;
};

export default TopicChat;

const TopicChatContainer = styled.div`
  margin: 60px 0;
`;
