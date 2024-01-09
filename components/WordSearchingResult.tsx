import { useEffect, useState } from "react";
import { View } from "react-native";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerHeaderProps,
  DrawerItem,
  DrawerItemList
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Button, H1, H6, ScrollView, Text, XStack, YStack } from "tamagui";

import { dictionaryDataSelector } from "../redux/selectors/selectors";
import { WordDictationary } from "../redux/slices/dictionaryDataSlice";

import { Divider } from "./Divider";

export function WordSearchingResult() {
  const dictionaryData = useSelector(dictionaryDataSelector);
  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={{ width: "100%" }}>
        <YStack>
          <WordSearchingHeader {...dictionaryData} />
          <WordSearchingBody {...dictionaryData} />
          <WordSearchingFooter {...dictionaryData} />
        </YStack>
      </View>
    </ScrollView>
  );
}

function WordSearchingHeader(props: WordDictationary) {
  if (!props.wordSearchingResult?.result[0].conjugation) return "";
  return (
    <YStack>
      <XStack>
        <Text
          backgroundColor={"orange"}
          fontSize={20}
        >
          Giống:
        </Text>
        <Text
          backgroundColor={"red"}
          fontSize={20}
        >
          {props.wordSearchingResult?.result[0].conjugation?.gt.w}
        </Text>
      </XStack>
      <XStack>
        <Text
          backgroundColor={"orange"}
          fontSize={20}
        >
          Số nhiều:
        </Text>
        <Text
          backgroundColor={"red"}
          fontSize={20}
        >
          {props.wordSearchingResult?.result[0].conjugation?.si.w}
        </Text>
      </XStack>
      <XStack>
        <Text
          backgroundColor={"orange"}
          fontSize={20}
        >
          Sở hữu cách số ít:
        </Text>
        <Text
          backgroundColor={"red"}
          fontSize={20}
        >
          {props.wordSearchingResult?.result[0].conjugation?.sn.w}
        </Text>
      </XStack>
      <Divider />
    </YStack>
  );
}

function WordSearchingBody(props: WordDictationary) {
  if (!props.wordSearchingResult?.result) return "";
  return (
    <YStack>
      <Text
        backgroundColor={"green"}
        textTransform="uppercase"
        fontSize={20}
      >{`${props.wordSearchingResult?.result[0].content[0].kind} `}</Text>
      {props.wordSearchingResult?.result[0].content[0].means.map(
        (data, index) => {
          return (
            <View key={index}>
              <XStack backgroundColor={"red"}>
                <Text>{`${index + 1}. `}</Text>
                <Text>{data.mean}</Text>
              </XStack>
              {data.examples[0]?.e ? (
                <Text color={"orange"}>{`${data.examples[0]?.e}`}</Text>
              ) : (
                ""
              )}
              {data.examples[0]?.m ? (
                <Text>{`${data.examples[0]?.m}`}</Text>
              ) : (
                ""
              )}
            </View>
          );
        }
      )}
      <Divider />
    </YStack>
  );
}

function WordSearchingFooter(props: WordDictationary) {
  if (props.wordConjugationSearchingResult.length < 1) return "";

  return (
    <YStack>
      <Text
        backgroundColor={"green"}
        textTransform="uppercase"
        fontSize={20}
      >
        Synonym
      </Text>
      {props.wordSearchingResult.result[0].snym[0].content[0].syno.map(
        (data, key) => {
          return (
            <Text
              key={key}
              fontSize={20}
            >
              {data}
            </Text>
          );
        }
      )}
      <Text
        backgroundColor={"green"}
        textTransform="uppercase"
        fontSize={20}
      >
        Related
      </Text>
      <Text fontSize={20}>{props.wordSearchingResult.result[0].keyword}</Text>
    </YStack>
  );
}
