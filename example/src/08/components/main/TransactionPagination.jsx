import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../doit-ui/Button';
import InlineList from '../../../doit-ui/InlineList';

class TransactionPagination extends PureComponent {
  constructor(props) {
    super(props);
    this.handleNextPress = this.handleNextPress.bind(this);
    this.handlePrevPress = this.handlePrevPress.bind(this);
  }
  handleNextPress() {
    const { requestTransactionList, pageNumber, searchParams } = this.props;
    requestTransactionList(searchParams, pageNumber + 1); // pageNumber 이전 번호의 페이지 목록을 요청
  }
  handlePrevPress() {
    const { requestTransactionList, pageNumber, searchParams } = this.props;
    requestTransactionList(searchParams, pageNumber - 1); // pageNumber 다음 번호의 페이지 목록을 요청
  }
  render() {
    const { loading, pageNumber, hasNext } = this.props;
    const prevDisabled = loading || pageNumber <= 1; // 로딩 상태이거나 첫 페이지인 경우 이전 버튼의 작동을 정지합니다.
    const nextDisabled = loading || !hasNext; // 로딩 상태이거나 마지막 페이지인 경우(다음 페이지가 없는 경우) 다음 버튼의 작동을 정지합니다.
    return (
      <InlineList align="right">
        <Button secondary disabled={prevDisabled} onPress={this.handlePrevPress}>
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
  loading: PropTypes.bool,
  requestTransactionList: PropTypes.func.isRequired,
};

export default TransactionPagination;
