declare module 'electron-pdf-window' {
  import { BrowserWindow } from 'electron';
  export default function addSupport(window: BrowserWindow): void;
}
