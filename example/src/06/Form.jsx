import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Provider } from './FormContext';

class FormProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {}, // 입력된 값을 모두 저장
      errors: {}, // 유효성 검사 함수가 반환한 오류 메시지를 입력 항목 이름과 함께 해시맵 구조로 저장한 객체({ name: '이름을 입력해야 합니다.', age: '나이는 18세 이상이어야 합니다.'}) 입니다.
    };
    this.onChange = this.onChange.bind(this);
    this.reset = this.reset.bind(this);
    this.submit = this.submit.bind(this);
  }
  onChange(name, updatedValue) {
    // Input 컴포넌트에서 입력값이 변경될 때 실행할 콜백 함수
    this.setState(
      ({ values }) => ({
        values: {
          ...values,
          [name]: updatedValue, // 입력값을 values의 새 값으로 변경
        },
      }),
      () => this.validate(this.state.values), // state가 변경된 다음 반경된 state의 값으로 유효성 검사 함수를 실행
    );
  }
  reset() {
    this.setState({ values: {}, errors: {} }); // 컨텍스트의 values, errors값을 초기화
  }
  submit() {
    this.props.onSubmit(this.state.values); // 소비자에서 submit() 함수가 호출되면 onSubmit 프로퍼티로 전달받은 콜백 함수에 현재 입력된 값을 인자로 전달
  }
  validate(values) {
    const { validate } = this.props;
    if (!validate) {
      return;
    }
    const errors = validate(values); // 폼 공급자는 유효성 검사 로직을 포함하지 않고 validate 프ㅡ로퍼티로 전달된 콜백 함수를 실행하여 유효성 오류 결과값만을 저장
    this.setState({
      errors, // 유효성 검증의 오류 메시지를 컨텍스트의 erros에 저장
    });
  }
  render() {
    const { values, errors } = this.state;
    return (
      <Provider
        value={{
          errors, // 컨텍스트 데이터에 오류 메시지를 포함
          values, // 컨텍스트 데이터에 입력값을 포함
          onChange: this.onChange, // 입력된 컨텍스트값을 변경하는 콜백함수 this.onChange()를 전달
          reset: this.reset, // 입력된 컨텍스트값을 초기화하는 this.reset() 함수를 전달
          submit: this.submit, // 폼 전송 콜백 함수 this.submit()를 전달
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

FormProvider.propTypes = {
  validate: PropTypes.func,
};

export default FormProvider;
