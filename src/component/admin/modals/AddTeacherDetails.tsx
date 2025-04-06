import React from 'react';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import InputBox from '@/component/ui/inputs/InputBox';
import { InputContainer } from '@/styles/globleStyle';
import { validationSchema } from '@/utils/form/ValidationSchema';
import AdminFormRootModal from '@/component/ui/modals/AdminFormRootModal';
import { Error } from './AddStudentForm';

// Validation schema

const AddTeacherDetails = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {
    errors,
    touched,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      subject: '',
      section: '',
      teacher: 'aarya',
    },
    validationSchema,
    onSubmit: (formvalues) => {
      console.log(formvalues);
    },
  });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AdminFormRootModal
      title="Teacher Details"
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <Container>
        <InputContainer>
          <InputBox
            id="subject"
            label="Subject"
            name="subject"
            placeholder="Subject"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.subject && errors.subject ? (
            <Error>{errors.subject}</Error>
          ) : null}
        </InputContainer>
        <InputContainer>
          <InputBox
            id="section"
            label="Section"
            name="section"
            placeholder="Section"
            value={values.section}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.section && errors.section ? (
            <Error>{errors.section}</Error>
          ) : null}
        </InputContainer>
        <InputContainer>
          <InputBox
            id="teacher"
            label="Teacher"
            name="teacher"
            placeholder="Teacher"
            value={values.teacher}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.teacher && errors.teacher ? (
            <Error>{errors.teacher}</Error>
          ) : null}
        </InputContainer>
      </Container>
    </AdminFormRootModal>
  );
};

export default AddTeacherDetails;

const Container = styled.div`
  padding-bottom: 0;
`;
