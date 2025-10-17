  // src/types/pdf-to-printer.d.ts
declare module 'pdf-to-printer' {
  export interface Options {
    printer?: string;
    win32?: string;
    linux?: string;
    mac?: string;
    silent?: boolean;
    docname?: string;
    powerShell?: boolean;
  }

  export function print(filePath: string, options?: Options): Promise<void>;
}