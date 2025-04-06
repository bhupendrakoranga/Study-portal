'use client';
import DrawerForm from '@/component/admin/DrawerForm';
import AddForm from '@/component/admin/modals/AddForm';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { addSchool, addCurriculumSchool, getcurriculumList, getSchoollists } from '@/lib/api/api';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { generateLabel } from '@/utils/constant';

const fields = [
  {
    id: 'name',
    name: 'name',
    label: 'School Name',
    placeholder: 'Enter school name',
    type: 'input',
  },
  {
    id: 'address',
    name: 'address',
    label: 'Address',
    placeholder: 'Enter school address',
    type: 'input',
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('School name is required'),
  address: Yup.string().required('School address is required'),
});

const SchoolDataSetter = () => {

  const [show, setShow] = useState({assignCurriculum:false, other:false});
  const onModalOpen = (modalType: any) => {
    setShow(prev => ({ ...prev, [modalType]: true }));
  };
  const onModalClose = (modalType: any) => {
    setShow(prev => ({ ...prev, [modalType]: false }));
  };

  const { mutateAsync } = useCustomMutation(show?.assignCurriculum ? addCurriculumSchool : addSchool, ['school']);
  const { data } = useQuery({
    queryKey: ['schools'],
    queryFn: getSchoollists,
  });

  const { data: curriculumData, refetch } = useQuery({
    queryKey: ['curriculumlist'],
    queryFn: getcurriculumList,
  });

  const filterSchoolData = data?.map(
    (item: { name: string; id: string;  }) => ({
      label: generateLabel(item),
      value: item.id,
    }),
  );

  const filterCurriculumData = curriculumData?.map(
    (item: { name: string; id: string;  }) => ({
      label: generateLabel(item),
      value: item.id,
    }),
  );

  const fields2 = [
    {
      id: 'school_id',
      name: 'school_id',
      label: 'School',
      placeholder: 'Select School',
      type: 'select',
      options: filterSchoolData,
      defaultValue: '45737f5b-fe8f-43aa-b4bc-15801eb8a7e4',
    },
    {
      id: 'curriculum_id',
      name: 'curriculum_id',
      label: 'Curriculum',
      placeholder: 'Select Curriculum',
      type: 'select_search',
      options: filterCurriculumData,
      defaultValue: '45737f5b-fe8f-43aa-b4bc-15801eb8a7e4',
    },
  ];
  
  const validationSchema1 = Yup.object().shape({
    school_id: Yup.string().required('Please select at least one school'),
    curriculum_id: Yup.string().required('Please select at least one curriculum'),
  });

  const handleForm = useMemo(()=>{
      if(show?.assignCurriculum){
        return  <AddForm
                  show={show?.assignCurriculum}
                  onClose={()=>onModalClose('assignCurriculum')}
                  onAdd={mutateAsync}
                  refetch = {refetch}
                  fields={fields2}
                  validationSchema={validationSchema1}
                />
      }

      return  <AddForm
                show={show?.other}
                onClose={()=>onModalClose('other')}
                onAdd={mutateAsync}
                refetch = {refetch}
                fields={fields}
                validationSchema={validationSchema}
              />
    },[show]);
  
 
  const listOption = data?.map(
    (item: { name: string; id: string | number }) => ({
      label: item?.name,
      value: item.id,
    }),
  );
  
  return (
    <>
      <DrawerForm
        pageType = "school"
        title="School Data Setter"
        listOption={listOption}
        onOpenModal={onModalOpen}
        link="/admin/add-student-teacher"
      />
      {handleForm}
    </>
  );
};

export default SchoolDataSetter;
