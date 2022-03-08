import React, { Component } from "react";
import PropTypes from "prop-types";
import Text from "../../ui/Text";
import Spacing from "../../ui/Spacing";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import InlineList from "../../ui/InlineList";
import Form from "../../ui/Form";
import { Consumer as Modal } from "../../ui/Modal/context"; // 모달 소비자의 closeModal() 함수를 사용

class AddAdmin extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values, closeModal) {
    const { createAdmin } = this.props;
    createAdmin(values, closeModal);
  }
  render() {
    return (
      <Modal>
        {({ closeModal }) => (
          <Form onSubmit={(values) => this.handleSubmit(values, closeModal)}>
            <Form.Consumer>
              {({ onChange, values }) => (
                <Spacing horizontal={4} vertical={8}>
                  <Text xlarge bold>
                    관리자 추가
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
                      name="nick"
                      label="닉네임"
                      value={values["nick"]}
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
                  <InlineList spacingBetween={1}>
                    <Button primary>등록</Button>
                    <Button onPress={closeModal}>취소</Button>
                  </InlineList>
                </Spacing>
              )}
            </Form.Consumer>
          </Form>
        )}
      </Modal>
    );
  }
}

AddAdmin.propTypes = {
  createTransaction: PropTypes.func,
};

export default AddAdmin;
