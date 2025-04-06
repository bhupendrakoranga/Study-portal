'use client';
import { useEffect, useState } from 'react';
import AddLeftContent from '@/component/admin/AddLeftContent';
import styled from '@emotion/styled';
import ListSection from '@/component/admin/ListSection';
import { NEUTRALS_GREY4, WHITE } from '@/styles/color';
import { mqMax } from '@/styles/base';
import { Item } from '@/types/global';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { addStudentSchool, addTeacherSchool, deleteUsersData, getUsers, toGetStudentListSchoolWise, toGetTeacherListSchoolWise } from '@/lib/api/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryParamWithRedirect } from '@/utils/constant';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import DrawerForm, { NextButton } from '@/component/admin/DrawerForm';
import Image from 'next/image';
import AddStudentForm from '@/component/admin/modals/AddStudentForm';
import AddTeacherForm from '@/component/admin/modals/AddTeacherForm';

export const Container = styled.div`
  display: block;
  margin: 50px auto;
  max-width: 1116px;
  ${mqMax.max} {
    max-width: 880px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${WHITE};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
`;

export const Sidebar = styled.div`
  padding: 20px;
  width: 416px;
  ${mqMax.max} {
    width: 320px;
  }
  background-color: #fff;
`;

export const MainContent = styled.div`
  display: flex;
  background: ${NEUTRALS_GREY4};
`;

type State = {
  students: Item[];
  teachers: Item[];
  studentSearch: string;
  teacherSearch: string;
};

