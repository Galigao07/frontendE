 const getextendedAMTAPI  =  (): ExtendedAMTAPIType =>
  (window.ExtendedAMTAPI as ExtendedAMTAPIType) ?? {
    sendTendered: (_: any[]) => {},
    onSyncGlobalTendered: (_: any) => () => {},
    requestCurrentGlobalTendered: () => Promise.resolve([]),
  };
export default getextendedAMTAPI