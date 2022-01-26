import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import ParkInfo from "./ParkInfo";
import tw from "twrnc";
import {COLOR, mapTheme} from '../../customThemes'
import {FontAwesome5} from '@expo/vector-icons';
import {Modal, Portal} from "react-native-paper";
import {SafeAreaView, ScrollView} from 'react-native';
import {getAddressByPlaceId} from "../../api/googleMap";
import {getAllParks, getPark} from "../../api";
import SearchBarAutocomplete from "./SearchBarAutocomplete";
import NotAuth from "./NotAuth";
import {useAuth} from "../../contexts/Auth";
import Toast from '../../components/Toast';
import {useVisibleStates} from "../../contexts/VisibleStates";
import {RADIUS} from "../../env";
import BookingDetail from "./BookingDetail";

export default function Main({navigation}) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 20.99113375635362,
    longitude: 105.8376637242683,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [searchResult, setSearchResult] = useState({});
  const [parks, setParks] = useState([])
  const [park, setPark] = useState({})
  const {
    bookingModalVisible, setBookingModalVisible,
    parkInfoVisible, setParkInfoVisible,
    logoutToastVisible, setLogoutToastVisible
  } = useVisibleStates();

  const {authData} = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllParks();
        setParks(data)
      } catch (error) {
        console.log(error)
      }
    })();
  }, [])

  const onRegionChange = (region) => {
    setMapRegion(region);
  }

  const handlePressPark = (data) => {
    getPark(data.id).then(res => {
      setPark({...res, id: data.id});
      setParkInfoVisible?.(true);
    })
  }
  const handleHidden = () => {
    setParkInfoVisible?.(false);
  }
  const handleSearch = async ({place_id}) => {
    const {results: [result]} = await getAddressByPlaceId(place_id);
    const {geometry: {location: {lat: latitude, lng: longitude}}} = result;
    setSearchResult({...mapRegion, latitude, longitude});
    setMapRegion({...mapRegion, latitude, longitude});
  }

  const handleFollow = () => {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={tw`flex w-full items-center`}>
      <MapView
        style={{alignSelf: 'stretch', height: '100%'}}
        region={mapRegion}
        onRegionChangeComplete={onRegionChange}
        customMapStyle={mapTheme}
        onPress={handleHidden}
      >
        {!!Object.keys(searchResult).length &&
          <>
            <Marker coordinate={searchResult}/>
            <MapView.Circle
              center={searchResult}
              radius={RADIUS}
              strokeColor={COLOR["GREEN.700"]}
              fillColor={'rgba(230,238,255,0.5)'}
            />
          </>
        }
        {/*<MapView.Circle*/}
        {/*  center={mapRegion}*/}
        {/*  radius={RADIUS}*/}
        {/*  strokeColor={COLOR["GREEN.700"]}*/}
        {/*  fillColor={'rgba(230,238,255,0.5)'}*/}
        {/*/>*/}
        {
          parks.length > 0 && parks.map((e, i) => (
            <Marker
              key={i}
              coordinate={{longitude: e.longitude, latitude: e.latitude}}
              onPress={() => handlePressPark(e)}
            >
              <FontAwesome5 name="parking" size={34} color={e?.available_number ? COLOR["GREEN.700"] : 'red'}/>
            </Marker>
          ))
        }
      </MapView>

      <SearchBarAutocomplete onPress={handleSearch}/>
      <ScrollView style={tw.style('bottom-0 p-5 h-56 w-full bg-white', parkInfoVisible ? 'absolute' : 'hidden')}>
        <ParkInfo data={park} onPressBookBtn={setBookingModalVisible} onPressFollow={handleFollow}/>
      </ScrollView>
      <Portal>
        <Modal
          contentContainerStyle={tw`bg-white w-10/12 py-10 px-5 m-auto`}
          visible={bookingModalVisible}
          onDismiss={() => setBookingModalVisible?.(false)}
        >
          {
          authData?.token ?
          <BookingDetail navigation={navigation} data={park} setVisible={() => setBookingModalVisible?.(false)}/> :
          <NotAuth navigation={navigation} setModalVisible={setBookingModalVisible}/>
          }
        </Modal>
      </Portal>
      <Toast visible={logoutToastVisible} setVisible={setLogoutToastVisible} content="Logout successfully!"/>
    </SafeAreaView>
  );
};
