import React, { PureComponent } from "react";
import Overview from "./Overview";
import TransactionListContainer from "../../containers/main/TransactionListContainer";

class MainPage extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Overview />
        <TransactionListContainer />
      </React.Fragment>
    );
  }
}

export default MainPage;
