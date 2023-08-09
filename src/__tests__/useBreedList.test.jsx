import { expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useBreedList from '../useBreedList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false
    }
  }
});

test('gives an empty list with no animal', async () => {
  const { result } = renderHook(() => useBreedList(''), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    )
  });

  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe('fulfilled');
});
