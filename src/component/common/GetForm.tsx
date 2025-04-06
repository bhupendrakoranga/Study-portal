import React, { useState } from 'react';
import styled from '@emotion/styled';
import MessageComponent from '@/component/common/MessageComponent';
import LabeledTextField from '@/component/common/TextField';
import { FORM_INPUT_TYPE, messageData } from '@/utils/constant/Data';
import Button from '@/component/ui/buttons/Button'; // Import your custom Button component
import { UserNameAvatar } from '../student/SideBarContent';
import { guttersPx } from '@/styles/variables';
import { typographyBody2Bold } from '@/styles/typography';
import {
  LYNCH,
  LIGHT_STEEL_BLUE,
  DARK_BLUE,
  BUTTON_YELLOW,
} from '@/styles/color';
import Image from '../ui/Image';
import { hideScrollbar } from '@/styles/base';

const FormContainer = styled.form`
  margin-top: ${guttersPx.medium};
  position: sticky;
  top: 95px;
  z-index: 1;
  background: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${guttersPx.small} 0;
  button {
    font-weight: 600;
    text-transform: inherit;
  }
`;

const MessageText = styled.div`
  margin-top: ${guttersPx.mediumHalf};
  ${typographyBody2Bold}
  color: ${LYNCH};
  border-top: 1px solid ${LIGHT_STEEL_BLUE};
  border-bottom: 1px solid ${LIGHT_STEEL_BLUE};
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 5px;
`;

const MessageContainer = styled.div`
  overflow: auto;
  max-height: 500px;
  margin-bottom: 20px;
  z-index: 3;
  ${hideScrollbar}
`;

const Main = styled.div``;

const GetForm: React.FC<any> = () => {
  const [messages, setMessages] = useState<any[]>([messageData]);
  const initialFormData = FORM_INPUT_TYPE.reduce(
    (acc, item) => {
      acc[item.name] = '';
      return acc;
    },
    {} as Record<string, string>,
  );

  const [formData, setFormData] =
    useState<Record<string, string>>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = { ...formData, date: 'today' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setFormData(initialFormData);
  };

  return (
    <Main>
      <FormContainer onSubmit={handleSubmit}>
        <UserNameAvatar />
        {FORM_INPUT_TYPE.map((item, index) => (
          <LabeledTextField
            name={item.name}
            key={index}
            label={item.title}
            multiline={index === FORM_INPUT_TYPE.length - 1}
            rows={index === FORM_INPUT_TYPE.length - 1 ? 3 : 1}
            value={formData?.[item.name]}
            onChange={handleInputChange}
            required
          />
        ))}
        <ButtonContainer>
          <Button
            type="submit"
            variant="contained"
            button_background={DARK_BLUE}
            button_hover={BUTTON_YELLOW}
            endIcon={
              <Image
                src="/assets/png/send.png"
                width={16}
                height={16}
                alt="send"
              />
            }
          >
            Send to All
          </Button>
        </ButtonContainer>
        <MessageText>Message</MessageText>
      </FormContainer>
      <MessageContainer>
        {messages?.map((item) => (
          <MessageComponent key={item.heading} data={item} />
        ))}
      </MessageContainer>
    </Main>
  );
};

export default GetForm;
