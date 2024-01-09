import { useState } from "react";
import { View } from "react-native";
import { Image } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerHeaderProps,
  DrawerItem,
  DrawerItemList
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Button, H1, H6, Text } from "tamagui";

export function Divider() {
  return (
    <View
      style={{
        height: 0.5,
        margin: 10,
        backgroundColor: "white"
      }}
    ></View>
  );
}
