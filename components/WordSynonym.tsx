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

export function WordSynonym() {
  const dictionaryData = useSelector(dictionaryDataSelector);
  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={{ width: "100%" }}>
        <YStack>
          <Text>Từ đồng nghĩa</Text>
          {dictionaryData.wordSearchingResult.result[0].snym[0].content[0].syno.map(
            (data, key) => {
              return <Text key={key}>{data}</Text>;
            }
          )}
        </YStack>
      </View>
    </ScrollView>
  );
}
