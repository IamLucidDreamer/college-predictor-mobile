import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const Blogs = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 10 }}>
            {testArray.map((val, index) => (
              <Post index={index} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Blogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb",
    paddingTop: 20,
    paddingBottom: 80,
  },
  post: {
    borderWidth: 1.2,
    borderColor: "#dfe4ea",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginVertical: 12,
    elevation: 3,
    paddingBottom: 10,
  },
  postHeader: { padding: 6, flexDirection: "row", alignItems: "center" },
  postContentImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
  interactionBar: {
    backgroundColor: "#fafafa",
    height: 40,
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  interactionText: {
    color: "#000",
    marginLeft: 4,
  },
  interactionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
});

const Post = ({ index }) => {
  return (
    <View>
      <View style={styles.post}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 100 }}
            source={{
              // uri: images[index]?.download_url,
              uri: `https://picsum.photos/500/500?random=${index + 12}`,
            }}
          />
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Text style={{ fontFamily: "NSBold", fontSize: 18 }}>
              How to prepare for the CUCET
            </Text>
            <Text style={{ fontFamily: "NSRegular" }}>Nikhil Sachan</Text>
          </View>
        </View>
        {/* Post Content */}
        <View style={{ paddingHorizontal: 6 }}>
          {/* Post Content Text */}
          <Text style={{ fontFamily: "NSLight" }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem.
          </Text>
          {/* Post Content Image */}
          <Image
            style={styles.postContentImage}
            source={{
              // uri: images[index]?.download_url,
              uri: `https://picsum.photos/500/500?random=${index}`,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
