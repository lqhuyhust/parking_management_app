import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "../env";

export function getAxiosInstance(requiredAuth) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30 * 1000,
  });

  if (requiredAuth) {
    instance.interceptors.request.use(
      async config => {
        const jsonValue = await AsyncStorage.getItem('@auth_data');
        const value = JSON.parse(jsonValue);
        if (value?.token !== null) {
          config.headers = {
            ...config.headers,
            Authorization: `jwt ${value?.token}`,
          };
          return config;
        }
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }

  instance.interceptors.response.use(
    function (response) {
      return response.data;
    }
  );

  return instance;
}
