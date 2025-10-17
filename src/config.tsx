import configAPI from "./utils/configAPI";

// const BASE_URL =  'http://192.168.68.116:8000';
// const BASE_URL =  'http://192.168.68.111:8000';

//  const BASE_URL =  'http://192.168.68.114:8000';


// const BASE_URL =  'http://127.0.0.1:8000';
// export default BASE_URL;

// const SOCKET_URL = 'http://127.0.0.1:8001';
// export default SOCKET_URL;

// export const BASE_URL = 'http://127.0.0.1:8000';
// export const SOCKET_URL = 'http://127.0.0.1:8001';

// export const BASE_URL = 'http://192.168.43.155:8000';
// export const SOCKET_URL = 'http://192.168.43.155:8001';

// export const BASE_URL = 'http://192.168.68.116:8000';
// export const SOCKET_URL = 'http://192.168.68.116:8001';



let BASE_URL: string;
let SOCKET_URL: string;
let ULCODE: string = "5";
let PTUNO: string = "PTU";
let TERMINALNO: string = "1";
let MACHINENO: string = "SDNFJ2340";
let SITENO: string = "4444";
let SERIALNO: string = "3421JOPWR";
let MODELNO: string = "KNGTF9324";
let DESCRIPTION: string = "TERMINAL 1";
let DATEISSUE: string = "2025-09-19";
let DATEVALID: string = "2025-09-19";
let PDF:string = 'SumatraPDF/SumatraPDF.ex';
let PDFWORKER: string = 'pdf.worker.min.js';



/**
 * Call this once during app startup to load config.json
 * and initialize BASE_URL / SOCKET_URL
 */
export async function setupUrls() {
    const config = await configAPI.get();
    BASE_URL = `${config.ipaddress}:${config.port}`;
    SOCKET_URL = `${config.ws}:${config.socketport}`;
    ULCODE = config.ulCode;
    PTUNO = config.ptuNo;
    TERMINALNO = config.terminalNo;
    MACHINENO = config.machineNo;
    SITENO = config.siteNo;
    SERIALNO = config.serialNo;
    MODELNO = config.modelNo;
    DESCRIPTION = config.description;
    DATEISSUE = config.dateIssue;
    DATEVALID = config.dateValid;
    PDF = config.pdf;
    PDFWORKER = config.pdfWorker;
}

export {
  ULCODE,
  PTUNO,
  TERMINALNO,
  MACHINENO,
  SITENO,
  SERIALNO,
  MODELNO,
  DESCRIPTION,
  DATEISSUE,
  DATEVALID,
  BASE_URL,
  SOCKET_URL,
  PDF,
  PDFWORKER,
};

