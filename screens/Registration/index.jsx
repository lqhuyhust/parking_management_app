import React from 'react'
import {Image, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import tw from "twrnc";
import {Field, Formik} from "formik";
import * as ImagePicker from 'expo-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {registrationValidationSchema} from "./validation";
import CustomInput from "../../components/CustomInput";
import {register} from "../../api";

export default function Registration({navigation}) {
  const handleSubmit = async (values) => {
    try {
      const res = await register(values)
      if (res) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <KeyboardAwareScrollView style={tw`w-full`}>
      <SafeAreaView style={tw`flex flex-col items-center justify-center py-10`}>
        <Formik
          validationSchema={registrationValidationSchema}
          initialValues={{
            first_name: 'binh',
            last_name: 'nguyen duc',
            username: 'binhnd',
            password: '1',
            confirmPassword: '1',
            email: 'abc@xyz.dot',
            phone: '0200002020',
          }}
          onSubmit={values => handleSubmit(values)}
        >
          {({
              handleSubmit,
              isValid
            }) => (
            <>
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
                name="username"
                placeholder="Username"
              />
              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              <Field
                component={CustomInput}
                name="confirmPassword"
                placeholder="Confirm Password"
                secureTextEntry
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
                <Text style={tw`uppercase text-xl text-white`}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </>)}
        </Formik>
      </SafeAreaView>
    </KeyboardAwareScrollView>);
}
