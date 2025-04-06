import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';

// Define types for the mutation function and the data it returns
type MutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;

// Define a custom hook for mutation
export function useCustomMutation<TData, TVariables>(
  mutationFn: MutationFn<TData, TVariables>,
  queryKeysToInvalidate: any[],
): UseMutationResult<TData, unknown, TVariables> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryKeysToInvalidate.forEach((queryKey: any) => {
        queryClient.invalidateQueries(queryKey);
      });
      
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      // Optionally, you can show a notification here or handle the error
    },
  });
}