const AddStudentTeacher: React.FC = () => {
  const title = useQueryParamWithRedirect(
    'school',
    '/admin/school-data-setter',
  );
  const { mutateAsync } = useCustomMutation(getUsers, ['builder']);
  const router = useRouter();

  const { mutateAsync: deleteuserMutation, isPending: deletePending } =
    useCustomMutation(deleteUsersData, ['curriculumlist']);

  const { mutateAsync: getStudentList } = useCustomMutation(
    toGetStudentListSchoolWise,
    ['studentlist'],
  );

  const { mutateAsync: getTeacherList } = useCustomMutation(
    toGetTeacherListSchoolWise,
    ['teacherlist'],
  );
  
  const { mutateAsync: addSchoolStudent } = useCustomMutation(
    addStudentSchool,
    ['addSchoolStudent'],
  );

  const { mutateAsync: addSchoolTeacher } = useCustomMutation(
    addTeacherSchool,
    ['addSchoolTeacher']
  );
  
  const { setLoading } = useGlobalContext();
  const school_id: any = useSearchParams()?.get('school_id');
  
  useEffect(() => {
    setLoading(deletePending);
  }, [deletePending]);

  const [state, setState] = useState<State>({
    students: [],
    teachers: [],
    studentSearch: '',
    teacherSearch: '',
  });

  const studentTeacherRecord = async ()=>{
    const studentData = await getStudentList(school_id);
    const teacherData = await getTeacherList(school_id);
    if (studentData || teacherData) {
      setState({
        ...state,
        students: generateValue(studentData),
        teachers: generateValue(teacherData),
      });
    }
  }

  const fetchData = async () => {
    try {
      const result = await mutateAsync(title);
      if (result) {
        setState({
          ...state,
          students: generateValue(result?.students),
          teachers: generateValue(result?.teachers),
        });
      }
      
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    studentTeacherRecord();
  }, [title]);
  
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'studentSearch' | 'teacherSearch',
  ) => {
    setState({
      ...state,
      [type]: event.target.value,
    });
  };
  
  const handleSelectAll = (type: 'students' | 'teachers') => {
    setState({
      ...state,
      [type]: state[type].map((item) => ({ ...item, selected: true })),
    });
  };

  const handleDeselectAll = (type: 'students' | 'teachers') => {
    setState({
      ...state,
      [type]: state[type].map((item) => ({ ...item, selected: false })),
    });
  };

  const handleToggleSelect = (name: string, type: 'students' | 'teachers') => {
    setState({
      ...state,
      [type]: state[type].map((item) =>
        item.email === name ? { ...item, selected: !item.selected } : item,
      ),
    });
  };

  const filteredStudents = state?.students.filter((student) =>
    student?.name?.toLowerCase().includes(state?.studentSearch?.toLowerCase()),
  );

  const filteredTeachers = state?.teachers.filter((teacher) =>
    teacher?.name?.toLowerCase().includes(state.teacherSearch?.toLowerCase()),
  );
  const [modalState, setModalState] = useState({ isOpen: false, type: '' });

  const handleOpenModal = (type: string) => {
    setModalState({ isOpen: true, type });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: '' });
  };

  const addStudent = (payloaddata: Record<string, any>) => {
    const payload = {
      'payload': payloaddata,
      'school_id': school_id
    };
    return addSchoolStudent(payload);
  };

  const addTeacher = (payloaddata: Record<string, any>) => {
    const payload = {
      'payload': payloaddata,
      'school_id': school_id
    };
    return addSchoolTeacher(payload);
  };

  const handleDelete = async () => {
    const selectedEmails = [
      ...(state?.students ?? []),
      ...(state?.teachers ?? []),
    ]
      .filter((item) => item?.selected)
      .map((val) => val?.email);

    try {
      const response = await deleteuserMutation({ emails: selectedEmails });
      if (response) {
        fetchData();
        toast.success('Deleted successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  const headerTitle =
    modalState.type === 'Teacher' ? 'Add Teacher' : 'Add Student';
  return (
    <Container>
      <Content>
        <Sidebar>
          <AddLeftContent
            handleOpenModal={handleOpenModal}
            onDelete={handleDelete}
          />
        </Sidebar>
        <MainContent>
          <ListSection
            title="Student"
            items={filteredStudents}
            searchValue={state.studentSearch}
            onSearchChange={(event) =>
              handleSearchChange(event, 'studentSearch')
            }
            onSelectAll={() => handleSelectAll('students')}
            onDeselectAll={() => handleDeselectAll('students')}
            onToggleSelect={(name) => handleToggleSelect(name, 'students')}
          />
          <ListSection
            title="Teacher"
            items={filteredTeachers}
            searchValue={state.teacherSearch}
            onSearchChange={(event) =>
              handleSearchChange(event, 'teacherSearch')
            }
            onSelectAll={() => handleSelectAll('teachers')}
            onDeselectAll={() => handleDeselectAll('teachers')}
            onToggleSelect={(name) => handleToggleSelect(name, 'teachers')}
          />
        </MainContent>
      </Content>
      <ButtonContainer>
        <NextButton
          onClick={() => router.push(`/admin/class-creator?school=${title}&school_id=${school_id}`)}
          endIcon={
            <Image
              src="/assets/png/arrow.png"
              width={25}
              height={14}
              alt="next"
            />
          }
        >
          Next
        </NextButton>
      </ButtonContainer>
      {modalState.type === 'Teacher' ? (
        <AddTeacherForm
          open={modalState.isOpen}
          onClose={handleCloseModal}
          addTeacher={addTeacher}
          refetch={studentTeacherRecord}
          headerTitle={headerTitle}
        />
      ) : (
        <AddStudentForm
          open={modalState.isOpen}
          onClose={handleCloseModal}
          addStudent={addStudent}
          refetch={studentTeacherRecord}
          headerTitle={headerTitle}
        />
      )}
      
      <DrawerForm isExpand={false} />
    </Container>
  );
};

export default AddStudentTeacher;

export const generateValue = (data: any[]) => {
  return data?.map((item: { [x: string]: any; first_name: any, last_name: any }) => ({
    name: `${item.first_name} ${item.last_name}`,
    selected: false,
    email: item?.email,
  }));
};
