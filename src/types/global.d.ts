// src/types/global.d.ts
export {};

declare global {
  type Config = {
    ulCode: string;
    ptuNo: string;
    terminalNo: string;
    machineNo: string;
    siteNo: string;
    serialNo: string;
    modelNo: string;
    description: string;
    dateIssue: string;
    dateValid: string;
    host:string,
    ipaddress: string;
    ws:string;
    port: string;
    socketport: string
    pdf:string
    pdfWorker:string
  };
interface ExtendedAPIType {
  sendGlobalItems: (payload: any[]) => void;
  onSyncGlobalItems: (callback: (data: any[]) => void) => () => void;
  requestCurrentGlobalItems: () => Promise<any[]>; // must return a Promise
}
interface ExtendedAMTAPIType {
  sendTendered: (payload: any[]) => void;
  onSyncGlobalTendered: (callback: (data: any[]) => void) => () => void;
  requestCurrentGlobalTendered: () => Promise<any[]>; // must return a Promise
}



interface ElectronPDFPrint {
  printPDF: (pdfBuffer: ArrayBuffer | string) => Promise<{ success: boolean; error?: string }>;
}
  interface Window {
    configAPI: {
      get: () => Promise<Config>;
      set: (newConfig: Config) => Promise<Config>;
    };
 
      electronPDFPrint?: ElectronPDFPrint;
      ExtendedAPI?: ExtendedAPIType;
      ExtendedAMTAPI?: ExtendedAMTAPIType;
     electronAPI?: {
      onBeforeQuit?: (callback: () => void) => void;  // callback-style listener
      closeApp?: () => void;
      silentPrint?: (iframeWindow: Window) => unknown;
      SilentPrint?: () => void;
    };
  }
}
