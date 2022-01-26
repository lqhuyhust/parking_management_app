import React from 'react';
import {Divider, Text} from "react-native-paper";
import {Image, SafeAreaView, StyleSheet, View} from "react-native";
import tw from 'twrnc';
import {BASE_URL} from "../../env";
import moment from "moment";

const Section = ({title, description}) =>
  (
    <View style={tw`py-2`}>
      <Text style={tw`text-lg font-bold text-green-700`}>
        {title}
      </Text>
      <Text>
        {description}
      </Text>
    </View>
  )
export default function BookingResult({route}) {
  const {car_park, parking_slot, time_start, time_end, fee, qr_code} = route.params;
  return (
    <SafeAreaView style={tw`w-4/5 mt-8 mx-auto`}>
      <View style={tw`flex flex-row justify-between mb-12`}>
        <View>
          <Section title="Car park" description={car_park}/>
          <Section title="Parking slot" description={parking_slot}/>
          <Section title="Fee" description={fee}/>
        </View>
        <Divider/>
        <View>
          <Section title="Time start" description={moment(time_start).calendar()}/>
          <Section title="Time end" description={moment(time_end).calendar()}/>
        </View>
      </View>
      <Image style={styles.image} source={{uri: `${BASE_URL}${qr_code}`}}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})
