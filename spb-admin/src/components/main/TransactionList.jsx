import React, { PureComponent } from "react";

import Heading from "../../ui/Heading";
import Card from "../../ui/Card";

import TransactionSearchFilterContainer from "../../containers/main/TransactionSearchFilterContainer";
import TransactionTable from "./TransactionTable";
import TransactionPaginationContainer from "../../containers/main/TransactionPaginationContainer";

class TransactionList extends PureComponent {
  componentDidMount() {
    this.props.requestTransactionList();
  }
  render() {
    const { transactions, loading } = this.props;
    // console.dir(transactions);
    // console.dir(loading["transaction/FETCH_TRANSACTION_LIST"]);
    return (
      <div>
        <Heading level={3}>거래 로그</Heading>
        <Card vertical={4} horizontal={4}>
          <TransactionSearchFilterContainer />
        </Card>
        <Card>
          <TransactionTable transactions={transactions} isLoading={loading} />
        </Card>
        <TransactionPaginationContainer />
      </div>
    );
  }
}

TransactionList.defaultProps = {
  transactions: [],
  setTransactionList: () => {},
};

export default TransactionList;
