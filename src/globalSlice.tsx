import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  globalIsLogin:boolean;
  globalIsLoading:boolean;
  globalItems: any[]; // or a more specific type if you know it
  globalModal:boolean;
}

const initialState: GlobalState = {
  globalIsLogin:false,
  globalIsLoading:false,
  globalItems: [],
  globalModal:false,
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
  },
});

export const { setGlobalItems,setGlobalIsLogin,setGlobalIsLoading,setGlobalModal } = globalSlice.actions;
export default globalSlice.reducer;
