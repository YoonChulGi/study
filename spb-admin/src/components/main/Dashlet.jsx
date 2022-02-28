import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import InlineList from "../../ui/InlineList";
import Text from "../../ui/Text";

class Dashlet extends PureComponent {
  render() {
    const { name, priceLabel } = this.props;
    return (
      <Card vertical={4} horizontal={4}>
        <Heading level={4}>
          {name}
          <Text>{priceLabel}</Text>
        </Heading>
        <InlineList spacingBetween={1}>
          <Button primary small>
            매도
          </Button>
          <Button small>매수</Button>
        </InlineList>
      </Card>
    );
  }
}

Dashlet.propTypes = {
  name: PropTypes.string,
  priceLabel: PropTypes.string,
};

export default Dashlet;
