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
    console.log(this.props);
    const { createAdmin } = this.props;
    createAdmin(values, closeModal);
  }
  render() {
    // const typeName = type === "sell" ? "판매" : "구매"; // type에 따라 판매와 구매 화면을 구분
    return (
      <Modal>
        {(
          { closeModal } // 모달 소비자의 closeModal() 함수를 사용합니다.
        ) => (
          <Form
            onSubmit={(values) => this.handleSubmit(values, closeModal)} // Form 컴포넌트의 onSubmit 프로퍼티로 전달한 handleSubmit() 콜백 함수의 인자로 values와 closeModal() 함수를 전달합니다.
            // initValues={{ currentPrice: price }}
          >
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
                    {/*[취소]를 누르면 closeModal() 함수를 호출하여 모달을 닫습니다.*/}
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
