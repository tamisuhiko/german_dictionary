import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";

interface Suggestions {
  data: string;
  value: string;
}

interface WordList {
  query: string;
  suggestions: Array<Suggestions>;
}

// Type definitions
interface WordDictationary {
  wordList: WordList;
  isLoading: boolean;
}

// Define a type for your state
type State = WordDictationary;

const initialState: WordDictationary = {
  wordList: null,
  isLoading: false
};

export const dictionaryDataSlice = createSlice({
  name: "dictionaryData",
  initialState,
  reducers: {
    // setLoadedData(state: State, action: PayloadAction<boolean>) {
    //   state.isInitData = action.payload;
    // }
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder
      .addCase(
        fetchWordListDatabyWord.pending,
        (state: State, action: PayloadAction<any>) => {
          state.isLoading = true;
        }
      )
      .addCase(
        fetchWordListDatabyWord.rejected,
        (state: State, action: PayloadAction<any>) => {
          console.log(action.payload);
        }
      )
      .addCase(
        fetchWordListDatabyWord.fulfilled,
        (state: State, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.wordList = action.payload;
        }
      );
  }
});

//export const { } = dictionaryDataSlice.actions;
export default dictionaryDataSlice;

//Define thunk(s)
export const fetchWordListDatabyWord = createAsyncThunk(
  "wordList/data",
  async (word: string) => {
    const response = await fetch(
      `https://api2.matetranslate.com/der-die-das/lookup_article?query=${word}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  }
);
