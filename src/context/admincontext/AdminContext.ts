'use client';
import { IGAdmin } from '@/types/global';
/* eslint-disable */
import React, { useContext } from 'react';

export const AdminContext = React.createContext({} as IGAdmin);
export const AdminContextContainer = AdminContext.Provider;
export const useAdminContext = () => useContext(AdminContext);
