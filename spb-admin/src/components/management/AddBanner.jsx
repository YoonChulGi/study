import React, { Component } from "react";
import PropTypes from "prop-types";
import Text from "../../ui/Text";
import Spacing from "../../ui/Spacing";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import InlineList from "../../ui/InlineList";
import Form from "../../ui/Form";
import { Consumer as Modal } from "../../ui/Modal/context"; // 모달 소비자의 closeModal() 함수를 사용

class AddBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileInput = this.handleFileInput.bind(this);
  }
  handleFileInput(e) {
    this.setState({
      selectedFile: e.target.files[0],
    });
  }

  handleSubmit(params, closeModal) {
    const formData = new FormData();
    // console.dir(params);
    Object.keys(params).forEach(function (key) {
      if (key !== "file") {
        formData.append(key, params[key]);
      }
    });

    if (params.file) {
      formData.append("file", this.state.selectedFile);
    }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0]);
    //   console.dir(pair[1]);
    // }

    const { uploadBanner } = this.props;
    uploadBanner(formData, closeModal);
  }

  render() {
    return (
      <>
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
                      배너 광고 추가
                    </Text>
                    <Spacing bottom={2}>
                      <Input
                        name="bid"
                        type="text"
                        label="상품 번호"
                        value={values["bid"]}
                        onChange={onChange}
                      />
                    </Spacing>
                    <Spacing bottom={2}>
                      <Input
                        name="ad_title"
                        type="text"
                        label="광고 명"
                        value={values["ad_title"]}
                        onChange={onChange}
                      />
                    </Spacing>
                    <Spacing bottom={2}>
                      <Input
                        name="ad_desc"
                        type="text"
                        label="광고 문구"
                        value={values["ad_desc"]}
                        onChange={onChange}
                      />
                    </Spacing>
                    <Spacing bottom={2}>
                      <Input
                        name="end_date"
                        type="text"
                        label="광고 종료일"
                        value={values["end_date"]}
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
                        onhandleFileInput={this.handleFileInput}
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
      </>
    );
  }
}

AddBanner.propTypes = {
  uploadBanner: PropTypes.func,
};

export default AddBanner;
