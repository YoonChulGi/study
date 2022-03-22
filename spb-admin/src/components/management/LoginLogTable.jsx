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

class LoginLogTable extends PureComponent {
  render() {
    const { loginLogList } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow>
            {/* id,ad_title,ad_desc,url,bid */}
            <TableCell align="center">로그 ID</TableCell>
            <TableCell align="left">접속자 ID</TableCell>
            <TableCell align="left">접속자 IP</TableCell>
            <TableCell align="center">로그인 시간</TableCell>
            <TableCell align="left">로그인 Class</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loginLogList.map(({ _id, user_id, user_ip, timestamp, _class }) => (
            <TableRow key={_id}>
              <TableCell align="center">{_id}</TableCell>
              <TableCell align="left">{user_id}</TableCell>
              <TableCell align="left">{user_ip}</TableCell>
              <TableCell align="center">{timestamp}</TableCell>
              <TableCell align="left">{_class}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
LoginLogTable.propTypes = {
  loginLogList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      user_id: PropTypes.string,
      user_ip: PropTypes.string,
      timestamp: PropTypes.string,
      _class: PropTypes.string,
    })
  ),
};

export default withLoading(LoadingMessage)(LoginLogTable);
