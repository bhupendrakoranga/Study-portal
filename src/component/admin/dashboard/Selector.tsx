import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styled from '@emotion/styled';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { videoName } from '@/utils/constant/Data';
import {
  HeaderText2,
  HorzontalConnect,
  NestedItem,
  StyledConnector,
} from '../unitBuilder/UnitTable';
import { mqMax } from '@/styles/base';

// Define TypeScript types
interface DetailItem {
  id: string;
  title: string;
}

interface Item {
  id: number;
  title?: string;
  name?: string;
  children?: Item[];
  details?: { [key: string]: DetailItem[] };
}

interface NestedCardsProps {
  data: Item[];
  depth: number;
  tabname: string;
  onclick: (arg: DetailItem) => void;
}

interface SelectorProps {
  data: any[];
  setListId: (arg: string) => void;
}

// NestedCards Component
const NestedCards: React.FC<NestedCardsProps> = ({
  data,
  depth,
  tabname,
  onclick,
}) => {
  // State to track expanded nodes
  const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>(
    {},
  );

  // Toggle expansion of a node
  const toggleNode = (id: number) => {
    setExpandedNodes((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {data?.map((item: any) => (
        <div key={item.id} style={{ minWidth: '230px' }}>
          <NestedItem>
            <StyledText>
              <SpanText>{item.title}</SpanText>
              <IconButton
                onClick={() => toggleNode(item.id)}
                size="small"
                sx={{ marginRight: 1 }}
              >
                {expandedNodes[item.id] ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
              {depth !== 0 && <HorzontalConnect />}
            </StyledText>
            {expandedNodes[item.id] && item?.children?.length > 0 && (
              <StyledConnector className="connecter" isConnect={true}>
                <NestedCards
                  data={item.children}
                  depth={depth + 1}
                  tabname={tabname}
                  onclick={onclick}
                />
              </StyledConnector>
            )}
            <StyledConnector className="connecter" isConnect={true}>
              {item?.details?.[tabname]?.map((detailitem: DetailItem) => (
                <StyledText
                  key={detailitem.id}
                  onClick={() => onclick(detailitem)}
                >
                  <SpanText>{detailitem?.title}</SpanText>
                </StyledText>
              ))}
            </StyledConnector>
          </NestedItem>
        </div>
      ))}
    </Box>
  );
};

// Selector Component
const Selector: React.FC<SelectorProps> = ({ data, setListId }) => {
  const { activeTab, setActiveAdminTab } = useGlobalContext();

  const handleClick = (lists: DetailItem) => {
    setListId(lists?.id);
    setActiveAdminTab('Builder');
  };

  const transformData = (data: any[]): Item[] => {
    const mapNode = (node: {
      id: number;
      title?: string;
      name?: string;
      children?: any[];
      details?: { [key: string]: any[] };
    }): Item => {
      const newNode: Item = {
        id: node.id,
        title: node.title || node.name,
      };

      let children: Item[] = [];
      if (node.children && node.children.length > 0) {
        children = node.children.map(mapNode);
      }

      if (children.length > 0) {
        newNode.children = children;
      }

      if (node.details) {
        newNode.details = node.details;
      }

      return newNode;
    };

    return data.map((subject) => ({
      id: subject.id,
      title: subject.name,
      children: subject.data ? subject.data.map(mapNode) : [],
      curriculum: subject.curriculum,
      details: subject?.details,
    }));
  };

  return (
    <SelectorContainer>
      {transformData(data).map((cellData, cellIndex) => (
        <Box sx={{ display: 'flex' }} key={cellIndex}>
          <NestedCards
            data={[cellData]}
            depth={0}
            tabname={videoName[activeTab]}
            onclick={handleClick}
          />
        </Box>
      ))}
    </SelectorContainer>
  );
};

export default Selector;

// Styled components
const SpanText = styled.div`
  display: block;
  word-break: break-all;
  max-width: 150px;
`;

const StyledText = styled(HeaderText2)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectorContainer = styled.div`
  display: flex;
  gap: 30px;
  overflow: auto;
  ${mqMax.max} {
    gap: 20px;
  }
  & .rootcard {
    width: 272px !important;
    ${mqMax.max} {
      width: 190px !important;
    }
  }

  & .childcard {
    width: auto !important;
  }
`;
