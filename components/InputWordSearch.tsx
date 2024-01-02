import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Sun, X } from "@tamagui/lucide-icons";
import { green, greenA } from "@tamagui/themes";
import {
  Button,
  Input,
  ListItem,
  ScrollView,
  Spinner,
  Text,
  View,
  XStack,
  YGroup,
  YStack
} from "tamagui";

import { dictionaryDataSelector } from "../redux/selectors/selectors";
import dictionaryDataSlice, {
  fetchWordListDatabyWord
} from "../redux/slices/dictionaryDataSlice";
import { AppDispatch } from "../redux/store/store";
import { black, white, yellow } from "../utils/colors";

type IProps = {
  delay: number;
};

const defaultProps = {
  delay: 500
};

InputWordSearchComponent.defaultProps = defaultProps;

export default function InputWordSearchComponent(props: IProps) {
  const [word, setWord] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const dictionaryData = useSelector(dictionaryDataSelector);

  useEffect(() => {
    const timeOutId = setTimeout(
      () => dispatch(fetchWordListDatabyWord(word)),
      props.delay
    );
    return () => clearTimeout(timeOutId);
  }, [word]);

  return (
    <YStack
      alignItems="center"
      justifyContent="space-between"
      width={"90%"}
    >
      <XStack position="relative">
        {word ? (
          <Button
            position={"absolute"}
            right={5}
            top={10}
            color={"#ffffff"}
            zIndex={"1"}
            onPress={() => setWord("")}
            icon={
              <X
                size="$2"
                backgroundColor={"#ffffff"}
              />
            }
          />
        ) : (
          ""
        )}

        <Input
          width={"100%"}
          size={"$6"}
          placeholder={`Nhập từ cần tìm vào đây`}
          value={word}
          onChangeText={(data) => setWord(data)}
        />
      </XStack>

      <ScrollView
        width={"100%"}
        backgroundColor={black}
        padding={"$3"}
        borderRadius={"$3"}
        borderColor={"#FFFFFF"}
        borderWidth={0.2}
        display={word ? "block" : "none"}
      >
        {dictionaryData.isLoading && word ? (
          <Spinner
            size="large"
            color="$orange10"
          />
        ) : (
          <YStack>
            {dictionaryData.wordList?.suggestions?.map((data, key) => {
              return (
                <XStack
                  key={key}
                  width={"100%"}
                >
                  <Text
                    fontSize={30}
                    color={"#ddb100"}
                  >{`${data.data} | `}</Text>
                  <Text fontSize={30}>{`${data.value}`}</Text>
                </XStack>
              );
            })}
          </YStack>
        )}
      </ScrollView>
    </YStack>
  );
}
