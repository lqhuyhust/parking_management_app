import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from "twrnc";
import {Button, Text} from "react-native-paper";
import {bookSlot} from "../../api";
import moment from 'moment';

const formatDate = (date) => moment(date).format('YYYY-MM-DD hh:mm:ss') + '+0700';

export default function BookingDetail({data, navigation, setVisible}) {
  const [dateIn, setDateIn] = useState(new Date());
  const [dateOut, setDateOut] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [valueMode, setValueMode] = useState('in');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateIn || dateOut;
    setShow(Platform.OS === 'ios');
    valueMode === 'in' ?
      setDateIn(currentDate) : setDateOut(currentDate)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = (mode) => {
    mode === 'in' ? setValueMode('in') : setValueMode('out');
    showMode('date');
  };

  const showTimepicker = (mode) => {
    mode === 'in' ? setValueMode('in') : setValueMode('out');
    showMode('time');
  };

  const handleBook = async () => {
    try {
      const res = await bookSlot(data?.id, {time_start: formatDate(dateIn), time_end: formatDate(dateOut)})
      if (res?.code === 3) {
        navigation.navigate('Payment', {
          parkId: data?.id,
          sessionId: res.session_id,
          stripePublicKey: res.stripe_public_key,
        })
        setVisible();
      } else {
        alert(res?.message);
      }
    } catch (e){
      console.log(e)
    }
  }
  return (
    <View>
      <Text style={tw`text-xl font-bold uppercase text-green-700 mx-auto mb-8`}>Pick time</Text>
      <View>
        <View style={tw`flex flex-row items-center justify-start`}>
          <Button mode="contained" onPress={() => showDatepicker('in')}>
          Date In
          </Button>
          <Text style={tw`ml-4`}>
            From Date: {dateIn.toDateString()}
          </Text>
        </View>
        <View style={tw`flex flex-row items-center justify-start mt-2`}>
          <Button mode="contained" onPress={() => showTimepicker('in')}>
          Time In
          </Button>
          <Text style={tw`ml-4`}>
            From Time: {dateIn.toLocaleTimeString()}
          </Text>
        </View>
      </View>
      <View style={tw`mt-6`}>
        <View style={tw`flex flex-row items-center justify-start`}>
          <Button mode="contained" onPress={() => showDatepicker('out')}>
          Date Out
          </Button>
          <Text style={tw`ml-4`}>
            To Date: {dateOut.toDateString()}
          </Text>
        </View>
        <View style={tw`flex flex-row items-center justify-start mt-2`}>
          <Button mode="contained" onPress={() => showTimepicker('out')}>
          Time Out
          </Button>
          <Text style={tw`ml-4`}>
            To Time: {dateOut.toLocaleTimeString()}
          </Text>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={valueMode === 'in' ? dateIn : dateOut}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          />
      )}
      <Button style={tw`flex flex-col mt-8 mx-auto`} icon="credit-card-outline" mode="outlined" onPress={handleBook}>
      Pay
      </Button>
    </View>
  );
};
