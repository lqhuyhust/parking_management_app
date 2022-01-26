import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from "twrnc";
import {Field, Formik} from "formik";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import CustomInput from "../../components/CustomInput";
import {updateGuest} from "../../api";
import {editSchema} from "./validation";

export default function EditForm({userInfo, onSuccess}) {
  const handleSubmit = async (values) => {
    const res = await updateGuest(values);
    if (res) onSuccess?.();
  }
  return (
    <KeyboardAwareScrollView style={tw`w-full`}>
      <Formik
        validationSchema={editSchema}
        initialValues={userInfo}
        onSubmit={values => handleSubmit(values)}
      >
        {({
            handleSubmit,
            isValid
          }) => (
          <View style={tw`flex w-full items-center`}>
            <Field
              component={CustomInput}
              name="first_name"
              placeholder="First Name"
            />
            <Field
              component={CustomInput}
              name="last_name"
              placeholder="Last Name"
            />
            <Field
              component={CustomInput}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
            />
            <Field
              component={CustomInput}
              name="phone"
              placeholder="Phone"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={tw`bg-green-700 text-lg w-10/12 h-12 px-2.5 my-1 rounded-lg flex items-center justify-center`}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={tw`uppercase text-xl text-white`}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  )
}
