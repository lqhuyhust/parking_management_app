import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppStack from './AppStack';
import {SafeAreaView} from "react-native";
import {Text} from "react-native-paper";
import {useAuth} from "../contexts/Auth";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {COLOR} from "../customThemes";

const Stack = createNativeStackNavigator();
export default function Router() {
  const {authData, loading} = useAuth();

  if (loading) {
    return <SafeAreaView><Text>Loading...</Text></SafeAreaView>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AppStack" component={AppStack} options={{
          headerShown: false
        }}/>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          {!authData?.token && <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>}
          <Stack.Screen name="Registration" component={Registration} options={{
            headerTitleStyle: {
              color: COLOR["GREEN.700"],
              fontWeight: 'bold',
            },
            headerTintColor: COLOR["GREEN.700"]
          }}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
