import React from 'react';
import {Text, Title} from "react-native-paper";
import tw from "twrnc";
import {View} from "react-native";

export default function Notification() {
  return (
    <View style={tw`flex flex-1 items-center`}>
      <View style={tw`flex justify-center items-center`}>
        <Title>Notification List</Title>
        <View style={tw`w-full`}>
          <View style={tw`flex flex-row`}>
            <Text>From: </Text>
            <Text>xxx</Text>
          </View>
          <View style={tw`flex flex-row`}>
            <Text>Content: </Text>
            <Text>xxx</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
