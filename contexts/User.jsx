import React, {createContext, useContext, useState} from "react";

const UserDataContext = createContext({
  userData : {},
  setUserData: undefined,
  parkingBook: {
    message: '',
    status: 404,
    data: {
      user: '',
      car_park: '',
      parking_slot: ''
    }
  },
  setParkingBook: undefined
})

const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
}

const UserDataProvider = ({children}) => {
  const [userData, setUserData] = useState();
  const [parkingBook, setParkingBook] = useState();

  return (
    <UserDataContext.Provider value={{
      userData, setUserData,
      parkingBook, setParkingBook
    }}>
      {children}
    </UserDataContext.Provider>
  );
}

export {UserDataContext, UserDataProvider, useUserDataContext}
