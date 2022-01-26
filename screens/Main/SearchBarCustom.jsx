import React, {useState} from 'react'
import {Searchbar} from "react-native-paper";
import tw from "twrnc";
// import {geocoding} from "../../api/googleMap";

const mockData = {
  "hoan kiem": {
    "latitude": 21.030653,
    "longitude": 105.847130
  }
}

const SearchBarCustom = ({setMapRegion}) => {
  const [keyword, setKeyword] = useState('');
  const handle = async () => {
    // const {results: [result]} = await geocoding()
    // const {geometry: {location: {lat: latitude, lng: longitude}}} = result;
    // setMapRegion(prev => ({...prev, ...{latitude, longitude}}));
  }
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setKeyword}
      style={tw`absolute top-25 w-11/12`}
      onSubmitEditing={handle}
      onIconPress={handle}
    />
  )
}

export default SearchBarCustom;
