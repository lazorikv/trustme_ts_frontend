/// <reference types="react-scripts" />


declare namespace NodeJS {
    interface ProcessEnv {
      TRUST_ME_API_URL: string;
    }
  }

  declare module "react/jsx-runtime" {
    export default any;
  }