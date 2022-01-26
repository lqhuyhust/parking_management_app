import React from "react";
import {Snackbar} from "react-native-paper";
import tw from "twrnc";
import {Text} from "react-native";

export default function LogoutToast({visible, setVisible}) {
  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      duration={1000}
      style={tw`bg-green-700`}
    >
      <Text style={tw`text-white font-bold`}>Logout Successfully!</Text>
    </Snackbar>
  )
}
