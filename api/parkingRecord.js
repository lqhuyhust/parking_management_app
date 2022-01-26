import {privateRequester} from "./base";

export const createParkingRecord = () => {
  return privateRequester.post(`/api/parkings`);
}

export const getAllParkingRecords = (username) => {
  return privateRequester.get(`/api/parkings/${username}`);
}

export const updateParkingRecord = (guest, id) => {
  return privateRequester.put(`/api/parkings/${id}`, guest);
}

export const deleteParkingRecord = (id) => {
  return privateRequester.delete(`/api/parkings/${id}`);
}
