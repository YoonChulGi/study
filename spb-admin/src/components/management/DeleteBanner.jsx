import React, { Component } from "react";
import PropTypes from "prop-types";
import Text from "../../ui/Text";
import Spacing from "../../ui/Spacing";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import InlineList from "../../ui/InlineList";
import Form from "../../ui/Form";
import { Consumer as Modal } from "../../ui/Modal/context"; // 모달 소비자의 closeModal() 함수를 사용

class DeleteBanner extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(params, closeModal) {
    const { deleteBanner } = this.props;
    deleteBanner(params, closeModal);
  }

  render() {
    const { id } = this.props;
    return (
      <>
        <Modal>
          {({ closeModal }) => (
            <Form
              onSubmit={(values) => this.handleSubmit(values, closeModal)}
              initValues={this.props}
            >
              <Form.Consumer>
                {({ onChange, values }) => (
                  <Spacing horizontal={4} vertical={8}>
                    <Text xlarge bold>
                      배너 광고 삭제
                    </Text>
                    <InlineList spacingBetween={2}>
                      <Spacing top={3} bottom={2}>
                        <Text>정말 {id}번 배너를 삭제하시겠습니까?</Text>
                        <Input
                          type="hidden"
                          name="id"
                          value={values["id"]}
                          onChange={onChange}
                        />
                      </Spacing>
                    </InlineList>
                    <InlineList spacingBetween={2}>
                      <Button primary>삭제</Button>
                      <Button onPress={closeModal}>취소</Button>
                      {/* <Button secondary>비밀번호 찾기</Button> */}
                      {/* <Button onPress={closeModal}>취소</Button> */}
                    </InlineList>
                  </Spacing>
                )}
              </Form.Consumer>
            </Form>
          )}
        </Modal>
      </>
    );
  }
}

DeleteBanner.propTypes = {
  updateBanner: PropTypes.func,
};

export default DeleteBanner;
