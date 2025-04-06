// ChatMessage.tsx
import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Image from '@/component/ui/Image';
import { BLACK_TEXT, LIGHT_SILVER } from '@/styles/color';
import { typographyBody1, typographyBodyBold } from '@/styles/typography';
import Typewriter from 'typewriter-effect';
import { TypingOptions } from '@/types/global';

interface ChatMessageProps {
  data: {
    id: string | number;
    color: string;
    image: string;
    title: string;
    dec: string;
  };
  isTyping?: boolean;
  typingOptions?: TypingOptions;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  data,
  isTyping = false,
  typingOptions,
}) => {
  return (
    <ChatRowContainer color={data.color}>
      <Wrapper id="chatWrapper">
        <LeftContent>
          <ImageContainer
            src={data.image}
            width={64}
            height={64}
            alt={data.title}
          />
          <NameText>{data.title}</NameText>
        </LeftContent>
        <Description>
          {isTyping ? (
            <Typewriter
              options={typingOptions}
              onInit={(typewriter) => {
                typewriter
                  .typeString(data.dec)
                  .callFunction(() => {
                    console.log('String typed out!');
                  })
                  .start();
              }}
            />
          ) : (
            data.dec
          )}
        </Description>
      </Wrapper>
    </ChatRowContainer>
  );
};

export default ChatMessage;

// Styled components
const ChatRowContainer = styled.div<{ color: string }>`
  width: 100%;
  background-color: ${(props) => props.color};
  border-bottom: 1px solid ${LIGHT_SILVER};
  display: flex;
  justify-content: center;
  padding: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 912px;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

const ImageContainer = styled(Image)`
  border-radius: 20px;
`;

const NameText = styled(Typography)`
  ${typographyBodyBold}
  color: ${BLACK_TEXT};
`;

const Description = styled.div`
  ${typographyBody1}
  color: ${BLACK_TEXT};
  max-width: 720px;
`;
