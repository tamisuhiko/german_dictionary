import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard } from "react-native";
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
  View,
  XStack,
  YGroup,
  YStack
} from "tamagui";

import { WordSearchingResult } from "../redux/models/WordSearchingParameter";
import { WordSuggestionParameter } from "../redux/models/WordSuggestionParameter";
import { dictionaryDataSelector } from "../redux/selectors/selectors";
import dictionaryDataSlice, {
  fetchWordListDatabyWord,
  fetchWordSuggestion,
  lookUpWordConjugation,
  lookUpWordMeaning,
  openWordSheet
} from "../redux/slices/dictionaryDataSlice";
import { AppDispatch } from "../redux/store/store";
import { black, white, yellow } from "../utils/colors";

import { Divider } from "./Divider";

type IProps = {
  delay: number;
};

const defaultProps = {
  delay: 500
};

RulesofEnjoymentSearch.defaultProps = defaultProps;

export default function RulesofEnjoymentSearch(props: IProps) {
  const [word, setWord] = useState("");
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const dictionaryData = useSelector(dictionaryDataSelector);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(fetchWordListDatabyWord(word));
    }, props.delay);
    return () => clearTimeout(timeOutId);
  }, [word]);

  return (
    <YStack
      alignItems="center"
      justifyContent="space-between"
    >
      <XStack position="relative">
        {word ? (
          <XStack
            position={"absolute"}
            right={5}
            top={10}
            zIndex={"1"}
          >
            <Button
              onPress={() => setWord("")}
              icon={
                <X
                  size="$1"
                  backgroundColor={"#ffffff"}
                />
              }
            />
          </XStack>
        ) : (
          ""
        )}

        <Input
          width={"100%"}
          size={"$6"}
          placeholder={t("search_box_placeholder")}
          value={word}
          onChangeText={(data) => setWord(data)}
        />
      </XStack>
      <ScrollView
        width={"100%"}
        backgroundColor={black}
        padding={"$3"}
        borderRadius={"$3"}
        borderColor={"#FFFFFF"}
        borderWidth={0.2}
        display={word ? "block" : "none"}
      >
        {dictionaryData.isFetchingData && word ? (
          <Spinner
            size="large"
            color="$orange10"
          />
        ) : (
          <YStack>
            {dictionaryData.wordList?.suggestions?.map((data, key) => {
              return (
                <XStack
                  key={key}
                  width={"100%"}
                >
                  <Text
                    fontSize={30}
                    color={"#ddb100"}
                  >{`${data.data} | `}</Text>
                  <Text fontSize={30}>{`${data.value}`}</Text>
                </XStack>
              );
            })}
          </YStack>
        )}
      </ScrollView>
    </YStack>
  );
}
