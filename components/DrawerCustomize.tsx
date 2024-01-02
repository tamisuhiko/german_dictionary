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

export function DrawerRender() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContentCustomize {...props} />}
      screenOptions={{
        headerTitle: () => {
          return (
            <Image
              source={require("../assets/flag-germany.gif")}
              style={{ width: 50 }}
              resizeMode="contain"
            />
          );
        },
        headerRight: () => (
          <Button
            onPress={() => alert("This is a button!")}
            color="#fff"
          />
        )
      }}
    ></Drawer>
  );
}
export function DrawerContentCustomize(props: DrawerContentComponentProps) {
  const [focused, setfocus] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);

  const onNavigationPressed = (route: string, index: number) => {
    props.navigation.navigate(route);

    const newFocused = [...focused];
    for (let i = 0; i < newFocused.length; i++) {
      newFocused[i] = false;
    }
    newFocused[index] = true;
    setfocus(newFocused);
  };
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <H1>Chán</H1>
      </View>
      <DrawerItem
        label="Screen1"
        labelStyle={{ color: "#fbae41", fontSize: 10 }}
        focused={focused[0]}
        onPress={() => onNavigationPressed("lookup", 0)}
      />
      <DrawerItem
        label="Screen1"
        labelStyle={{ color: "#fbae41", fontSize: 10 }}
        focused={focused[1]}
        onPress={() => onNavigationPressed("setting", 1)}
      />
      <DrawerItem
        label="Screen1"
        labelStyle={{ color: "#fbae41", fontSize: 10 }}
        focused={focused[2]}
        onPress={() => onNavigationPressed("lookup", 2)}
      />
      {/* <DrawerItemList {...props} /> */}
    </DrawerContentScrollView>
  );
}
