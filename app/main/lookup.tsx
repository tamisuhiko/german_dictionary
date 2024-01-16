import { Image, View } from "react-native";
import { H5, Input, Separator, SizableText, Tabs, Text, YStack } from "tamagui";

import InputWordSearchComponent from "../../components/InputWordSearch";
import { MyStack } from "../../components/MyStack";
import { WordSearchingResult } from "../../components/WordSearchingResult";
import WordSheet from "../../components/WordSheet";
import { WordSynonym } from "../../components/WordSynonym";

export default function LookupTab() {
  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <View>
        <InputWordSearchComponent />
      </View>

      <WordSheet />
    </View>
  );
}
