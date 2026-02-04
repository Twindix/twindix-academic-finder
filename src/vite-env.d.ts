/// <reference types="vite/client" />

interface ImportMetaEnv { readonly VITE_API_URL: string } // eslint-disable-line

interface ImportMeta { readonly env: ImportMetaEnv } // eslint-disable-line
