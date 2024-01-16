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
  wordTranslation: string;
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
  wordTranslation: "devi",
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
          console.log(state.wordSearchingResult);
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
      .addCase(
        searchWordbyImages.fulfilled,
        (state: State, action: PayloadAction<any>) => {
          state.wordListbyImage = action.payload;
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

export const { openWordSheet, closeWordSheet } = dictionaryDataSlice.actions;
export default dictionaryDataSlice;

//Define thunk(s)
export const fetchWordListDatabyWord = createAsyncThunk(
  "api/data",
  async (word: string) => {
    const response = await fetch(
      `https://api2.matetranslate.com/der-die-das/lookup_article?query=${word}`
    );
    const data = await response.json();
    //console.log(data);
    return data;
  }
);

export const fetchWordSuggestion = createAsyncThunk(
  "api/fetchWordSuggestion",
  async (parameters: WordSuggestionParameter) => {
    const response = await fetch("https://suggest.faztaa.com/api/suggest", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parameters)
    });
    const data = await response.json();
    //console.log(JSON.stringify(data));
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

export const searchWordbyImages = createAsyncThunk(
  "api/imageSearchingWords",
  async (word: string) => {
    const response = await fetch(
      "https://www.google.com/search?q=fetch+google+url+with+no+cors&sca_esv=598740777&rlz=1C1GCEA_enVN962VN962&tbm=isch&sxsrf=ACQVn0-WNHwsuAGWC7xoy5sZD8wIRloihA:1705395266135&source=lnms&sa=X&ved=2ahUKEwiGk6i4xOGDAxUusVYBHU8GC44Q_AUoA3oECAEQBQ&biw=1536&bih=762&dpr=1.25",
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6",
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua":
            '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          "sec-ch-ua-arch": '"x86"',
          "sec-ch-ua-bitness": '"64"',
          "sec-ch-ua-full-version": '"120.0.6099.200"',
          "sec-ch-ua-full-version-list":
            '"Not_A Brand";v="8.0.0.0", "Chromium";v="120.0.6099.200", "Google Chrome";v="120.0.6099.200"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": '""',
          "sec-ch-ua-platform": '"Windows"',
          "sec-ch-ua-platform-version": '"10.0.0"',
          "sec-ch-ua-wow64": "?0",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "x-client-data":
            "CIW2yQEIpLbJAQipncoBCM2OywEIlqHLAQjxmM0BCIWgzQEIjuHNAQit6c0BCKHuzQEIg/DNAQiF8M0BCKryzQEYyOHNARin6s0B"
        },
        referrer: "https://www.google.com/",
        referrerPolicy: "origin",
        body: null,
        method: "GET",
        mode: "no-cors",
        credentials: "include"
      }
    );
    const data = await response.text();
    console.log(data);
    return data;
  }
);
