import { View } from "react-native";
import { H5, Tabs, Text } from "tamagui";

import FamousQoute from "../../components/FamousQoute";
import { MyStack } from "../../components/MyStack";
import RulesofEnjoymentSearch from "../../components/RulesofEnjoymentSearch";

export default function SettingTab() {
  return (
    <View>
      <FamousQoute />
      <RulesofEnjoymentSearch />
    </View>
  );
}
