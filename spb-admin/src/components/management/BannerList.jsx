import React, { PureComponent } from "react";

import Card from "../../ui/Card";
import BannerSearchFilterContainer from "../../containers/management/BannerSearchFilterContainer";
import BannerTable from "./BannerTable";
import BannerPaginationContainer from "../../containers/management/BannerPaginationContainer";

class BannerList extends PureComponent {
  render() {
    const { bannerList, loading } = this.props;
    return (
      <div>
        <Card vertical={4} horizontal={4}>
          <BannerSearchFilterContainer />
        </Card>
        <Card>
          <BannerTable bannerList={bannerList} isLoading={loading} />
        </Card>
        <BannerPaginationContainer />
      </div>
    );
  }
}

BannerList.defaultProps = {
  transactions: [],
  loading: false,
};

export default BannerList;
