import React from "react";
import {TextInput} from "react-native-paper";
import tw from "twrnc";
import {Text} from "react-native";

export default function CustomInput(
  {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    style,
    ...inputProps
  }
) {
  const hasError = errors[name] && touched[name]

  return (
    <>
      <TextInput
        style={tw.style('text-lg w-10/12 h-12 px-2.5 my-1 rounded-lg', hasError && 'border border-red-700', style)}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={tw`text-red-700`}>{errors[name]}</Text>}
    </>
  )
}
