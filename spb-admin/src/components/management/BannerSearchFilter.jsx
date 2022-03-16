import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import InlineList from "../../ui/InlineList";
import Button from "../../ui/Button";
import Text from "../../ui/Text";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Select, { Option } from "../../ui/Select";
import { withRouter } from "react-router-dom";

class BannerSearchFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(params) {
    params.search_type = "banner";
    const { /*setFilter,*/ history } = this.props;
    const cleanedParams = Object.entries(params)
      .filter(([key, value]) => !!value && !!key)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    const queryString = Object.entries(cleanedParams)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join("&");
    history.push(`/?${queryString}`);
  }
  render() {
    const { initValues } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} initValues={initValues}>
        <Form.Consumer>
          {({ onChange, values }) => (
            <InlineList spacingBetween={2} verticalAlign="bottom">
              <Text xlarge bold>
                검색
              </Text>
              <Select
                name="searchField"
                label="검색 범위"
                onChange={onChange}
                value={values["searchField"]}
              >
                <Option label="배너 번호" value="id" />
                <Option label="광고 제목" value="ad_title" />
                <Option label="광고 문구" value="ad_desc" />
                <Option label="상품 id" value="bid" />
              </Select>
              <Input
                name="query"
                label="검색어를 입력하세요"
                onChange={onChange}
                value={values["query"]}
              />
              <Input
                name="end_date"
                label="광고 만기일"
                onChange={onChange}
                value={values["end_date"]}
              />
              <Button type="submit" primary>
                검색
              </Button>
            </InlineList>
          )}
        </Form.Consumer>
      </Form>
    );
  }
}

BannerSearchFilter.propTypes = {
  setTransactionList: PropTypes.func,
  setFilter: PropTypes.func,
};

export default withRouter(BannerSearchFilter);
