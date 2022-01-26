import tw from "twrnc";
import {View} from "react-native";
import {Button} from "react-native-paper";
import React from "react";

export default function NotAuth({navigation, setModalVisible}) {
  const handleLogin = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  }
  const handleSignup = () => {
    setModalVisible(false);
    navigation.navigate('Registration');
  }
  return (
    <View style={tw`flex justify-center items-center`}>
      <View style={tw`flex flex-row my-2 items-center`}>
        <Button icon="credit-card-outline" mode="outlined" onPress={handleLogin}>
          Login
        </Button>
        <View style={tw`w-5`}/>
        <Button icon="bookmark" mode="outlined" onPress={handleSignup}>
          Sign Up
        </Button>
      </View>
    </View>
  )
}
