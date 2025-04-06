import { WHITE } from '@/styles/color';
import { createCookies } from '@/utils/action';
import { Role, roleBasedRedirects } from '@/utils/constant/Data';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import React from 'react';
import { login } from '@/lib/api/api';
import { useFormik } from 'formik';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { toast } from 'react-toastify';

// Styled Components
const Container = styled.div`
  background: ${WHITE};
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

// Component
const LoginForm = ({ role }: { role: Role }) => {
  const { mutateAsync } = useCustomMutation(login, ['login']);
  const { values, handleChange } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      handleLogin();
    },
  });
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await mutateAsync({ ...values});
      const details = { role, ...response };
      await createCookies('users', JSON.stringify(details));
      toast.success('Login successfully');
      const path = roleBasedRedirects[role] || '/admin/curriculumbuilder';
      router.push(path);
    } catch (error: any) {
      toast.error(error?.response?.data?.non_field_errors?.[0]);
    }
  };

  return (
    <Container>
      <Form>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={values?.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={values?.password}
          onChange={handleChange}
          required
        />
        <Button onClick={handleLogin}>Login</Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
