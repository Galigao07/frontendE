import { promises as fs } from "fs";
import path from "path";
import { app } from "electron";

function getConfigPath() {
  return app.isPackaged
    ? path.join(path.dirname(process.execPath), "config.json")
    : path.join(__dirname, "../public/config.json");
}

type Config = {
  apiUrl: string;
  host: string;
};

export async function loadConfig(): Promise<Config> {
  const configPath = getConfigPath();
  const raw = await fs.readFile(configPath, "utf-8");
  return JSON.parse(raw) as Config;
}