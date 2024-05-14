import { QueryClient } from '@tanstack/react-query';

const defaultQueryConfig = {staleTime: 600000}

export const queryClient = new QueryClient({
    defaultOptions: {queries: defaultQueryConfig}
});