import React, { PureComponent } from "react";

import Heading from "../../ui/Heading";
import InlineList from "../../ui/InlineList";

import Dashlet from "./Dashlet";

class Overview extends PureComponent {
  render() {
    const { overviewList } = this.props;
    console.dir(overviewList);
    return (
      <React.Fragment>
        <Heading level={3}>Overview</Heading>
        <InlineList>
          {overviewList.map(({ _id, value }) => (
            <Dashlet key={_id} name={_id} cnt={value} />
          ))}
        </InlineList>
      </React.Fragment>
    );
  }
}

export default Overview;
