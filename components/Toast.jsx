import React from "react";
import {Snackbar} from "react-native-paper";
import tw from "twrnc";
import {Text} from "react-native";

export default function Toast(
  {
    visible,
    setVisible, 
    style, 
    styleContent, 
    content
  }) {
  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      duration={1000}
      style={tw.style('bg-green-700', style)}
    >
      <Text style={tw.style('text-white font-bold', styleContent)}>{content}</Text>
    </Snackbar>
  );
}
