// lib/reactQueryClient.ts
import { QueryClient, QueryFunction } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const { data } = await axiosInstance.get(queryKey[0] as string);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      onError: (error) => {
        console.error('Error in mutation:', error);
      },
    },
  },
});

export default queryClient;
