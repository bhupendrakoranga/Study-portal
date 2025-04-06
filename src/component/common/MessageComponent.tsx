import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { mqMax } from '@/styles/base';
import { LIGHT_SILVER, NEUTRALS_GREY, WHITE } from '@/styles/color';
import {
  typographyBody1,
  typographyBodyNormal,
  typographyCaption,
} from '@/styles/typography';
import { guttersPx } from '@/styles/variables';
import { MessageProp } from '@/types/global';
import styled from '@emotion/styled';

const MessageContainer = styled.div`
  margin: ${guttersPx.medium} 0;
`;

const Message = styled.div`
  display: flex; /* Ensure the container is a flex container */
  flex-direction: column; /* Arrange children in a column */
  border-radius: 0 ${guttersPx.medium} ${guttersPx.medium} ${guttersPx.medium};
  background-color: ${NEUTRALS_GREY};
  padding: ${guttersPx.small};
  gap: 5px;
  color: ${WHITE};
  display: flex;
  width: 296px;
  ${mqMax.max} {
    width: 100%;
  }
`;

const CompleteBeforeThursdayContainer = styled.div`
  align-self: stretch;
  position: relative;
`;

const CompleteBeforeThursday = styled.p`
  margin: 0;
  ${typographyBody1};
  margin-bottom: ${guttersPx.medium};
`;

const IHaveMarked = styled.p`
  margin: 0;
  line-height: 18px;
  ${typographyBodyNormal};
  color: ${LIGHT_SILVER};
`;

const MessageSpace = styled.p`
  ${typographyCaption};
  color: ${LIGHT_SILVER};
  display: flex;
  justify-content: end;
`;

const MessageComponent = ({ data }: { data: MessageProp }) => {
  const { isTeacher } = useGlobalContext();
  return (
    <MessageContainer>
      <Message>
        <CompleteBeforeThursdayContainer>
          <CompleteBeforeThursday>{data?.heading}</CompleteBeforeThursday>
          <IHaveMarked>{data?.description}</IHaveMarked>
        </CompleteBeforeThursdayContainer>
        {isTeacher && <MessageSpace>{data?.date}</MessageSpace>}
      </Message>
    </MessageContainer>
  );
};

export default MessageComponent;
