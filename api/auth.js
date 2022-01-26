import {axiosInstance, privateRequester} from "./base";

export const register = ({license, car_registration, ...rest}) => {
  const formData = new FormData();
  Object.keys(rest).forEach(key => {
    formData.append(key, rest[key])
  })
  return axiosInstance.post('/api/users/guests/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const login = (user) => {
  return axiosInstance.post('/api/auth/login', user);
}

export const changePassword = ({username, ...rest}) => {
  return privateRequester.put(`/api/auth/change-password/${username}`, rest);
}
