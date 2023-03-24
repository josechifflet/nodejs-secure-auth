import { DocumentNode, useQuery } from '@apollo/client';

interface QueryHookProps<T> {
  query: DocumentNode;
  variables?: Record<string, any>;
  onData?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useQueryHook<T>({
  query,
  variables,
  onData,
  onError,
}: QueryHookProps<T>) {
  const { data, error, loading } = useQuery<T>(query, {
    variables,
    onError: (error) => {
      console.error(error);
      onError && onError(error);
    },
  });

  if (error) {
    console.error(error);
    onError && onError(error);
  }

  if (data) {
    onData && onData(data);
  }

  return {
    data,
    loading,
    error,
  };
}
