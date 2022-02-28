import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import MainPage from "./components/main/MainPage";
import configureStore from "./store/configureStore";
import ModalProvider from "./ModalProvider";
import NotificationContainer from "./containers/main/NotificationContainer";

class SpbAdminApp extends PureComponent {
  store = configureStore();
  render() {
    return (
      <Provider store={this.store}>
        <ModalProvider>
          <Router>
            <AppLayout>
              <MainPage />
              <NotificationContainer />
            </AppLayout>
          </Router>
        </ModalProvider>
      </Provider>
    );
  }
}

export default SpbAdminApp;
