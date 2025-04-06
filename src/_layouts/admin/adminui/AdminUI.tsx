'use client';
import RootBuilder from '@/component/admin/dashboard/builder/RootBuilder';
import Selector from '@/component/admin/dashboard/Selector';
import DrawerForm from '@/component/admin/DrawerForm';
import AddForm from '@/component/admin/modals/AddForm';
import { TabButton } from '@/component/ui/tabs/CommonTab';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import {
  addcurriculumSubjectList,
  addcurriculumList,
  getcurriculumList,
  getUnitBuilderData,
  getcurriculumWithSubjectList,
} from '@/lib/api/api';
import { guttersPx } from '@/styles/variables';
import { generateLabel, reGenerateLabel } from '@/utils/constant';
import { validationSchema, validationSchema1 } from '@/utils/form/ValidationSchema';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

const admintabs = ['Selector', 'Builder'];

interface DataItem {
  curriculum_id: string;
  curriculum_name: string;
  subject_name: string;
  grade: string;
  grade_id: string;
}

interface FinalDataItem {
  label: string;
  value: string;
}

const AdminUI = () => {
  const [show, setShow] = useState({curriculum:false, other:false});
  const [dataWithSubjects, setDataWithSubjects] = useState<any>([]);

  const onModalOpen = (modalType: any) => {
    setShow(prev => ({ ...prev, [modalType]: true }));
  };

  const onModalClose = (modalType: any) => {
    setShow(prev => ({ ...prev, [modalType]: false }));
  };
  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['curriculumlist'],
    queryFn: getcurriculumList,
  });

  const { mutateAsync } = useCustomMutation(show?.curriculum ? addcurriculumList : addcurriculumSubjectList, ['curriculum']);
  
  const filterData = data?.map(
    (item: { name: string; id: string;  }) => ({
      label: generateLabel(item),
      value: item.id,
    }),
  );

   useEffect(() => {
    const fetchData = async () => {
      if (!Array.isArray(data)) {
        console.error('data is not an array:', data);
        return;
      }
      const resultArr: ((prevState: never[]) => never[]) | { curriculum_id: any; curriculum_name: any; subject_name: any; grade: any; grade_id: any; }[] = [];
      for (const item of data) {
        const payload = { curriculumID: item.id };
        const final_data = await getcurriculumWithSubjectList(payload);
        if (final_data?.length > 0) {
          final_data.forEach((gradeItem:any) => {
            resultArr.push({
              curriculum_id: item?.id,
              curriculum_name: item?.name,
              subject_name: gradeItem?.subject_name,
              grade: gradeItem?.grade,
              grade_id: gradeItem?.id,
            });
          });
        }
      }
      setDataWithSubjects(resultArr);
    };

    fetchData();
  }, [data,refetch]);

  const finaldataWithSubject: FinalDataItem[] = dataWithSubjects.map(
    (item: { curriculum_id: string, curriculum_name: string, grade: string, grade_id: string, subject_name: string }) => ({
      label: reGenerateLabel(item),
      value: item?.grade_id,
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

  const fields2 = [
    {
      id: 'curriculum_id',
      name: 'curriculum_id',
      label: 'Name',
      placeholder: 'Enter name',
      type: 'select_search',
      options: filterData,
      defaultValue: '45737f5b-fe8f-43aa-b4bc-15801eb8a7e4',
    },
    {
      id: 'grade',
      name: 'grade',
      label: 'Grade',
      placeholder: 'Enter grade',
      type: 'input',
    },
    {
      id: 'subject_name',
      name: 'subject_name',
      label: 'Tutor',
      placeholder: 'Enter subject',
      type: 'select',
      options: options,
      defaultValue: 'mathica',
    },
  ];


  const handleForm = useMemo(()=>{
   if(show?.curriculum){
    return  <AddForm
              show={show?.curriculum}
              onClose={()=>onModalClose('curriculum')}
              onAdd={mutateAsync}
              refetch = {refetch}
              fields={fields}
              validationSchema={validationSchema}
            />
   }
   return  <AddForm
            show={show?.other}
            onClose={()=>onModalClose('other')}
            onAdd={mutateAsync}
            refetch = {refetch}
            fields={fields2}
            validationSchema={validationSchema1}
          />
  },[show])


  return (
    <AdmintabsContainer>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <DrawerForm
          pageType = "curriculam"
          title={"Curriculam Builder"}
          listOption={finaldataWithSubject}
          onOpenModal={onModalOpen}
          link="/admin/unitbuilder"
          isTitle
        />
      )}
      {handleForm}
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
