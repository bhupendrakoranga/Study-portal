'use client';
import DrawerForm, { DrawerContent } from '@/component/admin/DrawerForm';
import React, { useEffect, useState } from 'react';
import BottomDrawer from '@/component/ui/drawer/BottomDrawer';
import { Column, Header } from '@/component/admin/ListSection';
import SelectBox from '@/component/ui/inputs/SelectBox';
import { LIGHT_STEEL_BLUE } from '@/styles/color';
import styled from '@emotion/styled';
import { Container, MainContent } from './AddStudentTeacher';
import { useFormik } from 'formik';
import AddForm from '@/component/admin/modals/AddForm';
import * as Yup from 'yup';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import {
  addclassList,
  getclassList,
  toGetClassStudentList,
  toGetClassTeacherList,
  toGetCurriculumListSchoolWise,
  getcurriculumWithSubjectList,
  toGetStudentListSchoolWise,
  toGetTeacherListSchoolWise,
  addClassStudent,
  addClassTeacher,
} from '@/lib/api/api';
import { Option } from '@/component/ui/inputs/SearchFieldWithDropdown';
import { useSearchParams } from 'next/navigation';

interface Item {
  name: string;
  section: string;
  teachers: any;
  [key: string]: any;
}

const ClassCreater: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [ismodalopen, setIsmodalopen] = useState(false);
  const [data, setData] = useState([]);
  const onOpenModal = () => setIsmodalopen(true);
  const onCloseModal = () => setIsmodalopen(false);

  const onOpen = () => setIsShow(true);
  const onClose = () => setIsShow(false);

  const [classState, setClassState] = useState<any>({
    students: [],
    teachers: [],
  });

  const [schoolState, setSchoolState] = useState<any>({
    students: [],
    teachers: [],
  });
  const { values, handleChange } = useFormik({
    initialValues: {
      students: [classState?.students] || [''],
      teachers: [classState?.teachers] || [''],
    },
    enableReinitialize: true,
    onSubmit: (formvalues) => {
      console.warn(formvalues);
    },
  });
  const school_id: any = useSearchParams()?.get('school_id');

  async function toGetClassListSchool() {
    const classData = await getclassList(school_id);
    setData(classData);
  }

  const { mutateAsync: addclassListMutation } = useCustomMutation(
    addclassList,
    ['classlist'],
  );

  const { mutateAsync: getClassStudentListMutation } = useCustomMutation(
    toGetClassStudentList,
    ['getClassStudentList'],
  );

  const { mutateAsync: getClassTeacherListMutation } = useCustomMutation(
    toGetClassTeacherList,
    ['getClassTeacherList'],
  );

  const { mutateAsync: getCurriculumListMutation } = useCustomMutation(
    toGetCurriculumListSchoolWise,
    ['getCurriculumList'],
  );

  const { mutateAsync: getcurriculumWithSubjectMutation } = useCustomMutation(
    getcurriculumWithSubjectList,
    ['getcurriculumWithSubject'],
  );

  const { mutateAsync: getStudentList } =
    useCustomMutation(toGetStudentListSchoolWise, ['studentlist']);

  const { mutateAsync: getTeacherList } =
    useCustomMutation(toGetTeacherListSchoolWise, ['teacherlist']);

  const { mutateAsync: addclassStudentMutation } = useCustomMutation(
    addClassStudent,
    ['classlist'],
  );

  const { mutateAsync: addclassTeacherMutation } = useCustomMutation(
    addClassTeacher,
    ['classlist'],
  );

  const filterData: Option[] =
    data?.map(({ name, id }: Item) => ({
      label: `${name}`,
      value: id,
    })) ?? [];

  const [selectedOption, setSelectedOption] = useState<Option>(filterData[0]);
  const [gradeSubjectList, setGradeSubjectList] = useState([]);

  useEffect(() => {
    setSelectedOption(filterData[0] || null);
  }, [filterData?.length]);

  const classWiseStudentTeacherRecord = async () => {
    let class_id: any = selectedOption?.value;
    const studentData = await getClassStudentListMutation(class_id);
    const teacherData = await getClassTeacherListMutation(class_id);
    if (studentData || teacherData) {
      setClassState({
        ...classState,
        students: studentData?.length ? studentData : [studentData],
        teachers: teacherData?.length ? teacherData : [teacherData],
      });
    }
  };

  const schoolWiseStudentTeacherRecord = async () => {
    const studentData = await getStudentList(school_id);
    const teacherData = await getTeacherList(school_id);
    if (studentData || teacherData) {
      setSchoolState({
        ...schoolState,
        students: generateValue(studentData),
        teachers: generateValue(teacherData),
      });
    }
  };

  const getCurriculumSchoolWiseList = async () => {
    const curriculumData = await getCurriculumListMutation(school_id);
    const payload = { curriculumID: curriculumData[0].curriculum_id };
    const getCurriculumGradeSubject =
      await getcurriculumWithSubjectMutation(payload);
    const filterGradeSubjectCurriculumData = getCurriculumGradeSubject?.map(
      (item: { subject_name: string; id: string; grade: string }) => ({
        label: item?.subject_name + ', ' + item?.grade,
        value: item.id,
      }),
    );
    setGradeSubjectList(filterGradeSubjectCurriculumData);
  };

  useEffect(() => {
    toGetClassListSchool();
    schoolWiseStudentTeacherRecord();
    classWiseStudentTeacherRecord();
    getCurriculumSchoolWiseList();
  }, [selectedOption]);

  const onClassAdd = async (inputdata: any) => {
    const bindData = {
      ...inputdata,
      school_id: school_id,
    };
    return addclassListMutation(bindData);
  };

  const classStudentDataItem = classState?.students.map((classItems: any) => {
    if (classItems?.message) {
      return '<p style="padding: 6px;">'+classItems?.message+'</p>';
    } else {
      return '<p style="padding: 6px;">'+classItems?.first_name + ' ' + classItems?.last_name+'</p>';
    }
  }).join('');

  const classTeacherDataItem = classState?.teachers.map((classItems: any) => {
    const content = classItems?.message ? classItems?.message : classItems?.first_name + ' ' + classItems?.last_name;
    return `<p style="padding: 6px;">${content}</p>`;
  }).join('');

  const addClassStudentSchool = () => {
    let class_id = selectedOption?.value;
    const filteredStudentValues= values?.students.filter((_, index) => index !== 0); 
    const classStudentPaylad = {
      class_id: class_id,
      student_ids: filteredStudentValues,
    };
    addclassStudentMutation(classStudentPaylad);
    classWiseStudentTeacherRecord();
  };

  const addClassTeacherSchool = () => {
    let class_id = selectedOption?.value;
    const filteredTeacherValues=  Array.isArray(values?.teachers) ? values?.teachers.filter((_, index) => index !== 0) : [values?.teachers]; 
    const classStudentPaylad = {
      class_id: class_id,
      teacher_ids: filteredTeacherValues,
    };
    addclassTeacherMutation(classStudentPaylad);
    classWiseStudentTeacherRecord();
  };

  useEffect(() => {
    addClassStudentSchool();
  }, [selectedOption?.value, values?.students]);

  useEffect(() => {
    addClassTeacherSchool();
  }, [selectedOption?.value, values?.teachers]);

  const fields = getFieldsValue(
    classState?.teachers,
    gradeSubjectList,
  );
  
  return (
    <ClassContainer>
      <Container>
        <StyledMainContent>
          <StyledColumn>
            <Header>Student</Header>
            {schoolState?.students?.length > 0 && (
              <SelectBox
                id={`student-class`}
                name="students"
                options={schoolState?.students}
                value={values?.students}
                onChange={handleChange}
                multiple
              />
            )}
            <div style={{ padding: '10px' }} dangerouslySetInnerHTML={{ __html: classStudentDataItem.replace(/,/g, '') }} />
          </StyledColumn>
          <StyledColumn>
            <Header>Teacher</Header>
            {schoolState?.teachers?.length > 0 && (
              <SelectBox
                id={`student-class`}
                name="teachers"
                options={schoolState?.teachers}
                value={values?.teachers}
                onChange={handleChange}
              />
            )}
            <div style={{ padding: '10px' }} dangerouslySetInnerHTML={{ __html: classTeacherDataItem.replace(/,/g, '') }} / >
          </StyledColumn>
        </StyledMainContent>
      </Container>
      <BottomDrawer
        isRight
        show={isShow}
        onOpen={onOpen}
        title={selectedOption?.label ?? ''}
      >
        <DrawerContent
          pageType="class"
          onClose={onClose}
          onOpenModal={onOpenModal}
          title="Class Creater"
          listOption={filterData}
          link="/admin/unitbuilder"
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </BottomDrawer>
      <DrawerForm isExpand={false} />
      <AddForm
        show={ismodalopen}
        onClose={onCloseModal}
        onAdd={onClassAdd}
        fields={fields}
        validationSchema={validationSchema}
      />
    </ClassContainer>
  );
};

