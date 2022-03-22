import React, { PureComponent } from "react";

import Card from "../../ui/Card";
// import BannerSearchFilterContainer from "../../containers/management/BannerSearchFilterContainer";
import LoginLogSearchFilterContainer from "../../containers/management/LoginLogSearchFilterContainer";

// import BannerTable from "./BannerTable";
import LoginLogTable from "./LoginLogTable";

// import BannerPaginationContainer from "../../containers/management/BannerPaginationContainer";
import LoginLogPaginationContainer from "../../containers/management/LoginLogPaginationContainer";

class LoginLogList extends PureComponent {
  render() {
    const { loginLogList, loading } = this.props;
    return (
      <div>
        <Card vertical={4} horizontal={4}>
          <LoginLogSearchFilterContainer />
        </Card>
        <Card>
          <LoginLogTable loginLogList={loginLogList} isLoading={loading} />
        </Card>
        {/* <BannerPaginationContainer /> (remove) */}
        <LoginLogPaginationContainer />
      </div>
    );
  }
}

LoginLogList.defaultProps = {
  loginLogList: [],
  loading: false,
};

export default LoginLogList;
