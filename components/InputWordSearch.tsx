import React, { useEffect, useState } from "react";
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

InputWordSearchComponent.defaultProps = defaultProps;

export default function InputWordSearchComponent(props: IProps) {
  const [word, setWord] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const dictionaryData = useSelector(dictionaryDataSelector);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const parameter = {
        keyword: word,
        dict: dictionaryData.wordTranslation
      } as WordSuggestionParameter;
      dispatch(fetchWordSuggestion(parameter));
    }, props.delay);
    return () => clearTimeout(timeOutId);
  }, [word]);

  const onLookupWord = (word: string) => {
    console.log("Click roi");
    dispatch(
      lookUpWordMeaning({
        dict: "devi",
        lang: "vi",
        keyword: word
      })
    ).then((action: PayloadAction<WordSearchingResult>) => {
      const wordCount = action.payload.result[0]?.word.split(" ");
      if (
        action.payload.found &&
        action.payload.result[0]?.conjugation == null &&
        wordCount.length < 2
      ) {
        dispatch(lookUpWordConjugation(action.payload.result[0].word));
      }

      dispatch(openWordSheet());
    });
  };

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
          placeholder={`Nhập từ cần tìm vào đây`}
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
        maxHeight={500}
      >
        {dictionaryData.isFetchingData && word ? (
          <Spinner
            size="large"
            color="$orange10"
          />
        ) : (
          <YStack>
            {dictionaryData.suggestionWord?.data?.map((data, key) => {
              const wordSplit = data.split("#");
              return (
                <View key={key}>
                  <View
                    flexDirection={"row"}
                    alignItems="center"
                    minHeight={50}
                  >
                    <View flex={6}>
                      <Text
                        fontSize={30}
                        color={"orange"}
                      >
                        {`${wordSplit[0]} `}
                      </Text>
                      {wordSplit[1] ? (
                        <Text
                          fontSize={15}
                          color={"red"}
                        >{`[${wordSplit[1]}] `}</Text>
                      ) : (
                        <Text fontSize={15}>{``}</Text>
                      )}
                      {wordSplit[2] ? (
                        <Text fontSize={15}>{`${wordSplit[2]}`}</Text>
                      ) : (
                        <Text fontSize={15}>{``}</Text>
                      )}
                    </View>
                    <Button
                      flex={1}
                      color={"#ffffff"}
                      height={40}
                      onPress={() => {
                        onLookupWord(wordSplit[0]);
                      }}
                      icon={
                        <Search
                          size="$1"
                          backgroundColor={"white"}
                        />
                      }
                    />
                  </View>
                  <Divider />
                </View>
              );
            })}
          </YStack>
        )}
        <Text fontSize={15}>{``}</Text>
      </ScrollView>
    </YStack>
  );
}

{
  /* <ScrollView
        width={"100%"}
        backgroundColor={black}
        padding={"$3"}
        borderRadius={"$3"}
        borderColor={"#FFFFFF"}
        borderWidth={0.2}
        display={word ? "block" : "none"}
      >
        {dictionaryData.isLoading && word ? (
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
      </ScrollView> */
}
