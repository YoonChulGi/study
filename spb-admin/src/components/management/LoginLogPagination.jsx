import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import InlineList from "../../ui/InlineList";

class LoginLogPagination extends PureComponent {
  constructor(props) {
    super(props);
    this.handleNextPress = this.handleNextPress.bind(this);
    this.handlePrevPress = this.handlePrevPress.bind(this);
  }
  handleNextPress() {
    const { requestLoginLogList, pageNumber, searchParams } = this.props;
    requestLoginLogList(searchParams, pageNumber + 1);
  }
  handlePrevPress() {
    const { requestLoginLogList, pageNumber, searchParams } = this.props;
    requestLoginLogList(searchParams, pageNumber - 1);
  }
  render() {
    const { loading, pageNumber, hasNext } = this.props;
    const prevDisabled = loading || pageNumber <= 1;
    const nextDisabled = loading || !hasNext;

    return (
      <InlineList align="right">
        <Button
          secondary
          disabled={prevDisabled}
          onPress={this.handlePrevPress}
        >
          이전
        </Button>
        <Button primary disabled={nextDisabled} onPress={this.handleNextPress}>
          다음
        </Button>
      </InlineList>
    );
  }
}

LoginLogPagination.propTypes = {
  hasNext: PropTypes.bool,
  pageNumber: PropTypes.number,
  // loading: PropTypes.bool,
  requestLoginLogList: PropTypes.func.isRequired,
};

export default LoginLogPagination;
