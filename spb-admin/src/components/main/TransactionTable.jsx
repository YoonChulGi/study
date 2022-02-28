import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Table from "../../ui/Table";
import TableRow from "../../ui/TableRow";
import TableCell from "../../ui/TableCell";
import TableHead from "../../ui/TableHead";
import TableBody from "../../ui/TableBody";

import Text from "../../ui/Text";
import Spacing from "../../ui/Spacing";
import withLoading from "../withLoading";

const LoadingMessage = (
  <Spacing vertical={4} horizontal={2}>
    <Text large>데이터를 불러들이고 있습니다.</Text>
  </Spacing>
);

class TransactionTable extends PureComponent {
  render() {
    const { transactions } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">거래 번호</TableCell>
            <TableCell align="left">구매자</TableCell>
            <TableCell align="left">품목 ID</TableCell>
            <TableCell align="left">구매 수량</TableCell>
            <TableCell align="left">구매자 주소</TableCell>
            <TableCell align="left">카드 번호</TableCell>
            <TableCell align="left">카드 CVC</TableCell>
            <TableCell align="left">카드 유효기간</TableCell>
            <TableCell align="left">거래 일시</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(
            ({
              address,
              card_cvc,
              card_expiry,
              card_number,
              checkout_time,
              detail_address,
              extra_address,
              full_name,
              idx,
              postcode,
              prd_ids,
              qtys,
            }) => (
              <TableRow key={idx}>
                <TableCell align="left">{idx}</TableCell>
                <TableCell align="left">{full_name}</TableCell>
                <TableCell align="left">{prd_ids}</TableCell>
                <TableCell align="left">{qtys}</TableCell>
                <TableCell align="left">{`[${postcode}] ${address} ${detail_address} ${extra_address}`}</TableCell>
                <TableCell align="left">{card_number}</TableCell>
                <TableCell align="left">{card_cvc}</TableCell>
                <TableCell align="left">{card_expiry}</TableCell>
                <TableCell align="left">{checkout_time}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    );
  }
}

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      totalPrice: PropTypes.string,
      currentPrice: PropTypes.string,
      datetime: PropTypes.string,
    })
  ),
};

export default withLoading(LoadingMessage)(TransactionTable);
