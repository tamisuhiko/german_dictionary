import { Pressable, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}
export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="lookup"
        options={({ navigation }): any => ({
          title: "Look Up",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="code"
              color={color}
            />
          ),
          headerRight: () => (
            <Link
              href="/modal"
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        })}
      />
      <Tabs.Screen
        name="setting"
        options={({ navigation }): any => ({
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="code"
              color={color}
            />
          ),
          headerRight: () => (
            <Link
              href="/modal"
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        })}
      />
    </Tabs>
  );
}
