import * as React from 'react';
import { Badge } from '@mui/material';
import styled from '@emotion/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@/component/ui/buttons/Button';
import { BUTTON_YELLOW, GREY, WHITE, BLACK_TEXT } from '@/styles/color';
import Image from '@/component/ui/Image';
import { guttersPx } from '@/styles/variables';
import { typographyCaptionNormal } from '@/styles/typography';
import { StyledButton } from '@/component/common/DropdownButton';
import ChatbotUI from '@/component/common/ChatBot/ChatbotUI';

interface TabsBtnProps {
  active: boolean;
}

export default function Chatbot() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState('Notes');

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <>
      <Root>
        <BudgeContainer>
          <StyledBudge badgeContent={3} color="warning">
            <DrawerBtn onClick={() => toggleDrawer(!open)}>
              <KeyboardArrowDownIcon />
            </DrawerBtn>
          </StyledBudge>
        </BudgeContainer>
        {open && (
          <Container>
            <Header>
              {tabsdata?.map((item) => (
                <TabsBtn
                  key={item.id}
                  onClick={() => setActive(item.title)}
                  active={active === item.title}
                  startIcon={
                    <Image
                      src={item.icon}
                      width={24}
                      height={24}
                      alt={'file'}
                    />
                  }
                  endIcon={<Counter badgeContent={item.count} />}
                  button_hover="transparent"
                >
                  {item.title}
                </TabsBtn>
              ))}
            </Header>
            <Content>
              <ChatbotUI type={active} />
            </Content>
          </Container>
        )}
      </Root>
    </>
  );
}

const Counter = ({ badgeContent }: { badgeContent: number }) => {
  return <CounterContainer>{badgeContent}</CounterContainer>;
};

const StyledBudge = styled(Badge)`
  .MuiBadge-standard {
    width: 29px;
    height: 29px;
    border-radius: 40px;
    background: ${BUTTON_YELLOW};
  }
`;

const BudgeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  background: ${BLACK_TEXT};
`;

const CounterContainer = styled.div`
  height: ${guttersPx.large};
  width: ${guttersPx.large};
  border-radius: 50px;
  background-color: ${BUTTON_YELLOW};
  color: ${WHITE};
  display: grid;
  place-content: center;
`;

const Root = styled.div`
  height: '100%';
`;

const DrawerBtn = styled(StyledButton)`
  padding: ${guttersPx.smallHalf} ${guttersPx.large};
  width: 80px;
  height: 40px;
  background: ${BLACK_TEXT};
`;

const Header = styled.div`
  background: ${GREY};
  padding: ${guttersPx.smallHalf} ${guttersPx.large};
  border-radius: ${guttersPx.mediumHalf} ${guttersPx.mediumHalf} 0 0px;
  display: flex;
  gap: ${guttersPx.medium};
  justify-content: center;
`;

const shouldForwardProp = (prop: string) => prop !== 'active';

const TabsBtn = styled(Button, { shouldForwardProp })<TabsBtnProps>`
  min-width: 200px;
  border-radius: ${guttersPx.mediumHalf};
  background: transparent;
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .MuiButton-endIcon > *:nth-of-type(1) {
    ${typographyCaptionNormal}
  }
  ${({ active }) =>
    active &&
    `
  background:rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(${guttersPx.mediumHalf});
  -webkit-backdrop-filter: blur(${guttersPx.mediumHalf});
  background-clip: padding-box;
`}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const tabsdata = [
  {
    id: 1,
    title: 'Messages',
    icon: '/assets/png/square.png',
    count: 3,
    component: <>Messages</>,
  },
  {
    id: 2,
    title: 'Notes',
    icon: '/assets/png/Notes.png',
    count: 2,
    component: <>Notes</>,
  },
];
