import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { Image } from "react-native";
import { useDispatch } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerHeaderProps,
  DrawerItem,
  DrawerItemList
} from "@react-navigation/drawer";
import { Book, BookDown, Facebook, Plus } from "@tamagui/lucide-icons";
import { Drawer } from "expo-router/drawer";
import { Button, H1, H6, Text } from "tamagui";

import { setwordTranslation } from "../redux/slices/dictionaryDataSlice";
import { AppDispatch } from "../redux/store/store";

export function DrawerRender() {
  const [lang, setLang] = useState({
    lang: "vi",
    source: require("../assets/vietnam.png")
  });

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const switchLang = () => {
    if (lang.lang == "vi") {
      i18n.changeLanguage("en"); //change the language
      dispatch(setwordTranslation("en"));
      setLang({ ...lang, lang: "en", source: require("../assets/us.png") });
    } else {
      i18n.changeLanguage("vi");
      dispatch(setwordTranslation("vi"));
      setLang({
        ...lang,
        lang: "vi",
        source: require("../assets/vietnam.png")
      });
    }
  };
  return (
    <Drawer
      drawerContent={(props) => <DrawerContentCustomize {...props} />}
      screenOptions={{
        swipeEdgeWidth: 200,
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
          <Pressable onPress={switchLang}>
            <Image
              source={lang.source}
              style={{ width: 30 }}
              resizeMode="contain"
            />
          </Pressable>
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

  const { t, i18n } = useTranslation();

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
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollView}
    >
      <View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/funny.gif")}
            style={{ height: 150, width: 150 }}
            resizeMode="contain"
          />
        </View>
        <View>
          <DrawerItem
            label={() => (
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Book />
                <Text> {t("drawer_menu_quick_search")}</Text>
              </View>
            )}
            labelStyle={{ color: "#fbae41", fontSize: 15 }}
            focused={focused[0]}
            onPress={() => onNavigationPressed("lookup", 0)}
          />
          <DrawerItem
            label={() => (
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <BookDown />
                <Text>{t("drawer_menu_rules_of_enjoyment_search")}</Text>
              </View>
            )}
            labelStyle={{ color: "#fbae41", fontSize: 15 }}
            focused={focused[1]}
            onPress={() => onNavigationPressed("quick_lookup", 1)}
          />
        </View>
      </View>
      <View style={{ padding: 20, alignItems: "center" }}>
        <Button
          width={"100%"}
          icon={Facebook}
          onPress={() => {
            Linking.openURL("https://www.facebook.com/nhatlinh.216/");
          }}
        >
          @Tamisuhiko
        </Button>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: "space-between"
  }
});
