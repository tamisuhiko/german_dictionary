import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";

// Type definitions
interface HeaderNavigationProps {
  headerTitle: string;
}

// Define a type for your state
type State = HeaderNavigationProps;

const initialState: HeaderNavigationProps = {
  headerTitle: "Home"
};

export const navigationShareSlice = createSlice({
  name: "navigationShare",
  initialState,
  reducers: {
    // setLoadedData(state: State, action: PayloadAction<boolean>) {
    //   state.isInitData = action.payload;
    // }
  }
});

//export const { } = dictionaryDataSlice.actions;
export default navigationShareSlice;

//Define thunk(s)
