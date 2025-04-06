import { mqMax } from '@/styles/base';
import { BLACK_TEXT, LYNCH } from '@/styles/color';
import ChatInput from '@/_layouts/common/chatbox/ChatInput';
import styled from '@emotion/styled';
import React from 'react';

const Messages = () => {
  return (
    <MessageContainer>
      <ChatContainer></ChatContainer>
      <BottomContaint>
        <ChatInput isFileSelect={false} />
      </BottomContaint>
    </MessageContainer>
  );
};

export default Messages;

const MessageContainer = styled.div`
  width: 720px;
  ${mqMax.max} {
    width: 600px;
  }
`;

const ChatContainer = styled.div`
  background: ${BLACK_TEXT};
  min-height: 300px;
`;

const BottomContaint = styled.div`
  background: ${LYNCH};
  display: flex;
  justify-content: center;
  padding: 20px 0;
  .chatinput {
    width: 550px;
  }
  ${mqMax.max} {
    .chatinput {
      width: 450px;
    }
  }
`;
