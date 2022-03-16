import React, { PureComponent } from "react";
import Overview from "./Overview";
import MainContent from "./MainContent";
// import TransactionListContainer from "../../containers/main/TransactionListContainer";
import LoginContainer from "../../containers/login/LoginContainer";

class MainPage extends PureComponent {
  render() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    return isLoggedIn === "true" ? (
      <React.Fragment>
        <Overview />
        <MainContent />
      </React.Fragment>
    ) : (
      <LoginContainer />
    );
  }
}

export default MainPage;
