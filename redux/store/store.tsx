import { configureStore } from "@reduxjs/toolkit";

import initialDataSlice from "../slices/initialDataSlice";

const store = configureStore({
  reducer: {
    initData: initialDataSlice
  }
});

export default store;
