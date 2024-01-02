import { Suspense, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { Button, H6, TamaguiProvider, Text, Theme } from "tamagui";

import {
  DrawerContentCustomize,
  DrawerRender
} from "../components/DrawerCustomize";
import { MySafeAreaView } from "../components/MySafeAreaView";
import store from "../redux/store/store";
import config from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf")
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync({
        // });

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hideAsync();
    }
  }, [appIsReady, loaded]);

  if (!appIsReady) return null;

  return (
    <Provider store={store}>
      <TamaguiProvider config={config}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Theme name={colorScheme}>
            <ThemeProvider
              value={colorScheme === "light" ? DefaultTheme : DarkTheme}
            >
              {/* <MySafeAreaView> */}
              <DrawerRender />
              {/* </MySafeAreaView> */}
            </ThemeProvider>
          </Theme>
        </Suspense>
      </TamaguiProvider>
    </Provider>
  );
}
