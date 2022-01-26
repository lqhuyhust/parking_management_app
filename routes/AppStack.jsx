import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {COLOR} from "../customThemes";
import Main from "../screens/Main";
import UserProfile from "../screens/UserProfile";
import {useAuth} from "../contexts/Auth";
import Payment from "../screens/Payment";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import BookingResult from "../screens/BookingResult";

const Tab = createBottomTabNavigator();
export default function AppStack() {
  const {authData} = useAuth();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Main') {
            return <FontAwesome
              name={focused ? 'map' : 'map-o'}
              size={24}
              color={COLOR["GREEN.700"]}/>
          }
          if (route.name === 'User Profile') {
            return <FontAwesome
              name={focused ? 'user' : 'user-o'}
              size={24}
              color={COLOR["GREEN.700"]}/>
          }
          if (route.name === 'Payment') {
            return <Ionicons
              name={focused ? 'ios-notifications-sharp' : 'ios-notifications-outline'}
              size={24}
              color={COLOR["GREEN.700"]}/>
          }
        },
        tabBarActiveTintColor: COLOR["GREEN.700"],
        tabBarInactiveTintColor: COLOR["GREEN.700"]
      })}
    >
      <Tab.Screen name="Main" component={MainRouter}/>
      {authData?.token && <Tab.Screen name="User Profile" component={UserRouter}/>}
    </Tab.Navigator>
  );
}

const MainStack = createNativeStackNavigator()

const MainRouter = () => {
  const {authData} = useAuth();
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Main Stack" component={Main} options={{headerShown: false}}/>
      {authData?.token && <MainStack.Screen
        name="Payment"
        component={Payment}
        options={headerOptions}
      />}
    </MainStack.Navigator>
  )
}
const UserStack = createNativeStackNavigator()

const UserRouter = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="User Stack" component={UserProfile} options={{headerShown: false}}/>
      <UserStack.Screen
        name="Booking Result"
        component={BookingResult}
        options={headerOptions}
      />
    </UserStack.Navigator>
  )
}

const headerOptions = {
  headerTitleStyle: {
    color: COLOR["GREEN.700"],
    fontWeight: 'bold',
  },
  headerTintColor: COLOR["GREEN.700"]
}
