import React from 'react';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import InputBox, { Label } from '@/component/ui/inputs/InputBox';
import { InputContainer } from '@/styles/globleStyle';
import {
  typographyBody1Semibold,
  typographyH6SemiBold,
} from '@/styles/typography';
import AdminFormRootModal from '@/component/ui/modals/AdminFormRootModal';
import * as Yup from 'yup';
import { generateData } from '@/utils/constant';
import { toast } from 'react-toastify';

const studentValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Only alphabets are allowed and no initial spaces')
    .min(2, 'First name must be at least 2 characters long')
    .max(20, 'First name must be at most 20 characters long')
    .required('First name is required'),
  
  last_name: Yup.string()
    .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Only alphabets are allowed and no initial spaces')
    .min(2, 'Last name must be at least 2 characters long')
    .max(20, 'Last name must be at most 20 characters long')
    .required('Last name is required'),
  
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$/, 'Password must be alphanumeric, include one special character, one uppercase letter, and be between 6 and 20 characters long')
    .required('Password is required'),
  
});

const AddStudentForm: React.FC<{
  open: boolean;
  onClose: () => void;
  addStudent: any;
  headerTitle: string;
  refetch: () => void;
}> = ({ open, onClose, addStudent, headerTitle, refetch }) => {

  const formik: any = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: studentValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const data = generateData(values);
      try {
        const response = await addStudent(data);
        if (response) {
          resetForm();
          refetch();
          toast.success('User created successfully');
          onClose();
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.detail);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <AdminFormRootModal
      isOpen={open}
      onClose={handleClose}
      title={headerTitle}
      onSubmit={formik.handleSubmit}
    >
      <StyledInputContainer>
        <div style={{display: 'flex', justifyContent:'space-between', gap: '12px'}}>
          <div style={{width: '100%'}}>
            <InputBox
              id="first_name"
              label="First Name"
              name="first_name"
              placeholder="Enter first name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <Error>{formik.errors.first_name}</Error>
            )}
          </div>
          <div style={{width: '100%'}}>
            <InputBox
              id="last_name"
              label="Last Name"
              name="last_name"
              placeholder="Enter last name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <Error>{formik.errors.last_name}</Error>
            )}
          </div>
        </div>
      </StyledInputContainer>
      <StyledInputContainer>
        <InputBox
          id="email"
          label="Email"
          name="email"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <Error>{formik.errors.email}</Error>
        )}
      </StyledInputContainer>
      <StyledInputContainer>
        <InputBox
          id="password"
          label="Password"
          name="password"
          type='password'
          placeholder="Enter password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <Error>{formik.errors.password}</Error>
        )}
      </StyledInputContainer>
    </AdminFormRootModal>
  );
};

export default AddStudentForm;

export const UserLabel = styled(Label)`
  font-size: 24px;
  margin-bottom: 8px;
`;

export const CLabel = styled(UserLabel)`
  font-size: 20px;
  margin: 18px 0;
`;

export const Section = styled.div`
  margin: 10px 0;
  & .MuiTypography-body1 {
    ${typographyH6SemiBold}
  }
`;

export const StyledInputContainer = styled(InputContainer)`
  margin: 8px 0 18px 0;
  & label {
    ${typographyBody1Semibold}
  }
  position: relative;
`;

export const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
