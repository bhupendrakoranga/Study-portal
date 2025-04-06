'use client';
import { IGlobal } from '@/types/global';
/* eslint-disable */
import React, { useContext } from 'react';

export const GlobalContext = React.createContext({} as IGlobal);
export const GlobalContextContainer = GlobalContext.Provider;
export const useGlobalContext = () => useContext(GlobalContext);
