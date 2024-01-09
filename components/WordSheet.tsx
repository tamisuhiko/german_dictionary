import { useDispatch, useSelector } from "react-redux";
import { Separator, Sheet, SizableText, Tabs, Text, View } from "tamagui";

import { dictionaryDataSelector } from "../redux/selectors/selectors";
import { closeWordSheet } from "../redux/slices/dictionaryDataSlice";
import { AppDispatch } from "../redux/store/store";

import ConjugationComponent from "./ConjugationComponent";
import { WordSearchingResult } from "./WordSearchingResult";
import { WordSynonym } from "./WordSynonym";

type IProps = {
  isOpen: boolean;
};

const defaultProps = {
  isOpen: false
} as IProps;

WordSheet.defaultProps = defaultProps;

export default function WordSheet() {
  const dispatch = useDispatch<AppDispatch>();
  const dictionaryData = useSelector(dictionaryDataSelector);
  if (!dictionaryData.wordSearchingResult?.found) return "";
  return (
    <Sheet
      open={dictionaryData.isOpenWordSheet}
      onOpenChange={(open) => {
        dispatch(closeWordSheet());
      }}
      zIndex={100_000}
      disableDrag={true}
      modal={true}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <View height={"100%"}>
          <TabNagivation />
        </View>
      </Sheet.Frame>
    </Sheet>
  );
}

const TabNagivation = () => {
  return (
    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      width={"100%"}
      height={"100%"}
      borderWidth="$0.25"
      borderColor="$borderColor"
    >
      <Tabs.List
        separator={<Separator vertical />}
        disablePassBorderRadius="bottom"
        aria-label="Manage your account"
      >
        <Tabs.Tab
          flex={1}
          value="tab1"
        >
          <SizableText fontFamily="$body">Từ vựng</SizableText>
        </Tabs.Tab>

        <Tabs.Tab
          flex={1}
          value="tab2"
        >
          <SizableText fontFamily="$body"> Conjugation</SizableText>
        </Tabs.Tab>
        <Tabs.Tab
          flex={1}
          value="tab3"
        >
          <SizableText fontFamily="$body">Hình ảnh</SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator />
      <TabsContent value="tab1">
        <WordSearchingResult />
      </TabsContent>

      <TabsContent value="tab2">
        <ConjugationComponent />
      </TabsContent>

      <TabsContent value="tab3">
        <Text>Notifications</Text>
      </TabsContent>
    </Tabs>
  );
};

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="$background"
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={1}
      borderColor="$background"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}
    >
      {props.children}
    </Tabs.Content>
  );
};
