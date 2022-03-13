import React, { Component } from "react";
import PropTypes from "prop-types";
import Text from "../../ui/Text";
import Spacing from "../../ui/Spacing";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import InlineList from "../../ui/InlineList";
import Form from "../../ui/Form";
import { Consumer as Modal } from "../../ui/Modal/context"; // 모달 소비자의 closeModal() 함수를 사용

class ManageBanner extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(params, closeModal) {
    const { uploadBanner } = this.props;
    uploadBanner(params, closeModal);
  }

  render() {
    return (
      <Modal>
        {({ closeModal }) => (
          <Form
            onSubmit={(values) => this.handleSubmit(values, closeModal)}
            encType="multipart/form-data"
          >
            <Form.Consumer>
              {({ onChange, values }) => (
                <Spacing horizontal={4} vertical={8}>
                  <Text xlarge bold>
                    배너 광고 관리
                  </Text>
                  <Spacing bottom={2}>
                    <Input
                      name="adTitle"
                      type="text"
                      label="광고 명"
                      value={values["adTitle"]}
                      onChange={onChange}
                    />
                  </Spacing>
                  <Spacing bottom={2}>
                    <Input
                      name="adDesc"
                      type="text"
                      label="광고 문구"
                      value={values["adDesc"]}
                      onChange={onChange}
                    />
                  </Spacing>
                  <Spacing bottom={2}>
                    <Input
                      type="file"
                      name="file"
                      label="파일"
                      value={values["file"]}
                      onChange={onChange}
                    />
                  </Spacing>
                  <InlineList spacingBetween={2}>
                    <Button primary>등록</Button>
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
    );
  }
}

ManageBanner.propTypes = {
  uploadBanner: PropTypes.func,
};

export default ManageBanner;
