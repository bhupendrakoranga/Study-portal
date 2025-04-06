import { Role } from '@/utils/constant/Data';
import LoginForm from '@/_layouts/auth/LoginForm';
import React from 'react';

const Page = ({ role }: { role: Role }) => {
  return <LoginForm role={role} />;
};

export default Page;
