import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from "twrnc";
import {Field, Formik} from "formik";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import CustomInput from "../../components/CustomInput";
import {changePassword} from "../../api";
import {editSchema} from "./validation";

export default function ChangePasswordForm({userInfo: {username}, onSuccess}) {
  const handleSubmit = async (values) => {
    try {
      const res = await changePassword({username, ...values});
      if (res) onSuccess?.();
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <KeyboardAwareScrollView style={tw`w-full`}>
      <Formik
        validationSchema={editSchema}
        initialValues={{
          old_password: '',
          new_password: '',
          confirmPassword: '',
        }}
        onSubmit={values => handleSubmit(values)}
      >
        {({
            handleSubmit,
            isValid
          }) => (
          <View style={tw`flex w-full items-center`}>
            <Field
              component={CustomInput}
              name="old_password"
              placeholder="Current Password"
              secureTextEntry
            />
            <Field
              component={CustomInput}
              name="new_password"
              placeholder="New Password"
              secureTextEntry
            />
            <Field
              component={CustomInput}
              name="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
            />
            <TouchableOpacity
              style={tw`bg-green-700 text-lg w-10/12 h-12 px-2.5 my-1 rounded-lg flex items-center justify-center`}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={tw`uppercase text-xl text-white`}>Change</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  )
}
