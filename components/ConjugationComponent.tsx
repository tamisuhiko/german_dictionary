import { View } from "react-native";
import { useSelector } from "react-redux";
import { ScrollView, Text, YStack } from "tamagui";

import { dictionaryDataSelector } from "../redux/selectors/selectors";

export default function ConjugationComponent() {
  const dictionaryData = useSelector(dictionaryDataSelector);
  if (dictionaryData.wordConjugationSearchingResult.length < 1) return "";

  return (
    <YStack>
      <Text backgroundColor={"green"}>INDIKATIV</Text>
      <ScrollView horizontal={true}>
        {dictionaryData.wordConjugationSearchingResult[0]?.content.indikativ.map(
          (data, index) => {
            return (
              <YStack
                key={index}
                padding={5}
              >
                <Text
                  style={{ fontSize: 20, textAlign: "center" }}
                  backgroundColor={"red"}
                >
                  {data.tense}
                </Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View>
                    {data.conjugation.map((data, index) => {
                      return (
                        <Text
                          key={index}
                          fontSize={20}
                          color={"orange"}
                        >
                          {" "}
                          {data.pr}
                        </Text>
                      );
                    })}
                  </View>
                  <View>
                    {data.conjugation.map((data, index) => {
                      if (!data.c[0].t1) return "";
                      return (
                        <Text
                          key={index}
                          paddingLeft={5}
                          fontSize={20}
                          color={"white"}
                        >
                          {" "}
                          {data.c[0].t1}
                        </Text>
                      );
                    })}
                  </View>
                  <View>
                    {data.conjugation.map((data, index) => {
                      return (
                        <Text
                          key={index}
                          paddingLeft={5}
                          fontSize={20}
                          color={"red"}
                        >
                          {" "}
                          {data.c[0].t2 + data.c[0].v}
                        </Text>
                      );
                    })}
                  </View>
                  <View>
                    {data.conjugation.map((data, index) => {
                      if (!data.c[0].t3) return "";
                      return (
                        <Text
                          fontSize={20}
                          color={"green"}
                          key={index}
                          paddingLeft={5}
                        >
                          {data.c[0].t3}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </YStack>
            );
          }
        )}
        <YStack></YStack>
      </ScrollView>

      <Text backgroundColor={"green"}>KONJUNKTIV I</Text>
      <ScrollView horizontal={true}>
        {dictionaryData.wordConjugationSearchingResult[0]?.content.konjunktiv_1.map(
          (data, index) => {
            return (
              <YStack
                key={index}
                padding={5}
              >
                <Text
                  style={{ fontSize: 20, textAlign: "center" }}
                  backgroundColor={"red"}
                >
                  {data.tense}
                </Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View>
                    {data.conjugation.map((data, index) => {
                      return (
                        <Text
                          key={index}
                          fontSize={20}
                          color={"orange"}
                        >
                          {" "}
                          {data.pr}
                        </Text>
                      );
                    })}
                  </View>
                  <View>
                    {data.conjugation.map((data, index) => {
                      if (!data.c[0].t1) return "";
                      return (
                        <Text
                          key={index}
                          paddingLeft={5}
                          fontSize={20}
                          color={"white"}
                        >
                          {" "}
                          {data.c[0].t1}
                        </Text>
                      );
                    })}
                  </View>
                  <View>
                    {data.conjugation.map((data, index) => {
                      return (
                        <Text
                          key={index}
                          paddingLeft={5}
                          fontSize={20}
                          color={"red"}
                        >
                          {" "}
                          {data.c[0].t2 + data.c[0].v}
                        </Text>
                      );
                    })}
                  </View>
                  <View>
                    {data.conjugation.map((data, index) => {
                      if (!data.c[0].t3) return "";
                      return (
                        <Text
                          fontSize={20}
                          color={"green"}
                          key={index}
                          paddingLeft={5}
                        >
                          {data.c[0].t3}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </YStack>
            );
          }
        )}
        <YStack></YStack>
      </ScrollView>

      <Text backgroundColor={"green"}>KONJUNKTIV II</Text>
      <ScrollView horizontal={true}>
        {dictionaryData.wordConjugationSearchingResult[0]?.content.konjunktiv_2.map(
          (data, index) => {
            return (
              <YStack
                key={index}
                padding={5}
              >
                <Text
                  style={{ fontSize: 20, textAlign: "center" }}
                  backgroundColor={"red"}
                >
                  {data.tense}
                </Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View>
                    {data.conjugation.map((data, index) => {
                      return (
                        <Text
                          key={index}
                          fontSize={20}
                          color={"orange"}
                        >
                          {" "}
                          {data.pr}
                        </Text>
                      );
                    })}
                  </View>
                  <View>
                    {data.conjugation.map((data, index) => {
                      if (!data.c[0].t1) return "";
                      return (
                        <Text
                          key={index}
                          paddingLeft={5}
                          fontSize={20}
                          color={"white"}
                        >
                          {" "}
                          {data.c[0].t1}
                        </Text>
                      );
                    })}
                  </View>
                  <View>
                    {data.conjugation.map((data, index) => {
                      return (
                        <Text
                          key={index}
                          paddingLeft={5}
                          fontSize={20}
                          color={"red"}
                        >
                          {" "}
                          {data.c[0].t2 + data.c[0].v}
                        </Text>
                      );
                    })}
                  </View>
                  <View>
                    {data.conjugation.map((data, index) => {
                      if (!data.c[0].t3) return "";
                      return (
                        <Text
                          fontSize={20}
                          color={"green"}
                          key={index}
                          paddingLeft={5}
                        >
                          {data.c[0].t3}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </YStack>
            );
          }
        )}
        <YStack></YStack>
      </ScrollView>
    </YStack>
  );
}
