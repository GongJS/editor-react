import { QueryKey, useQueryClient } from 'react-query';

export const useConfig = <T>(
  queryKey: QueryKey,
  callback: (target: any, old?: T) => any[],
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any) => callback(target, old));
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export default useConfig;
