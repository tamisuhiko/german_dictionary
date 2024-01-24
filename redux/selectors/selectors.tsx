import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store/store";

export const dictionaryDataSelector = (state: RootState) =>
  state.dictionaryData;
export const qouteDataSelector = (state: RootState) => state.qouteData;
export const initialDataSelector = (state: RootState) => state.initialData;
export const navigationShareSelector = (state: RootState) =>
  state.navigationShare;
