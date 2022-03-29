import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Heading from "../../ui/Heading";
import Card from "../../ui/Card";
import Text from "../../ui/Text";
import InlineList from "../../ui/InlineList";

class Dashlet extends PureComponent {
  render() {
    const { name, cnt } = this.props;

    return (
      <Card vertical={4} horizontal={4}>
        <Heading level={4}>
          <InlineList spacingBetween={1}>
            <Text>{name}</Text>
            {cnt}명
          </InlineList>
        </Heading>
      </Card>
    );
  }
}

Dashlet.propTypes = {
  name: PropTypes.string,
  cnt: PropTypes.number,
};

export default Dashlet;
