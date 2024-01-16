import { useEffect, useState } from "react";
import { View } from "react-native";
import { Image } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
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
import {
  searchWordbyImages,
  WordDictationary
} from "../redux/slices/dictionaryDataSlice";
import { AppDispatch } from "../redux/store/store";

import { Divider } from "./Divider";

export function ImageSearchResult() {
  const dictionaryData = useSelector(dictionaryDataSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    //dispatch(searchWordbyImages(dictionaryData.wordSearchingResult.key));
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <WebView
        style={{ width: "100%", height: 500 }}
        source={{
          uri: `https://www.google.com/search?q=${
            dictionaryData.wordSearchingResult.key + " in German"
          }&tbm=isch`
        }}
      />
    </View>
  );
}
