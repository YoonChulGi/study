import React, { PureComponent } from "react";

// import Heading from "../../ui/Heading";
import Card from "../../ui/Card";

// import TransactionSearchFilterContainer from "../../containers/main/TransactionSearchFilterContainer";
import BannerSearchFilterContainer from "../../containers/management/BannerSearchFilterContainer";
import BannerTable from "./BannerTable";
// import TransactionPaginationContainer from "../../containers/main/TransactionPaginationContainer";

class BannerList extends PureComponent {
  render() {
    const { bannerList, loading } = this.props;
    return (
      <div>
        <Card vertical={4} horizontal={4}>
          {/* <TransactionSearchFilterContainer /> */}
          <BannerSearchFilterContainer />
        </Card>
        <Card>
          <BannerTable bannerList={bannerList} isLoading={loading} />
          {/* bannerList={transactions} */}
        </Card>
        {/* <TransactionPaginationContainer /> */}
      </div>
    );
  }
}

BannerList.defaultProps = {
  transactions: [],
  loading: false,
};

export default BannerList;
