import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  globalIsLogin:boolean;
  globalIsLoading:boolean;
  globalItems: any[]; // or a more specific type if you know it
  globalModal:boolean;
  globalSettings:any[];
  globalVerifiedBy:any[];
}

const initialState: GlobalState = {
  globalIsLogin:false,
  globalIsLoading:false,
  globalItems: [],
  globalModal:false,
  globalSettings:[],
  globalVerifiedBy:[],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalIsLogin: (state, action) => {
      state.globalIsLogin = action.payload;
    },
    setGlobalIsLoading: (state, action) => {
      state.globalIsLoading = action.payload;
    },
    setGlobalItems: (state, action: PayloadAction<any[]>) => {
      state.globalItems = action.payload;
    },

    setGlobalModal: (state, action) => {
      state.globalModal = action.payload;
    },

    setGlobalSettings: (state, action: PayloadAction<any[]>) => {
      state.globalSettings = action.payload;
    },
    setGlobalVerifiedBy: (state, action) => {
      state.globalVerifiedBy = action.payload;
    },
  },
});

export const { setGlobalItems,setGlobalIsLogin,setGlobalIsLoading,setGlobalModal,setGlobalSettings,setGlobalVerifiedBy } = globalSlice.actions;
export default globalSlice.reducer;
