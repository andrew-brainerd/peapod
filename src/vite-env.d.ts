/// <reference types="vite/client" />

declare const APP_VERSION: string;


declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
