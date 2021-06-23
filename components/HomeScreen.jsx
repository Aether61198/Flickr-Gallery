import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const { width } = Dimensions.get("screen");

const API_URL = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`;

const fetchImagesFromFlickr = async () => {
  const data = await fetch(API_URL);
  const results = await data.json();
  return results;
};

const cacheImages = (images) => {
  var downloadedImages = [""];
  for (const [key, value] of Object.entries(images)) {
    FileSystem.downloadAsync(
      value.url_s,
      FileSystem.documentDirectory + value.id + ".jpg"
    )
      .then(({ uri }) => downloadedImages.push(uri))
      .catch((error) => {
        console.error(error);
      });
  }
  return downloadedImages;
};

const storeLinks = async (image) => {
  try {
    const jsonValue = JSON.stringify(image);
    await AsyncStorage.setItem("@links", jsonValue);
  } catch (e) {
    console.log(e);
  }
  console.log("Done");
};

const getLinks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@links");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
  console.log("Done.");
};

export const HomeScreen = ({ navigation }) => {
  const [images, setImages] = useState(null);
  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const image = await fetchImagesFromFlickr();
      storeLinks(image.photos.photo);
      let storedImages = await getLinks();
      setImages(storedImages);
    };
    fetchImages();
  }, []);

  if (!images) {
    return <Text>Loading...</Text>;
  }

  const downloadedImages = cacheImages(images);
  console.log(downloadedImages);

  return (
    <View style={styles.container}>
      <FlatList
        data={downloadedImages}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <View>
              <Image source={{ uri: item }} style={styles.imagesWrapper} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
  },
  imagesWrapper: {
    width: width / 2 - 12,
    height: width / 2 - 12,
    margin: 4,
    borderRadius: 10,
  },
});
