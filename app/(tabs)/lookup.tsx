import { Image } from "react-native";
import { H5, Input, Tabs, Text, View, YStack } from "tamagui";

import InputWordSearchComponent from "../../components/InputWordSearch";
import { MyStack } from "../../components/MyStack";

export default function LookupTab() {
  return (
    <View
      height={"100%"}
      display="flex"
      justifyContent="center"
    >
      <View
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <H5>Der, Die, Das</H5>
        <Image
          source={require("../../assets/avarta.gif")}
          style={{ height: 100 }}
          resizeMode="contain"
        />
      </View>
      <YStack
        alignItems="center"
        width={"100%"}
        paddingBottom="10%"
        flex={3}
      >
        <InputWordSearchComponent />
      </YStack>
      <View
        flex={1}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <H5>@liam bui - 2023</H5>
      </View>
    </View>
  );
}
