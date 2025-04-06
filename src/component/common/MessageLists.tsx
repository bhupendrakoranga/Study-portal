'use client';
import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { CHAT_DATA } from '@/utils/constant/Data';
import { TabBtn } from '../ui/tabs/CommonTab';
import { BACKGROUND_YELLOW, NEUTRALS_GREY8, WHITE } from '@/styles/color';
import ChatMessage from './ChatBot/ChatMessage';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { getTabs } from './TopicSidebarContent';
import { typographyH5 } from '@/styles/typography';
import { mqMax } from '@/styles/base';

const ChatboxContainer = styled.div`
  width: 100%;
  height: 88px;
  padding: 16px 32px;
  gap: 24px;
  border-radius: 20px 20px 0px 0px;
  opacity: 1;
  background-color: #330066;
  margin-top: 18px;
  display: flex;
  align-items: center;
`;

const HeaderText = styled(Typography)`
  ${typographyH5};
  color: ${WHITE};
`;

const StyledPlay = styled.div`
button{
  background: ${WHITE};
  min-width:auto;
  color:${NEUTRALS_GREY8};
  &:hover {
    background: ${BACKGROUND_YELLOW}
}
`;

const Messages = styled.div`
  #chatWrapper {
    // max-width:1000px
  }
  ${mqMax.max} {
    #chatWrapper {
      max-width: 580px;
    }
  }
`;

const MessageLists: React.FC = () => {
  const { activeTab } = useGlobalContext();
  const activeData = getTabs().find((tab) => tab.id === activeTab);

  return (
    <>
      <ChatboxContainer>
        <HeaderText>Alex</HeaderText>
        {activeData && (
          <StyledPlay>
            <TabBtn
              label={activeData?.label}
              active={true}
              icon={!!activeData?.label}
              src={
                activeData?.src && activeData.src(activeTab !== activeData.id)
              }
            />
          </StyledPlay>
        )}
      </ChatboxContainer>
      <Messages>
        {CHAT_DATA.map((card, index) => (
          <ChatMessage key={card.id + index} data={card} />
        ))}
      </Messages>
    </>
  );
};

export default MessageLists;
