import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { H5, Input, Separator, SizableText, Tabs, Text, YStack } from "tamagui";

import FamousQoute from "../../components/FamousQoute";
import InputWordSearchComponent from "../../components/InputWordSearch";
import { MyStack } from "../../components/MyStack";
import { WordSearchingResult } from "../../components/WordSearchingResult";
import WordSheet from "../../components/WordSheet";
import { WordSynonym } from "../../components/WordSynonym";
import { qouteDataSelector } from "../../redux/selectors/selectors";
import { fetchQouteData } from "../../redux/slices/qouteDataSlice";
import { AppDispatch } from "../../redux/store/store";

export default function LookupTab() {
  const { t, i18n } = useTranslation();

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <View>
        <FamousQoute />
        <InputWordSearchComponent />
      </View>

      <WordSheet />
    </View>
  );
}
