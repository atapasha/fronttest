import React, { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "react-query";
// import ReactQueryDevtools from "@tanstack/react-query-devtools";

import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/main.css";
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
