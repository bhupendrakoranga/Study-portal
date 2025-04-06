import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { AdminRoutes } from '@/utils/constant/Data';
import styled from '@emotion/styled';
import CommonLink from '@/component/ui/CommonLink';
import {
  CardWrapper,
  getActiveSrc,
  LeftContent,
  RightContent,
} from '@/component/common/TopicSidebarContent';
import { ExpandableCard } from '@/component/common/TableCards';
import CommonTab from '@/component/ui/tabs/CommonTab';
import { BLACK_TEXT } from '@/styles/color';
import { guttersPx } from '@/styles/variables';
import { usePathname, useSearchParams } from 'next/navigation';

const topics2 = [
  {
    name: 'Admin',
    topicslists: AdminRoutes,
  },
];

const topics = [
  {
    name: 'Unit Builder',
    route: '/admin/unitbuilder',
  },
  {
    name: 'Curriculum Builder',
    route: '/admin/curriculumbuilder',
  },
];

const SideTopicContent: React.FC = () => {
  const { pathname } = useGlobalContext();
  return (
    <CardWrapper>
      {topics.map((item: { name: string; route: string }, index: number) => {
        return (
          <CommonLink href={item.route} key={index}>
            <ExpandableCard
              key={index}
              name={item.name}
              href={pathname}
              isConnect={false}
              isCheckbox={false}
              isBorder
              isActive={pathname === item.route} // Assuming 'activeTab' is the parameter name
              isVideoicon={false}
            />
          </CommonLink>
        );
      })}
    </CardWrapper>
  );
};

const SideTopicContent2: React.FC = () => {
  const { pathname } = useGlobalContext();
  const params = useSearchParams();
  const query = params.get('school');
  return (
    <CardWrapper>
      {topics2.map((item, index) => (
        <ExpandableCard
          key={index}
          name={item.name}
          isConnect={false}
          isCheckbox={false}
          isBorder
        >
          <DetailsWrapper>
            {item.topicslists.map((topic, topicIndex) => (
              <TextWrapper key={topicIndex}>
                <StyledLink
                  href={`${topic.route}${query ? `?school=${query}` : ''}`}
                  isactive={topic.route === pathname}
                >
                  {topic.name}
                </StyledLink>
                <RightContent></RightContent>
              </TextWrapper>
            ))}
          </DetailsWrapper>
        </ExpandableCard>
      ))}
    </CardWrapper>
  );
};

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchvalue = searchParams?.get('query')?.split(',');
  const filteredTabs = tabs
    .filter((tab) =>
      tab.label
        ? searchvalue?.some(
            (label) => label.toUpperCase() === tab.label.toUpperCase(),
          )
        : searchvalue?.includes('Video') && tab.src,
    )
    .map((tab, index) => ({ ...tab, id: index + 1 }));

  const isCurriculumBuilderPath = pathname.startsWith(
    '/admin/curriculumbuilder/',
  );

  return (
    <Wrapper>
      {isCurriculumBuilderPath && <CommonTab data={filteredTabs} />}
      <SideTopicContent />
      <SideTopicContent2 />
    </Wrapper>
  );
};

export default AdminSidebar;

interface StyledLinkProps {
  isactive: boolean;
}

const shouldForwardProp = (prop: string) => prop !== 'isactive';

const StyledLink = styled(LeftContent, { shouldForwardProp })<StyledLinkProps>`
  color: ${({ isactive }) => (isactive ? 'blue' : 'inherit')};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Wrapper = styled.div``;
const DetailsWrapper = styled.div`
  margin-top: -20px;
`;

export const tabs = [
  {
    id: 1,
    src: getActiveSrc,
    content: '',
  },
  {
    id: 2,
    label: 'LEARN',
    content: '',
  },
  {
    id: 3,
    label: 'TEST',
    content: '',
  },
];

const TextWrapper = styled.div`
  color: ${BLACK_TEXT};
  // margin-bottom: ${guttersPx.smallHalf};
  padding: 5px 8px 8px 5px;
`;
