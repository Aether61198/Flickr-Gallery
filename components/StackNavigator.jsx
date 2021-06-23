import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";
import { HomeScreen } from "./HomeScreen";
import { IconButton } from "react-native-paper";

const Stack = createStackNavigator();

const headerOptions = (navigation) => {
  return {
    title: "Photos",
    headerStyle: {
      backgroundColor: `#0a95ff`,
    },
    headerTintColor: `#fff`,
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerLeft: () => (
      <IconButton
        icon="menu"
        color="#fff"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    ),
  };
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => headerOptions(navigation)}
      />
    </Stack.Navigator>
  );
};
