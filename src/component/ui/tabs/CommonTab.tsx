// components/TabComponent.tsx

import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { mqMax } from '@/styles/base';
import {
  DARK_BLUE,
  BACKGROUND_YELLOW,
  WHITE,
  NEUTRALS_GREY8,
  GREY,
} from '@/styles/color';
import {
  typographyBody2Semibold,
  typographyH6SemiBold,
} from '@/styles/typography';
import { guttersPx } from '@/styles/variables';
import styled from '@emotion/styled';
import Image from 'next/image';
import Button from '../buttons/Button';

interface Tab {
  id: number;
  label?: string;
  content: React.ReactNode;
  src?: any;
}

interface TabProps {
  data: Tab[];
}
const TabContainer = styled.div`
  display: flex;
  justify-content: ${({ datalength }: { datalength: number }) =>
    datalength === 3 ? 'space-between' : 'center'};
  gap: 10px;
  ${mqMax.max} {
    gap: 5px;
  }
`;

interface TabButtonProps {
  active: boolean;
  icon: boolean;
}
const shouldForwardProp = (prop: string) => !['active', 'icon'].includes(prop);

export const TabButton = styled(Button, { shouldForwardProp })<TabButtonProps>`
  padding: ${guttersPx.mediumHalf} ${guttersPx.medium};
  border: none;
  background: ${(props) => (props.active ? DARK_BLUE : 'transparent')};
  color: ${(props) => (props.active ? WHITE : NEUTRALS_GREY8)};
  cursor: pointer;
  border: 1px solid ${(props) => (!props.active ? GREY : 'transparent')};
  min-width: auto;
  min-height: auto;
  width: ${(props) => (props.icon ? '122px' : 'auto')};
  ${typographyH6SemiBold};
  ${mqMax.max} {
    ${typographyBody2Semibold};
    padding: 5px 10px !important;
  }
  &:hover {
    background: ${(props) =>
      props.active ? BACKGROUND_YELLOW : 'transparent'};
  }
  &:focus {
    outline: none;
  }
`;

const TabContent = styled.div`
  padding: ${guttersPx.medium} 0;
  .MuiCardContent-root:last-child {
    padding-bottom: ${guttersPx.small};
  }
`;

const CommonTab: React.FC<TabProps> = ({ data }) => {
  const { activeTab, setActiveTab } = useGlobalContext();
  return (
    <div>
      <TabContainer datalength={data?.length}>
        {data?.map((tab) => (
          <TabBtn
            key={tab.id}
            label={tab?.label}
            active={activeTab === tab.id}
            icon={!!tab.label}
            onclick={() => setActiveTab(tab.id)}
            src={tab?.src && tab.src(activeTab === tab.id)}
          />
        ))}
      </TabContainer>
      <TabContent>
        {data.find((tab) => tab.id === activeTab)?.content}
      </TabContent>
    </div>
  );
};

export default CommonTab;

export const TabBtn = ({
  label,
  active = false,
  icon,
  onclick,
  src,
}: {
  label?: string;
  active?: boolean;
  icon: boolean;
  onclick?: () => void;
  src?: string;
}) => {
  const handleClick = () => {
    if (!onclick) {
      return;
    }
    onclick();
  };
  return (
    <TabButton id={label} active={active} icon={icon} onClick={handleClick}>
      {label && <span>{label}</span>}
      {src && <Image src={src} width={24} height={24} alt="img" />}
    </TabButton>
  );
};
