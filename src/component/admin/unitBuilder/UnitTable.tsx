'use client';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { Add, Remove } from '@mui/icons-material';
import {
  Box,
  css,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { WHITE, GREY } from '@/styles/color';
import { mqMax } from '@/styles/base';
import { typographyBody2Bold, typographyBodyBold } from '@/styles/typography';
import { Connector } from '../../common/TableCards';
import { AddSubjects, ScientificNotationModal } from '../modals/SubjectsModal';
import {
  addUnitBuilderList,
  deleteUnitBuilderKeyById,
  getUnitBuilderData,
} from '@/lib/api/api';
import { DataItem } from '@/types/global';
import TableHeader from './TableHeader';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import AddForm from '../modals/AddForm';
import * as Yup from 'yup';
import {
  findTopLevelParentId,
  useQueryParamWithRedirect,
} from '@/utils/constant';

interface DataItems {
  id: number;
  parent_id: number | null;
  name: string;
  level: string;
  [key: string]: any;
}

interface OutputItem {
  id: number;
  title: string;
  children: OutputItem[];
  curriculum: string;
}

const UnitTable: React.FC = () => {
  const grade_subject_id = useQueryParamWithRedirect('grade_subject_id', '/');
  const { setLoading } = useGlobalContext();
  const { mutateAsync: unitMutation, isPending } = useCustomMutation(
    getUnitBuilderData,
    ['builder'],
  );
  const { mutateAsync } = useCustomMutation(deleteUnitBuilderKeyById, [
    'builder',
  ]);

  const { mutateAsync: addlists } = useCustomMutation(addUnitBuilderList, [
    'unit-builder',
  ]);

  const [sections, setSections] = useState<DataItem[]>([]);

  function organizeData(arr: DataItems[]): OutputItem[] {
    const map: { [key: number]: OutputItem } = {};
    arr.forEach(item => {
      map[item.id] = {
        id: item.id,
        title: item.name,
        children: [],
        curriculum: item.level,
      };
    });
    const resultData: OutputItem[] = [];
    arr.forEach(item => {
      if (item.parent_id === null) {
        resultData.push(map[item.id]);
      } else {
        if (map[item.parent_id]) {
          map[item.parent_id].children.push(map[item.id]);
        }
      }
    });
    return resultData;
  }
  
  const fetchData = async () => {
    try {
      const result = await unitMutation(grade_subject_id);
      if (result) {
        const transformedData = organizeData(result);
        setSections(transformedData);
      }
    } catch (error) {
      setSections([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [grade_subject_id]);

  useEffect(() => {
    setLoading(isPending);
  }, [isPending]);

  const removeItem = async (id: any) => {
    try {
      await mutateAsync({ id });
      await fetchData();
      toast.success('Successfully deleted');
    } catch (error: any) {
      toast.error(error?.response?.data?.detail);
    }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [listId, setListId] = useState(null);
  const handleOpen = (id: any) => {
    setListId(id);
    setShow(true);
  };

  const handleAddList = async (name: { name: string }) => {
    if (!listId) {
      return toast.error("Something went's wrong");
    }
    try {
      return await addlists({ grade_subject_id: grade_subject_id, name: name?.name, parent_id: listId });
    } catch (err: any) {
      return err?.response?.error;
    }
  };

  const removeItemLists = async (id: number | string) => {
    if (!id) {
      return toast.error('Id not found');
    }
    const newSections: any = [...sections];
    const pid = findTopLevelParentId(newSections, id);

    const removeRecursive = (items: any) => {
      return items.filter((item: { id: number; children: any }) => {
        if (item.id === id) return false;
        item.children = removeRecursive(item.children);
        return true;
      });
    };
    setSections(removeRecursive(newSections));
    const filterlists = removeRecursive(newSections)?.find(
      (item: { id: number | null }) => item.id === pid,
    );
    try {
      const response = await addlists({ id: pid, data: filterlists?.children });
      if (response) {
        toast.success('Data removed successfully');
      }
    } catch (err: any) {
      return err;
    }
  };

  const NestedCards: React.FC<{ data: DataItem[]; depth: number }> = ({
    data,
    depth,
  }) => {
    const [isOpenTopic, setIsOpenTopic] = useState<boolean>(false);
    const [databyid, setDatabyid] = useState<any>(null);

    const onClose = () => setIsOpenTopic(false);

    const onOpen = (listTitle: string, id: number | string) => {
      const newSections: any = [...sections];
      const pid = findTopLevelParentId(newSections, id);
      const filterlists = newSections?.find(
        (item: { id: number | null }) => item.id === pid,
      );
      const isLastChildInParent = (
        items: DataItem[],
        currentId: number | string,
      ): boolean => {
        const index = items.findIndex((item) => item.id === currentId);
        return index === items.length - 1;
      };
      const checkLastChildRecursive = (
        items: DataItem[],
        currentId: number | string,
      ): boolean => {
        for (const item of items) {
          if (item.id === currentId) {
            return (
              item.children.length === 0 &&
              isLastChildInParent(items, currentId)
            );
          }
          if (item.children.length > 0) {
            const found = checkLastChildRecursive(item.children, currentId);
            if (found) return found;
          }
        }
        return false;
      };
      const isLast = checkLastChildRecursive(sections, id);
      if (!isLast) {
        return;
      }
      setDatabyid({
        title: listTitle,
        data: newSections,
        filterlists: filterlists,
        id: id,
        pid: pid,
      });
      setIsOpenTopic(true);
    };

    return (
      <Box sx={{ position: 'relative' }}>
        {data?.map((item) => (
          <NestedItem key={item.id}>
            <HeaderText2>
              <span
                style={{ cursor: 'pointer' }}
                onDoubleClick={() => onOpen(item.title, item.id)}
              >
                {item.title}
              </span>
              <PlusIcon onClick={() => handleOpen(item.id)}>
                <Add />
              </PlusIcon>
              <MinusIcon onClick={() => removeItemLists(item.id)}>
                <Remove />
              </MinusIcon>
              {depth !== 0 && <HorzontalConnect />}
            </HeaderText2>
            {item?.children?.length > 0 && (
              <StyledConnector className="connecter" isConnect={true}>
                <NestedCards data={item.children} depth={depth + 1} />
              </StyledConnector>
            )}
          </NestedItem>
        ))}
        <ScientificNotationModal
          onClose={onClose}
          isOpen={isOpenTopic}
          data={databyid}
          refetch={fetchData}
        />
      </Box>
    );
  };

  const fields = [
    {
      id: 'name',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter name',
      type: 'input',
    },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });
 
  return (
    <UnitTableContainer>
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              {sections?.map((section) => (
                <TableHeader
                  key={section.id}
                  name={section.title}
                  isAdmin={true}
                  onAdd={() => handleOpen(section.id)}
                  onRemove={() => removeItem(section.id)}
                  progress={undefined}
                />
              ))}
            </TableRow>
          </StyledTableHead>
          <StyledTableBody>
            <TableRow sx={{ marginTop: '20px' }}>
              {sections.map((section) => (
                <ColumnCell key={section.id}>
                  <NestedCards data={section.children} depth={0} />
                </ColumnCell>
              ))}
            </TableRow>
          </StyledTableBody>
        </Table>
      </StyledTableContainer>
      <AddSubjects refetch={fetchData} />
      <AddForm
        show={show}
        onClose={handleClose}
        onAdd={handleAddList}
        fields={fields}
        validationSchema={validationSchema}
      />
    </UnitTableContainer>
  );
};

export default UnitTable;

const UnitTableContainer = styled.div`
  .MuiTableContainer-root {
    margin-top: 0px !important;
  }
`;

// Styled components
const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
  min-height: calc(100vh - 65px);
  position: relative;
  width: 100%;
`;

const ColumnCell = styled(TableCell)`
  vertical-align: top;
  border: none;
  width: 274px;
`;

const StyledTableHead = styled(TableHead)`
  height: 124px;
  ${mqMax.max} {
    height: 101px;
  }
`;

const StyledTableBody = styled(TableBody)`
  &::before {
    content: '-';
    display: block;
    line-height: 1em;
    color: transparent;
  }
  padding-top: 20px;
`;

export const HeaderText2 = styled.div`
  margin-bottom: 30px;
  background: ${WHITE};
  box-shadow: 0px 0px 5px 0px ${WHITE};
  padding: 32px 24px 32px 24px;
  border-radius: 16px;
  position: relative;
  ${typographyBody2Bold};
  width: 100%;
  ${mqMax.max} {
    ${typographyBodyBold};
    padding: 24px 28px 24px 28px;
  }
`;

const PlusIcon = styled.span`
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
  top: -24px;
  right: 0;
`;

const MinusIcon = styled.span`
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
  left: 0;
  bottom: -24px;
`;

export const NestedItem = styled.div`
  margin-left: 5px;
  margin-top: 10px;
`;

export const StyledConnector = styled(Connector)<{ isConnect: boolean }>`
  ${({ isConnect }) => isConnect && connectorStyles};
  top: -10px;
`;

const connectorStyles = css`
  &::before {
    height: calc(100% - 22px);
    ${mqMax.max} {
      height: calc(100% - 13px);
    }
  }
`;

export const HorzontalConnect = styled.div`
  border: 1px solid ${GREY};
  width: 13px;
  height: 0px;
  position: absolute;
  left: -13px;
  top: 50%;
  transform: translate(0, -50%);
`;
