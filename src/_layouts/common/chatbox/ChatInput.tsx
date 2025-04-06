// components/ChatInput.tsx
'use client';
import { mqMax } from '@/styles/base';
import { WHITE } from '@/styles/color';
import { guttersPx } from '@/styles/variables';
import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${guttersPx.smallHalf};
  width: 912px;
  height: 75px;
  ${mqMax.max} {
    width: 700px;
    height: 64px;
  }
  padding: 24px;
  background: ${WHITE};
  /* Panel Shadow */
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 20px;
  font-size: 16px;
  background-color: ${WHITE};
`;

const FilePicker = styled.label`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  color: #888;
  margin-right: 5px;

  &:hover {
    color: #333;
  }
`;

const SendButton = styled.button`
  border: none;
  cursor: pointer;
  margin-left: 5px;
  background: transparent;
`;

const ChatInput = ({ isFileSelect = true }: { isFileSelect?: boolean }) => {
  return (
    <Container className="chatinput">
      {isFileSelect && (
        <FilePicker>
          <Image
            src="/assets/png/fileinput.png"
            alt="file"
            width={24}
            height={24}
          />
          <input type="file" style={{ display: 'none' }} />
        </FilePicker>
      )}
      <Input type="text" />
      <SendButton>
        <Image
          src="/assets/png/Content.png"
          alt="file"
          width={24}
          height={24}
        />
      </SendButton>
    </Container>
  );
};

export default ChatInput;
