import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type definitions
interface IInitData {
  isInitData: boolean;
}

// Define a type for your state
type State = IInitData;

const initialState: IInitData = {
  isInitData: false
};

export const initialDataSlice = createSlice({
  name: "initialData",
  initialState,
  reducers: {
    setLoadedData(state: State, action: PayloadAction<boolean>) {
      state.isInitData = action.payload;
    }
  }
});

export const { setLoadedData } = initialDataSlice.actions;
export const initialDataSelector = (state: State) => state;
export default initialDataSlice;
