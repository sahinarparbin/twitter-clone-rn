import {StyleSheet, Text,TextInput, View } from "react-native";
import  {Ionicons} from "@expo/vector-icons"

export default function Index() {
  return (
    <View style={ styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TextInput placeholder="Email address" />
      <Ionicons name="logo-twitter" size={24} color="#007AFF" /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});