import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import InlineList from "../../ui/InlineList";

class TransactionPagination extends PureComponent {
  constructor(props) {
    super(props);
    this.handleNextPress = this.handleNextPress.bind(this);
    this.handlePrevPress = this.handlePrevPress.bind(this);
  }
  handleNextPress() {
    const { requestTransactionList, pageNumber, searchParams } = this.props;
    requestTransactionList(searchParams, pageNumber + 1);
  }
  handlePrevPress() {
    const { requestTransactionList, pageNumber, searchParams } = this.props;
    requestTransactionList(searchParams, pageNumber - 1);
  }
  render() {
    const { loading, pageNumber, hasNext } = this.props;
    let isloading = loading;
    if (isloading) {
      isloading = loading["transaction/FETCH_TRANSACTION_LIST"];
    }

    const prevDisabled = isloading || pageNumber <= 1; // loading
    const nextDisabled = isloading || !hasNext; // loading

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

TransactionPagination.propTypes = {
  hasNext: PropTypes.bool,
  pageNumber: PropTypes.number,
  // loading: PropTypes.bool,
  requestTransactionList: PropTypes.func.isRequired,
};

export default TransactionPagination;
