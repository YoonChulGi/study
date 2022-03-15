import React, { PureComponent } from "react";

// import Heading from "../../ui/Heading";
import Card from "../../ui/Card";

// import TransactionSearchFilterContainer from "../../containers/main/TransactionSearchFilterContainer";
import BannerTable from "./BannerTable";
// import TransactionPaginationContainer from "../../containers/main/TransactionPaginationContainer";

class BannerList extends PureComponent {
  componentDidMount() {
    const { requestBannerList } = this.props;
    requestBannerList();
  }
  render() {
    const { bannerList, loading } = this.props;
    console.dir({ bannerList, loading });
    return (
      <div>
        {/* <Heading level={3}>거래 로그</Heading>
        <Card vertical={4} horizontal={4}>
          <TransactionSearchFilterContainer />
        </Card> */}
        <Card>
          {/* <TransactionTable transactions={transactions} isLoading={loading} /> */}
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
