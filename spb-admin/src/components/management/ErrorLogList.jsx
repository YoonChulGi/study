import React, { PureComponent } from "react";

import Card from "../../ui/Card";
import ErrorLogSearchFilterContainer from "../../containers/management/ErrorLogSearchFilterContainer";
import ErrorLogTable from "./ErrorLogTable";
import ErrorLogPaginationContainer from "../../containers/management/ErrorLogPaginationContainer";

class ErrorLogList extends PureComponent {
  render() {
    const { errorLogList, loading } = this.props;
    return (
      <div>
        <Card vertical={4} horizontal={4}>
          <ErrorLogSearchFilterContainer />
        </Card>
        <Card>
          <ErrorLogTable errorLogList={errorLogList} isLoading={loading} />
        </Card>
        <ErrorLogPaginationContainer />
      </div>
    );
  }
}

ErrorLogList.defaultProps = {
  errorLogList: [],
  loading: false,
};

export default ErrorLogList;
