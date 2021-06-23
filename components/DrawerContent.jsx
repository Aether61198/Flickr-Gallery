import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";

const { height } = Dimensions.get("screen");

export const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section style={styles.drawerSection}>
        <Text style={styles.drawerHeading}>Menu</Text>
        <Drawer.Item
          icon="home"
          style={{ backgroundColor: "#0a95ff" }}
          label="Home"
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        />
        <Text style={styles.drawerSubtitle}>Made by - Nilay Saxena</Text>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerSection: {
    marginTop: 10,
  },
  drawerHeading: {
    marginHorizontal: 20,
    marginVertical: 10,
    color: `#0a95ff`,
  },
  drawerSubtitle: {
    textAlign: `center`,
    marginTop: height - 200,
    color: `#787878`,
  },
});
