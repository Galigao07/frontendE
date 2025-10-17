import React, { useEffect, useState } from "react";
import configAPI from "../utils/configAPI";


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
};

// declare global {
//   interface Window {
//     configAPI: {
//       get: () => Promise<Config>;
//       set: (config: Config) => Promise<Config>;
//     };
//   }
// }


const TerminalSetup: React.FC = () => {
   const [config, setConfig] = useState<Config |any>(null);

    useEffect(() => {
    configAPI.get().then((data) => {
      
      if (data) setConfig(data);
      else console.error("Config is undefined!");
    });
  }, []);


  // Save config.json
  const handleSave = async () => {
    const currentConfig = await configAPI.get();

  // Update device part
  const updatedConfig = {
    ...currentConfig,
    ...config,  // spread instead of nesting
  };

  await configAPI.set(updatedConfig); // save full config
  alert("Configuration saved!");
  };
  // Handle field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prev:any) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {config && 
      <>
      <label>UL Code</label>
      <input name="ulCode" value={config.ulCode} onChange={handleChange} />

      <label>PTU No.</label>
      <input name="ptuNo" value={config.ptuNo} onChange={handleChange} />

      <label>Terminal No.</label>
      <input name="terminalNo" value={config.terminalNo} onChange={handleChange} />

      <label>Machine No.</label>
      <input name="machineNo" value={config.machineNo} onChange={handleChange} />

      <label>Site No.</label>
      <input name="siteNo" value={config.siteNo} onChange={handleChange} />

      <label>Serial No.</label>
      <input name="serialNo" value={config.serialNo} onChange={handleChange} />

      <label>Model No.</label>
      <input name="modelNo" value={config.modelNo} onChange={handleChange} />

      <label>Description</label>
      <input name="description" value={config.description} onChange={handleChange} />

      <label>Date Issue</label>
      <input type="date" name="dateIssue" value={config.dateIssue} onChange={handleChange} />

      <label>Date Valid</label>
      <input type="date" name="dateValid" value={config.dateValid} onChange={handleChange} />
     </> }
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default TerminalSetup;
