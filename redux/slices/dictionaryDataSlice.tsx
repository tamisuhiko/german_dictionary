import { useDispatch } from "react-redux";
import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";

import {
  WordConjugationSearchingResult,
  WordSearchingParameter,
  WordSearchingResult
} from "../models/WordSearchingParameter";
import {
  WordSuggestionParameter,
  WordSuggestionResult
} from "../models/WordSuggestionParameter";
import { AppDispatch } from "../store/store";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

interface Suggestions {
  data: string;
  value: string;
}

interface WordList {
  query: string;
  suggestions: Array<Suggestions>;
}

// Type definitions
export interface WordDictationary {
  wordTranslation: "vi" | "en";
  wordList: WordList;
  suggestionWord: WordSuggestionResult;
  wordSearchingResult: WordSearchingResult;
  wordConjugationSearchingResult: Array<WordConjugationSearchingResult>;
  wordListbyImage: any;
  isFetchingData: boolean; // Loading data that users is looking up
  isOpenWordSheet: boolean; // After loading data completely, a Sheet will be appear
}

// Define a type for your state
type State = WordDictationary;

const initialState: WordDictationary = {
  wordTranslation: "vi",
  wordList: null,
  suggestionWord: null,
  wordSearchingResult: null,
  isFetchingData: false,
  wordConjugationSearchingResult: [],
  isOpenWordSheet: false,
  wordListbyImage: null
};

export const dictionaryDataSlice = createSlice({
  name: "dictionaryData",
  initialState,
  reducers: {
    setwordTranslation(state: State, action: PayloadAction<"vi" | "en">) {
      state.wordTranslation = action.payload;
    },
    openWordSheet(state: State) {
      state.isOpenWordSheet = true;
    },
    closeWordSheet(state: State) {
      state.isOpenWordSheet = false;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder
      .addCase(
        fetchWordListDatabyWord.fulfilled,
        (state: State, action: PayloadAction<any>) => {
          state.isFetchingData = false;
          state.wordList = action.payload;
        }
      )
      .addCase(
        fetchWordSuggestion.fulfilled,
        (state: State, action: PayloadAction<any>) => {
          state.isFetchingData = false;
          state.suggestionWord = action.payload;
        }
      )
      .addCase(
        lookUpWordMeaning.fulfilled,
        (state: State, action: PayloadAction<WordSearchingResult>) => {
          state.isFetchingData = false;
          state.wordConjugationSearchingResult = [];
          state.wordSearchingResult = action.payload;
        }
      )
      .addCase(
        lookUpWordConjugation.fulfilled,
        (
          state: State,
          action: PayloadAction<Array<WordConjugationSearchingResult>>
        ) => {
          state.isFetchingData = false;
          state.wordConjugationSearchingResult = action.payload;
        }
      )
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state: State, action: PayloadAction<any>) => {
          //state.isLoading = true;
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("/fulfilled"),
        (state: State, action: PayloadAction<any>) => {
          //state.isLoading = false;
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("/rejected"),
        (state: State, action: PayloadAction<any>) => {
          //state.isLoading = false;
        }
      );
  }
});

export const { openWordSheet, closeWordSheet, setwordTranslation } =
  dictionaryDataSlice.actions;
export default dictionaryDataSlice;

//Define thunk(s)
export const fetchWordListDatabyWord = createAsyncThunk(
  "api/data",
  async (word: string) => {
    const response = await fetch(
      `https://api2.matetranslate.com/der-die-das/lookup_article?query=${word}`
    );
    const data = await response.json();
    return data;
  }
);

export const fetchWordSuggestion = createAsyncThunk(
  "api/fetchWordSuggestion",
  async (parameters: WordSuggestionParameter) => {
    parameters.dict = `de${parameters.dict}`;
    const response = await fetch("https://suggest.faztaa.com/api/suggest", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parameters)
    });
    const data = await response.json();
    return data;
  }
);

export const lookUpWordMeaning = createAsyncThunk(
  "api/lookUpWordMeaning",
  async (parameters: WordSearchingParameter) => {
    const response = await fetch(
      `https://api.faztaa.com/api/search/${parameters.lang}/${parameters.dict}/${parameters.keyword}?page=1&limit=50`
    );
    const data = await response.json();

    return data;
  }
);

export const lookUpWordConjugation = createAsyncThunk(
  "api/lookUpWordConjugation",
  async (verb: string) => {
    const response = await fetch(
      `https://api.faztaa.com/api/search/conjugation/${verb}`
    );
    const data = await response.json();

    return data;
  }
);
