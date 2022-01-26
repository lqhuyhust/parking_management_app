import React from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  Text
} from 'react-native'
import tw from "twrnc";
import {useAuth} from "../../contexts/Auth";
import {Field, Formik} from "formik";
import {loginValidationSchema} from "./validation";
import CustomInput from "../../components/CustomInput";

export default function Login({navigation}) {
  const auth = useAuth();
  const handlePress = () => {
    navigation.navigate('Registration');
  }
  return (
    <SafeAreaView style={tw`flex flex-1 p-10 items-center justify-center w-full`}>
      <Formik
        validateOnMount={true}
        validationSchema={loginValidationSchema}
        initialValues={{username: 'guest5', password: '1'}}
        onSubmit={values => auth.signIn(values)}
      >
        {({handleSubmit, isValid}) => (
          <>
            <Field component={CustomInput} name="username" placeholder="Username" style={tw`w-full`}/>
            <Field component={CustomInput} name="password" placeholder="Password" style={tw`w-full`} secureTextEntry/>
            <TouchableOpacity
              style={tw`bg-green-700 text-lg w-full h-12 px-2.5 my-5 rounded-lg flex items-center justify-center`}
              onPress={handleSubmit}
              disable={!isValid}
            >
              <Text style={tw`uppercase text-lg text-white`}>Sign in</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <TouchableOpacity onPress={handlePress}>
        <Text style={tw``}>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

