'use client';
import { useEffect, useState } from 'react';
import { getCookies } from '@/utils/action';
import { usePathname } from 'next/navigation';

const useUserType = () => {
  const [role, setRole] = useState('Student');
  const pathname = usePathname();

  const getUserType = async () => {
    try {
      const result = await getCookies('users');
      if (result && result.value) {
        const { value } = result;
        const parserole = JSON.parse(value)?.role;
        setRole(parserole);
      } else {
        console.error('getCookies did not return a valid value:', result);
      }
    } catch (error) {
      console.error('Error getting user type:', error);
    }
  };

  useEffect(() => {
    getUserType();
  }, [pathname]);

  return role;
};

export default useUserType;
