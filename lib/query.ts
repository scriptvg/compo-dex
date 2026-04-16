import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

const config = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
        },
    },
} as QueryClientConfig;

export const queryClient = new QueryClient(config);