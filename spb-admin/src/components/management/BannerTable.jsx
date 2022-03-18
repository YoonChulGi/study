import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Table from "../../ui/Table";
import TableRow from "../../ui/TableRow";
import TableCell from "../../ui/TableCell";
import TableHead from "../../ui/TableHead";
import TableBody from "../../ui/TableBody";

import Text from "../../ui/Text";
import Spacing from "../../ui/Spacing";
import Button from "../../ui/Button";
import InlineList from "../../ui/InlineList";
import withLoading from "../withLoading";

import { Consumer as Modal } from "../../ui/Modal/context";
import { UPDATE_BANNER, DELETE_BANNER } from "../../constants/modals";

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
            <TableCell align="center">배너 번호</TableCell>
            <TableCell align="left">광고 제목</TableCell>
            <TableCell align="left">광고 문구</TableCell>
            <TableCell align="center">광고 이미지</TableCell>
            <TableCell align="center">광고 상품 id</TableCell>
            <TableCell align="left">광고 만기일</TableCell>
            <TableCell align="center">삭제 여부</TableCell>
            <TableCell align="center">배너 관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bannerList.map(
            ({ id, ad_title, ad_desc, url, bid, end_date, deleted_yn }) => (
              <TableRow key={id}>
                <TableCell align="center">{id}</TableCell>
                <TableCell align="left">{ad_title}</TableCell>
                <TableCell align="left">{ad_desc}</TableCell>
                <TableCell align="center">
                  <img src={url} alt="img" />
                </TableCell>
                <TableCell align="center">{bid}</TableCell>
                <TableCell align="left">{end_date}</TableCell>
                <TableCell align="center">{deleted_yn}</TableCell>
                <TableCell align="center">
                  <Modal>
                    {({ openModal }) => (
                      // <div {...css(styles.wrapper)}>
                      //   <div {...css(styles.container)}>
                      <InlineList align="center">
                        <Button
                          primary
                          onPress={() =>
                            openModal(UPDATE_BANNER, {
                              id,
                              bid,
                              ad_title,
                              ad_desc,
                              end_date: end_date.replace("T00:00:00.000Z", ""),
                              url,
                            })
                          }
                        >
                          수정
                        </Button>
                        <Button
                          secondary
                          onPress={() => openModal(DELETE_BANNER, { id })}
                        >
                          삭제
                        </Button>
                      </InlineList>
                      //   </div>
                      // </div>
                    )}
                  </Modal>
                </TableCell>
              </TableRow>
            )
          )}
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
