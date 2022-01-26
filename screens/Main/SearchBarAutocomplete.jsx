import React from "react";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {API_KEY} from "../../env";
import {Searchbar as SearchbarPaper} from "react-native-paper";
import tw from "twrnc";

export default function SearchBarAutocomplete({onPress}) {
  return (
    <GooglePlacesAutocomplete
      query={{
        key: API_KEY,
        language: 'en',
        components: 'country:vn',
      }}
      onPress={(data) => onPress(data)}
      textInputProps={{
        InputComp: SearchbarPaper,
        errorStyle: {color: 'red'},
      }}
      styles={{
        container: tw`absolute top-5 w-11/12`
      }}
    />
  )
}
