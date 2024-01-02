import { configureStore } from "@reduxjs/toolkit";

import dictionaryDataSlice from "../slices/dictionaryDataSlice";
import initialDataSlice from "../slices/initialDataSlice";
import navigationShareSlice from "../slices/navigationShareSlice";

const store = configureStore({
  reducer: {
    initialData: initialDataSlice.reducer,
    dictionaryData: dictionaryDataSlice.reducer,
    navigationShare: navigationShareSlice.reducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
