import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";

import { QouteResult } from "../models/QouteParameter";

// Type definitions
interface IQouteData {
  data: QouteResult;
}

// Define a type for your state
type State = IQouteData;

const initialState: IQouteData = {
  data: null
};

export const qouteDataSlice = createSlice({
  name: "qouteData",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder.addCase(
      fetchQouteData.fulfilled,
      (state: State, action: PayloadAction<any>) => {
        state.data = action.payload;
      }
    );
  }
});

//export const {} = qouteDataSlice.actions;
export default qouteDataSlice;

//Define thunk(s)
export const fetchQouteData = createAsyncThunk("api/qoute", async () => {
  const response = await fetch(
    `https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&jsonp=?`
  );
  const data = await response.json();
  return data;
});
