// configLoader.ts
import configAPI from "./configAPI";

let cachedConfig: any = null;

export async function initConfig() {
  if (!cachedConfig) {
    cachedConfig = await configAPI.get();
    console.log("Loaded config:", cachedConfig);
  }
  return cachedConfig;
}

export function getConfigSync() {
  if (!cachedConfig) {
    throw new Error("Config not loaded yet. Call initConfig() first.");
  }
  return cachedConfig;
}
