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

class ErrorLogTable extends PureComponent {
  render() {
    const { errorLogList } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow>
            {/* _id,user_id,user_ip,status,message,exception,timestamp,_class */}
            <TableCell align="center">로그 ID</TableCell>
            <TableCell align="left">접속자 ID</TableCell>
            <TableCell align="left">접속자 IP</TableCell>
            <TableCell align="center">에러 코드</TableCell>
            <TableCell align="left">URI</TableCell>
            <TableCell align="left">에러 메시지</TableCell>
            <TableCell align="left">에러 상세</TableCell>
            <TableCell align="left">Timestamp</TableCell>
            <TableCell align="left">Class</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {errorLogList.map(
            ({
              _id,
              user_id,
              user_ip,
              status,
              url,
              message,
              exception,
              timestamp,
              _class,
            }) => (
              <TableRow key={_id}>
                <TableCell align="center">{_id}</TableCell>
                <TableCell align="left">{user_id}</TableCell>
                <TableCell align="left">{user_ip}</TableCell>
                <TableCell align="center"> {"  " + status + "  "} </TableCell>
                <TableCell align="left">{url}</TableCell>
                <TableCell align="left">{message}</TableCell>
                <TableCell align="left">{exception}</TableCell>
                <TableCell align="left">{timestamp}</TableCell>
                <TableCell align="left">{_class}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    );
  }
}
ErrorLogTable.propTypes = {
  errorLogList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      user_id: PropTypes.string,
      user_ip: PropTypes.string,
      status: PropTypes.number,
      url: PropTypes.string,
      message: PropTypes.string,
      exception: PropTypes.string,
      timestamp: PropTypes.string,
      _class: PropTypes.string,
    })
  ),
};

export default withLoading(LoadingMessage)(ErrorLogTable);
