import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { BLACK_TEXT, BUTTON_YELLOW } from '@/styles/color';
import {
  typographyBody1,
  typographyBody1Bold,
  typographyBody2,
  typographyBodyBold,
} from '@/styles/typography';
import { guttersPx } from '@/styles/variables';
import { createQueryString, handleTabChange } from '@/utils/constant';
import { Teachertopicslists, topicslists } from '@/utils/constant/Data';
import styled from '@emotion/styled';
import Link from 'next/link';
import React, { Suspense, useEffect } from 'react';
import CommonTab from '../ui/tabs/CommonTab';
import { ExpandableCard } from './TableCards';
import CustomChip from '../ui/CustomChip';
import { mqMax } from '@/styles/base';
import { useRouter, useSearchParams } from 'next/navigation';

interface Topic {
  name: string;
  progress: number;
  topicslists: {
    name: string;
    star?: number;
    actual?: number;
    total?: number;
  }[];
}

const getLists = (isTeacher: boolean): Topic[] => [
  {
    name: 'Scientific Notation',
    progress: 70,
    topicslists: isTeacher ? Teachertopicslists : topicslists,
  },
  {
    name: 'Large Numbers',
    progress: 90,
    topicslists: isTeacher ? Teachertopicslists : topicslists,
  },
];

const SideTopicContent: React.FC = () => {
  const { isTeacher, pathname } = useGlobalContext();
  const topics = getLists(isTeacher);
  const params = useSearchParams();
  const vId = params.get('video_id');
  const videoId = vId !== null ? parseInt(vId, 10) : null; // Convert vId to a number

  return (
    <CardWrapper>
      {topics.map((item, index) => (
        <ExpandableCard
          key={index}
          progress={item.progress}
          name={item.name}
          href={pathname}
          isConnect={false}
          isCheckbox={false}
          query={createQueryString('video_id', params, index)}
          isBorder
          isActive={videoId === index}
        />
      ))}
    </CardWrapper>
  );
};

const SideTopicContent2: React.FC = () => {
  const { isTeacher, pathname } = useGlobalContext();
  const params = useSearchParams();
  const topics = getLists(isTeacher);

  return (
    <CardWrapper>
      {topics.map((item, index) => (
        <ExpandableCard
          key={index}
          progress={item.progress}
          name={item.name}
          isConnect={false}
          isCheckbox={false}
          isBorder
        >
          <DetailsWrapper>
            {item.topicslists.map((topic, topicIndex) => (
              <StudentsWrapper key={topicIndex}>
                <LeftContent
                  href={{
                    pathname,
                    query: createQueryString('learn', params, topic.name),
                  }}
                >
                  {topic.name}
                </LeftContent>
                <RightContent>
                  {topic.star ? (
                    <CustomChip
                      label={topic.star}
                      iconSrc="/assets/png/Point.png"
                    />
                  ) : (
                    <NumberContainer>
                      {topic.actual} | {topic.total}
                    </NumberContainer>
                  )}
                </RightContent>
              </StudentsWrapper>
            ))}
          </DetailsWrapper>
        </ExpandableCard>
      ))}
    </CardWrapper>
  );
};

const SideTopicContent3: React.FC = () => {
  const { isTeacher, pathname } = useGlobalContext();
  const params = useSearchParams();
  const topics = getLists(isTeacher);

  return (
    <CardWrapper>
      {topics.map((item, index) => (
        <ExpandableCard
          key={index}
          progress={item.progress}
          name={item.name}
          isConnect={false}
          isCheckbox={false}
          isBorder
        >
          <DetailsWrapper>
            {item.topicslists.map((topic, topicIndex) => (
              <StudentsWrapper key={topicIndex}>
                <LeftContent
                  href={{
                    pathname,
                    query: createQueryString('test', params, topic.name),
                  }}
                >
                  {topic.name}
                </LeftContent>
                <RightContent>
                  {topic.star ? (
                    <CustomChip
                      label={topic.star}
                      iconSrc="/assets/png/Point.png"
                    />
                  ) : (
                    <NumberContainer>
                      {topic.actual} | {topic.total}
                    </NumberContainer>
                  )}
                </RightContent>
              </StudentsWrapper>
            ))}
          </DetailsWrapper>
        </ExpandableCard>
      ))}
    </CardWrapper>
  );
};

const TopicSidebarContent: React.FC = () => {
  const { activeTab, isTeacher } = useGlobalContext();
  const router = useRouter();
  const handleChange = handleTabChange(router, ['learn', 'test', 'video_id']);

  useEffect(() => {
    if (activeTab !== 1) {
      handleChange();
    }
  }, [activeTab, handleChange]);
  const tabs = getTabs(isTeacher);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper>
        <CommonTab data={tabs} />
      </Wrapper>
    </Suspense>
  );
};

export default TopicSidebarContent;

const Wrapper = styled.div``;
const DetailsWrapper = styled.div``;

const StudentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${BLACK_TEXT};
  margin-bottom: ${guttersPx.smallHalf};
  padding: 5px 10px 10px 5px;
`;

export const LeftContent = styled(Link)`
  ${typographyBody1Bold};
  word-break: break-word;
  max-width: 225px;
  color: ${BLACK_TEXT};
  text-decoration: none;
  &:hover {
    color: ${BUTTON_YELLOW};
  }
  ${mqMax.max} {
    ${typographyBodyBold};
  }
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  ${typographyBody1};
  gap: ${guttersPx.smallHalf};
`;

const NumberContainer = styled.p`
  ${typographyBody2};
  width: 100%;
  white-space: nowrap;
`;

export const CardWrapper = styled.div`
  .MuiCard-root {
    height: 64px !important;
    margin-bottom: 40px;
  }
  .cardheader {
    height: 35px !important;
  }
  ${mqMax.max} {
    .MuiCard-root {
      height: 54px !important;
      margin-bottom: 30px;
    }
    .cardheader {
      height: 28px !important;
    }
    .connecter {
      margin-top: -10px !important;
    }
  }

  .MuiCardContent-root {
    padding-top: 10px !important;
  }
  .connecter {
    margin-bottom: 28px !important;
    margin-top: -20px;
  }
  .MuiCardContent-root:last-child {
    padding-bottom: 10px !important;
  }
`;

export const getActiveSrc = (isActive: boolean) =>
  isActive ? '/assets/png/play2.png' : '/assets/png/play3.png';

interface Tab {
  id: number;
  label?: string;
  src?: any;
  content: JSX.Element;
}

export const getTabs = (isTeacher: boolean = false): Tab[] => {
  return [
    {
      id: 1,
      src: getActiveSrc,
      content: isTeacher ? <SideTopicContent2 /> : <SideTopicContent />,
    },
    {
      id: 2,
      label: 'LEARN',
      content: <SideTopicContent2 />,
    },
    {
      id: 3,
      label: 'TEST',
      content: <SideTopicContent3 />,
    },
  ];
};
