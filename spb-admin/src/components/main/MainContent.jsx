import React, { PureComponent } from "react";
import TransactionListContainer from "../../containers/main/TransactionListContainer";
import BannerListContainer from "../../containers/management/BannerListContainer";
import InlineList from "../../ui/InlineList";
import Button from "../../ui/Button";
import { withRouter } from "react-router-dom";

class MainContent extends PureComponent {
  constructor(props) {
    super(props);
    const { search } = props.history.location;
    const search_type = this.parse(search).search_type;
    let flag = "";
    if (search_type === "banner") {
      flag = "배너 광고 관리";
    } else if (
      !search_type ||
      search_type === "" ||
      search_type === "transaction"
    ) {
      flag = "거래 로그";
    }
    this.state = {
      flag,
    };
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.parse = this.parse.bind(this);
  }
  parse(qs) {
    const queryString = qs.substr(1);
    const chunks = queryString.split("&");
    return chunks
      .map((chunk) => chunk.split("="))
      .reduce(
        (result, [key, value]) => ({
          ...result,
          [key]: value,
        }),
        {}
      );
  }
  handleButtonPress(param) {
    const { history } = this.props;
    this.setState({
      flag: param,
    });
    if (param === "배너 광고 관리") {
      history.push("/?search_type=banner");
    } else if (param === "거래 로그") {
      history.push("/");
    }
  }
  render() {
    const { flag } = this.state;
    return (
      <>
        <InlineList align="left" spacingBottom={2}>
          <Button
            inverse
            bold
            large
            onPress={() => this.handleButtonPress("거래 로그")}
            primary={flag === "거래 로그" || flag === "" ? true : false}
          >
            거래 로그
          </Button>
          <Button
            inverse
            bold
            large
            onPress={() => this.handleButtonPress("배너 광고 관리")}
            primary={flag === "배너 광고 관리" ? true : false}
          >
            배너 광고 관리
          </Button>
        </InlineList>
        {flag === "거래 로그" || flag === "" ? (
          <TransactionListContainer />
        ) : null}
        {flag === "배너 광고 관리" ? <BannerListContainer /> : null}
      </>
    );
  }
}

export default withRouter(MainContent);
