import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Github, Twitter } from "@tamagui/lucide-icons";
import { Link, Redirect, useRouter } from "expo-router";
import { Tabs } from "expo-router/tabs";
import {
  Button,
  H1,
  ListItem,
  Paragraph,
  Separator,
  YGroup,
  YStack
} from "tamagui";

import { MyStack } from "../components/MyStack";
import { fetchQouteData } from "../redux/slices/qouteDataSlice";
import { AppDispatch } from "../redux/store/store";

export default function Home() {
  const router = useRouter();

  return <Redirect href="/main/lookup" />;
}
