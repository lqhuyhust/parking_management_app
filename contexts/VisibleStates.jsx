import React, {createContext, useContext, useState} from "react";

const VisibleStatesContext = createContext({
  bookingModalVisible: false,
  parkInfoVisible: false,
  logoutToastVisible: false,
  setBookingModalVisible: undefined,
  setParkInfoVisible: undefined,
  setLogoutToastVisible: undefined
})

const useVisibleStates = () => {
  const context = useContext(VisibleStatesContext);
  if (!context) {
    throw new Error('useVisibleStates must be used within an VisibleStatesProvider');
  }
  return context;
}

const VisibleStatesProvider = ({children}) => {
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [parkInfoVisible, setParkInfoVisible] = useState(false)
  const [logoutToastVisible, setLogoutToastVisible] = useState(false);

  return (
    <VisibleStatesContext.Provider value={{
      bookingModalVisible,
      parkInfoVisible,
      logoutToastVisible,
      setBookingModalVisible,
      setParkInfoVisible,
      setLogoutToastVisible
    }}>
      {children}
    </VisibleStatesContext.Provider>
  );
}

export {VisibleStatesContext, VisibleStatesProvider, useVisibleStates}
