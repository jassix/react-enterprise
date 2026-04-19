/// <reference types="vite/client" />

export const env = {
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  isSsr: import.meta.env.SSR,
} as const;
