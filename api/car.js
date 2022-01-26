import {privateRequester} from "./base";

export const createCar = () => {
  return privateRequester.post(`/api/cars`);
}

export const getCar = (user) => {
  return privateRequester.get(`/api/cars/${user}`);
}

export const updateCar = (guest, id) => {
  return privateRequester.put(`/api/cars/${id}`, guest);
}

export const deleteCar = (id) => {
  return privateRequester.delete(`/api/cars/${id}`);
}
