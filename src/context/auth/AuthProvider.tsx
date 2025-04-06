import { IAuth } from '@/types/global';
import React, { PropsWithChildren, useState } from 'react';
import { AuthContextContainer } from './AuthContext';

function AuthProvider({ children }: PropsWithChildren) {
  const [role, setRole] = useState('student');

  const contextValues: IAuth = {
    isLoggedIn: false,
    role,
    setRole,
  };

  return (
    <AuthContextContainer value={contextValues}>
      {children}
    </AuthContextContainer>
  );
}

export default AuthProvider;
