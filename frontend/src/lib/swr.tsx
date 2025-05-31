"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";


interface SWRProviderProps {
  children: ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        suspense: false,
        refreshInterval: 0,
        revalidateOnFocus: false,
        errorRetryInterval: 10000,
        shouldRetryOnError: false,

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
