import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import MainPage from "./AsyncMainPage";
import LoginContainer from "./containers/login/LoginContainer";
import configureStore from "./store/configureStore";
import ModalProvider from "./ModalProvider";
import NotificationContainer from "./containers/main/NotificationContainer";
import NotFound from "./components/NotFound";
import RouterStateContainer from "./containers/RouterStateContainer";

class SpbAdminApp extends PureComponent {
  store = configureStore();
  render() {
    return (
      <Provider store={this.store}>
        <Router>
          <RouterStateContainer />
          <ModalProvider>
            <AppLayout>
              <Switch>
                <Route path="/" exact render={() => <MainPage />} />
                <Route path="/login" exact render={() => <LoginContainer />} />
                <Route path="*" component={NotFound} />
              </Switch>
              <NotificationContainer />
            </AppLayout>
          </ModalProvider>
        </Router>
      </Provider>
    );
  }
}

export default SpbAdminApp;