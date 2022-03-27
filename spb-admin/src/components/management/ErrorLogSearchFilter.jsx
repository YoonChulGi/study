import React, { PureComponent } from "react";

import InlineList from "../../ui/InlineList";
import Button from "../../ui/Button";
import Text from "../../ui/Text";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Select, { Option } from "../../ui/Select";
import { withRouter } from "react-router-dom";

class ErrorLogSearchFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(params) {
    params.search_type = "errorLog";
    const { history } = this.props;
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
                <Option label="접속자 ID" value="user_id" />
                <Option label="접속자 IP" value="user_ip" />
                <Option label="에러 코드" value="status" />
                <Option label="에러 메세지" value="message" />
                <Option label="에러 상세" value="exception" />
                <Option label="Class" value="_class" />
              </Select>
              <Input
                name="query"
                label="검색어를 입력하세요"
                onChange={onChange}
                value={values["query"]}
              />
              <Input
                name="timestamp"
                label="에러 발생 시간"
                onChange={onChange}
                value={values["timestamp"]}
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

export default withRouter(ErrorLogSearchFilter);
