import React from "react";
import {Button, Title} from "react-native-paper";
import {Text, View} from "react-native";
import tw from "twrnc";
import {FontAwesome, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";


const ParkInfo = ({data: {id, name, location, available_number}, onPressBookBtn}) => {
  const handleBook = () => {
    onPressBookBtn(true)
  }
  return (
    <View style={tw`pb-5`}>
      <Title style={tw`text-green-700`}>{name}</Title>
      <View style={tw`flex flex-row my-2 items-center`}>
        <Ionicons name="location" size={24} color="black" style={tw`mr-2`}/>
        <Text>{location}</Text>
      </View>
     
      {available_number ? (
        <View style={tw`flex flex-row my-2 items-center`}>
          <FontAwesome name="ticket" size={24} color="black" style={tw`mr-2`}/>
          <Text style={tw`font-bold text-black`}>{available_number}</Text>
          <Text> available slots.</Text>
        </View>
      ) : (
        <View style={tw`flex flex-row my-2 items-center`}>
          <FontAwesome name="ticket" size={24} color="red" style={tw`mr-2`}/>
          <Text style={tw`text-red-500 font-bold`}>Not Enough Slots</Text>
        </View>
      )}
      <Button disabled={!available_number} icon="credit-card-outline" mode="contained" onPress={handleBook}>
        Book
      </Button>
      {/*<View style={tw`flex flex-row my-2 justify-center w-full py-5`}>*/}
      {/*  <View style={tw`w-5`}/>*/}
      {/*  <Button icon="bookmark" mode="outlined">*/}
      {/*    Follow*/}
      {/*  </Button>*/}
      {/*</View>*/}
    </View>
  )
}

export default ParkInfo;
