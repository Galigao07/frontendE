 const getextendedAPI  =  (): ExtendedAPIType =>
  (window.ExtendedAPI as ExtendedAPIType) ?? {
    sendGlobalItems: (_: any[]) => {},
    onSyncGlobalItems: (_: any) => () => {},
    requestCurrentGlobalItems: () => Promise.resolve([]),
  };
export default getextendedAPI