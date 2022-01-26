import React from 'react';
import {Provider} from "react-native-paper";
import {paperTheme} from "./customThemes";
import {AuthProvider} from "./contexts/Auth";
import Router from "./routes/Router";
import {RootSiblingParent} from 'react-native-root-siblings';
import {VisibleStatesProvider} from "./contexts/VisibleStates";
import {UserDataProvider} from "./contexts/User";

export const AuthContext = React.createContext({});

function App() {
  return (
    <Provider theme={paperTheme}>
      <RootSiblingParent>
        <VisibleStatesProvider>
          <UserDataProvider>
            <AuthProvider>
              <Router/>
            </AuthProvider>
          </UserDataProvider>
        </VisibleStatesProvider>
      </RootSiblingParent>
    </Provider>
  );
}

export default App;
