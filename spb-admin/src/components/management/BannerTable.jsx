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

class BannerTable extends PureComponent {
  render() {
    const { bannerList } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow>
            {/* id,ad_title,ad_desc,url,bid */}
            <TableCell align="left">배너 번호</TableCell>
            <TableCell align="left">광고 제목</TableCell>
            <TableCell align="left">광고 문구</TableCell>
            <TableCell align="left">광고 이미지</TableCell>
            <TableCell align="left">광고 상품 id</TableCell>
            <TableCell align="left">광고 만기일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bannerList.map(({ id, ad_title, ad_desc, url, bid, end_date }) => (
            <TableRow key={id}>
              <TableCell align="left">{id}</TableCell>
              <TableCell align="left">{ad_title}</TableCell>
              <TableCell align="left">{ad_desc}</TableCell>
              <TableCell align="left">
                <img src={url} alt="img" />
              </TableCell>
              <TableCell align="left">{bid}</TableCell>
              <TableCell align="left">{end_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
BannerTable.propTypes = {
  bannerList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      ad_title: PropTypes.string,
      ad_desc: PropTypes.string,
      url: PropTypes.string,
      bid: PropTypes.number,
    })
  ),
};

export default withLoading(LoadingMessage)(BannerTable);
