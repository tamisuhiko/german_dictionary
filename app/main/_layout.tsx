import { Pressable, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import {
  H5,
  Input,
  Separator,
  SizableText,
  Tabs,
  Text,
  View,
  YStack
} from "tamagui";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </>
  );
}
