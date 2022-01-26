import {privateRequester} from "./base";

export const getGuestInfo = (username) => {
  return privateRequester.get(`/api/users/guests/${username}`);
}

export const updateGuest = ({license, id, username, ...rest}) => {
  const formData = new FormData();
  Object.keys(rest).forEach(key => {
    formData.append(key, rest[key])
  })
  return privateRequester.put(`/api/users/guests/${username}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
