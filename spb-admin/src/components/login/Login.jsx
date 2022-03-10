import React, { Component } from "react";
import PropTypes from "prop-types";
import Text from "../../ui/Text";
import Spacing from "../../ui/Spacing";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import InlineList from "../../ui/InlineList";
import Form from "../../ui/Form";

class AddAdmin extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(params) {
    const { loginAdmin } = this.props;
    loginAdmin(params);
  }

  render() {
    return (
      <Form onSubmit={(values) => this.handleSubmit(values)}>
        <Form.Consumer>
          {({ onChange, values }) => (
            <Spacing horizontal={4} vertical={8}>
              <Text xlarge bold>
                관리자 로그인
              </Text>
              <Spacing bottom={2}>
                <Input
                  name="email"
                  label="이메일"
                  value={values["email"]}
                  onChange={onChange}
                />
              </Spacing>
              <Spacing bottom={2}>
                <Input
                  name="password"
                  type="password"
                  label="패스워드"
                  value={values["password"]}
                  onChange={onChange}
                />
              </Spacing>
              <InlineList spacingBetween={2}>
                <Button primary>로그인</Button>
                {/* <Button secondary>비밀번호 찾기</Button> */}
                {/* <Button onPress={closeModal}>취소</Button> */}
              </InlineList>
            </Spacing>
          )}
        </Form.Consumer>
      </Form>
    );
  }
}

AddAdmin.propTypes = {
  loginAdmin: PropTypes.func,
};

export default AddAdmin;
