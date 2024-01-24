import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard } from "react-native";
import { Image, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PayloadAction } from "@reduxjs/toolkit";
import { Search, Sun, X } from "@tamagui/lucide-icons";
import { green, greenA } from "@tamagui/themes";
import {
  Button,
  Input,
  ListItem,
  ScrollView,
  Sheet,
  Spinner,
  Text,
  XStack,
  YGroup,
  YStack
} from "tamagui";

import { WordSearchingResult } from "../redux/models/WordSearchingParameter";
import { WordSuggestionParameter } from "../redux/models/WordSuggestionParameter";
import {
  dictionaryDataSelector,
  qouteDataSelector
} from "../redux/selectors/selectors";
import dictionaryDataSlice, {
  fetchWordListDatabyWord,
  fetchWordSuggestion,
  lookUpWordConjugation,
  lookUpWordMeaning,
  openWordSheet
} from "../redux/slices/dictionaryDataSlice";
import { fetchQouteData } from "../redux/slices/qouteDataSlice";
import { AppDispatch } from "../redux/store/store";
import { black, white, yellow } from "../utils/colors";

import { Divider } from "./Divider";

export default function FamousQoute() {
  const { t, i18n } = useTranslation();
  const qouteData = useSelector(qouteDataSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchQouteData());
  }, []);

  if (!qouteData.data) return "";
  return (
    <View
      style={{
        alignItems: "center",
        padding: 50,
        margin: 20
      }}
    >
      <Text fontSize={20}>{qouteData.data.quoteText}</Text>
      {qouteData.data.quoteAuthor ? (
        <Text color={"$red10Dark"}>{`${qouteData.data.quoteAuthor}`}</Text>
      ) : (
        ""
      )}
    </View>
  );
}
