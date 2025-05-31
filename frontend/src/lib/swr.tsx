"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";
// import { axiosInstance } from "./axios";

// Define types for fetcher
export type FetcherConfig = {
  url: string;
  params?: Record<string, unknown>;
};

// Default fetcher function for SWR
// const fetcher = async (config: FetcherConfig) => {
//   const { url, params } = config;
//   const response = await axiosInstance.get(url, { params });
//   return response.data;
// };

interface SWRProviderProps {
  children: ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        // fetcher,
        // Global SWR configuration
        suspense: false,
        refreshInterval: 0,
        revalidateOnFocus: false,
        errorRetryInterval: 10000,
        // revalidateOnFocus: false,
        // revalidateOnReconnect: true,
        // dedupingInterval: 2000,
        // errorRetryCount: 3,
        // errorRetryInterval: 5000,
        // focusThrottleInterval: 5000,
        // shouldRetryOnError: true,
        onError: (error) => {
          console.log("SWR Error:", error);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default SWRProvider;