export default ClassCreater;

const getFieldsValue = (
  teacherOptions: { label: string; value: string }[],
  gradeSubjectList: any,
) => {
  return [
    {
      id: 'grade_subject_id',
      name: 'grade_subject_id',
      label: 'Grade Subject',
      placeholder: 'Enter grade subject',
      type: 'select_search',
      options: gradeSubjectList,
      defaultValue: '22800a67-d504-4388-bf72-1fbbce0ce97b',
    },
    {
      id: 'name',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter name',
      type: 'input',
    },
  ];
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  grade_subject_id: Yup.string().required('Grade subject is required'),
});
export const ClassContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  z-index: 1000;
`;

export const StyledMainContent = styled(MainContent)`
  min-height: 300px;
  border: 1px solid ${LIGHT_STEEL_BLUE};
`;

export const StyledColumn = styled(Column)`
  & .relative > div {
    border-radius: 0px;
  }
`;

type Person = {
  first_name: string;
  last_name: string;
  id: string;
};

export const generateLabelForList = (data: Person[]) => {
  return data?.map(({ first_name, last_name, id }) => ({
    label: `${first_name} ${last_name}`,
    value: id,
  }));
};

export const generateValue = (data: any[]) => {
  return data?.map(
    (item: { [x: string]: any; first_name: any; last_name: any; id: any }) => ({
      label: `${item.first_name} ${item.last_name}`,
      value: item?.id,
    }),
  );
};
