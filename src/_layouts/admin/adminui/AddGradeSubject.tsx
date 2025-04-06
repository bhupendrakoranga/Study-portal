'use client';
import RootBuilder from '@/component/admin/dashboard/builder/RootBuilder';
import Selector from '@/component/admin/dashboard/Selector';
import DrawerForm from '@/component/admin/DrawerForm';
import AddForm from '@/component/admin/modals/AddForm';
import { TabButton } from '@/component/ui/tabs/CommonTab';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import {
  addcurriculumList,
  getcurriculumList,
  getUnitBuilderData,
} from '@/lib/api/api';
import { guttersPx } from '@/styles/variables';
import { generateLabel } from '@/utils/constant';
import { validationSchema } from '@/utils/form/ValidationSchema';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const admintabs = ['Selector', 'Builder'];

const AdminUI = () => {
  const [show, setShow] = useState(false);
  const onModalOpen = () => setShow(true);
  const onModalClose = () => setShow(false);
  const { data, isLoading } = useQuery({
    queryKey: ['curriculumlist'],
    queryFn: getcurriculumList,
  });

  const { mutateAsync } = useCustomMutation(addcurriculumList, ['curriculum']);

  const filterData = data?.map(
    (item: { name: string; subject: string; grade: number | string }) => ({
      label: generateLabel(item),
      value: item.subject,
    }),
  );

  const fields = [
    {
      id: 'name',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter name',
      type: 'input',
    }
  ];

  return (
    <AdmintabsContainer>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <DrawerForm
          title="Curriculam Builder"
          listOption={filterData}
          onOpenModal={onModalOpen}
          link="/admin/unitbuilder"
          isTitle
        />
      )}
      <AddForm
        show={show}
        onClose={onModalClose}
        onAdd={mutateAsync}
        fields={fields}
        validationSchema={validationSchema}
      />
    </AdmintabsContainer>
  );
};

export default AdminUI;
export const options = [
  { value: 'mathica', label: 'Mathica' },
  { value: 'newton', label: 'Newton' },
];
const AdmintabsContainer = styled.div`
  padding: 30px;
`;

const TabWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: ${guttersPx.mediumHalf};
`;

const StyledBtn = styled(TabButton)`
  min-width: 160px;
  min-height: 56px;
`;

const ContentContainer = styled.div`
  margin: 28px auto;
`;

export const BuilderAndSelector = () => {
  const [listId, setListId] = useState('');
  const { mutateAsync: unitMutation, isPending } = useCustomMutation(
    getUnitBuilderData,
    ['builder'],
  );
  const qname = useSearchParams()?.get('title');
  const { setActiveAdminTab, activeadminTab, setLoading } = useGlobalContext();
  const handleTabs = (title: string) => {
    if (title === 'Selector') {
      setActiveAdminTab(title);
    }
  };

  const [state, setState] = useState([]);
  const fetchData = async () => {
    if (!qname) {
      return;
    }
    try {
      const result = await unitMutation(qname);
      if (result) {
        setState(result);
      }
    } catch (error) {
      setState([]);
    }
  };
  useEffect(() => {
    setActiveAdminTab('Selector');
  }, []);
  useEffect(() => {
    fetchData();
  }, [qname]);
  useEffect(() => {
    setLoading(isPending);
  }, [isPending]);
  return (
    <AdmintabsContainer>
      <TabWrapper>
        {admintabs?.map((item) => (
          <StyledBtn
            onClick={() => handleTabs(item)}
            key={item}
            active={activeadminTab === item}
            icon={false}
          >
            {item}
          </StyledBtn>
        ))}
      </TabWrapper>
      <ContentContainer>
        {activeadminTab === 'Builder' && <RootBuilder id={listId} />}
        {activeadminTab === 'Selector' && (
          <Selector data={state} setListId={setListId} />
        )}
      </ContentContainer>
    </AdmintabsContainer>
  );
};
