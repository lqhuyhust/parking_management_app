import {axiosInstance} from "./base";
import {API_KEY, GOOGLE_MAP_URL} from "../env";


export const getAddressByPlaceId = (placeId) => {
  return axiosInstance.get(`${GOOGLE_MAP_URL}/api/geocode/json?place_id=${placeId}&key=${API_KEY}`);
}
