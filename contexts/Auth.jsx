import React, {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from "../api";
import {useVisibleStates} from "./VisibleStates";

const AuthContext = createContext({
  authData: {},
  loading: false,
  signIn: null,
  signOut: null
})

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState({});
  const [loading, setLoading] = useState(true);
  const {setLogoutToastVisible, setParkInfoVisible} = useVisibleStates();

  useEffect(() => {
    (async () => {
      try {
        const authDataSerialized = await AsyncStorage.getItem('@auth_data');
        if (authDataSerialized) {
          const _authData = JSON.parse(authDataSerialized);
          setAuthData(_authData);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async (data) => {
    const _authData = await login(data);
    console.log(_authData)
    setAuthData(_authData);
    AsyncStorage.setItem('@auth_data', JSON.stringify(_authData));
  };

  const signOut = async () => {
    setAuthData(undefined);
    await AsyncStorage.removeItem('@auth_data');
    setLogoutToastVisible?.(true);
    setParkInfoVisible?.(false);
  };

  return (
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext, AuthProvider, useAuth}
