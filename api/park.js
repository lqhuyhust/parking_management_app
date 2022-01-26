import {axiosInstance, privateRequester} from "./base";

export const getAllParks = () => {
  return axiosInstance.get(`/api/car-parks/`);
}

export const getPark = (id) => {
  return axiosInstance.get(`/api/car-parks/${id}`);
}

export const bookSlot = (parkId, time) => {
  const formData = new FormData();
  Object.keys(time).forEach(key => {
    formData.append(key, time[key])
  })
  return privateRequester.post(`/api/payments/checkout/${parkId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const getBookingSuccess = () => {
  return privateRequester.get(`/api/payments/success`);
}
