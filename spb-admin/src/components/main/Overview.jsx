import React, { PureComponent } from "react";

import Heading from "../../ui/Heading";
import InlineList from "../../ui/InlineList";

import Dashlet from "./Dashlet";

class Overview extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Heading level={3}>Overview</Heading>
        <InlineList>
          <Dashlet name="비트코인" priceLabel="4,216,000원" />
          <Dashlet name="이더리움" priceLabel="216,000원" />
          <Dashlet name="두잇코인" priceLabel="30,000원" />
        </InlineList>
      </React.Fragment>
    );
  }
}

export default Overview;
