// const configAPI = window.configAPI ?? {
//   // Fallback for browser mode
//   get: async () => {
//     console.warn("Using mock configAPI (browser mode)");
//     return {
//       device: { ulCode: "mock", ptuNo: "MOCK-1234" },
//       license: { dateIssue: "N/A", dateValid: "N/A" },
//     };
//   },
//   set: async (newConfig: any) => {
//     console.warn("Mock configAPI.set called (browser mode)", newConfig);
//   },
// };

// export default configAPI;
// config.ts
// Wrapper around window.configAPI (preload) or a fallback





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
  host: string,
  ipaddress: string;
  ws:string;
  port: string;
  socketport: string
  pdf:string,
  pdfWorker:string

};

// Expose API (through preload or fallback for dev/browser)
 const configAPI = window.configAPI ?? {
  get: async (): Promise<Config> => {
    try {
      const response = await fetch("/config.json");
      if (!response.ok) throw new Error("Failed to load config.json");

      const data = (await response.json()) as Config;
      // localStorage.setItem("mockConfig", JSON.stringify(data));
      return data;
    } catch (err) {
      console.error("Error reading config.json in browser:", err);
      const fallback: Config = {
        ulCode: "1",
        ptuNo: "PTU NO: FP092022-115-0345623-00005",
        terminalNo: "2",
        machineNo: "22091316054628404",
        siteNo: "6",
        serialNo: "9S715HK12277ZS5000149",
        modelNo: "ST1000DM010",
        description: "TERMINAL 21",
        dateIssue: "2024-09-01",
        dateValid: "2030-12-31",
        host: "https://localhost:5173",
        ipaddress: "https://localhost",
        ws:"ws://localhost",
        port: "8000",
        socketport: "8001",
        pdf:'C:\\Users\\User\\AppData\\Local\\SumatraPDF\\SumatraPDF.exe',
        pdfWorker:'pdf.worker.min.js',
      };


      // localStorage.setItem("mockConfig", JSON.stringify(fallback));
      return fallback;
    }
  },
//TAKE NOTE IT CANT UPDATE CONFIG.JSON IF USING BROWSER RUNTIME USE ONLY ELECTRON RUNTIME
set: async (newConfig: Config): Promise<Config> => {
    if (window.configAPI) {
      console.log('Set',newConfig)
      return window.configAPI.set(newConfig); // ✅ now typed correctly
    }
    return newConfig;
  },
};


export default configAPI;


// const configAPI = {
//   get: async () => {
//     if (window.configAPI) {
//       console.log("Calling Electron IPC");
//       return await window.configAPI.get(); // proper IPC call
//     }

//     console.warn("Browser fallback configAPI called");

//     try {
//       const response = await fetch("/config.json");
//       if (!response.ok) throw new Error("Failed to load config.json");
//       const data = await response.json();
//       localStorage.setItem("mockConfig", JSON.stringify(data));
//       return data;
//     } catch (err) {
//       console.error("Error reading config.json in browser:", err);
//       const fallback = {
//         device: { ulCode: "mock", ptuNo: "MOCK-1234" },
//         license: { dateIssue: "N/A", dateValid: "N/A" },
//       };
//       localStorage.setItem("mockConfig", JSON.stringify(fallback));
//       return fallback;
//     }
//   },

//   set: async (newConfig: any) => {
//     if (window.configAPI) {
//       return await window.configAPI.set(newConfig); // proper IPC call
//     }
//     console.warn("Browser fallback configAPI.set called", newConfig);
//     localStorage.setItem("mockConfig", JSON.stringify(newConfig));
//   },
// };

// export default configAPI;


