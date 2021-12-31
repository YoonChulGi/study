import React, { PureComponent } from 'react';

import Input from '../03/Input';
import { Consumer } from './FormContext';

class FormConsumerExample extends PureComponent {
  render() {
    const { name, ...otherProps } = this.props;
    return (
      <Consumer>
        {({ values, errors, onChange }) => (
          <Input
            {...otherProps}
            name={name} // name 프로퍼티의 값을 Input 컴포넌트의 프로퍼티로 전달
            onChange={onChange} // 컨텍스트의 onChange 콜백 함수를 Input 컴포넌트의 프로퍼티로 전달합니다. Input 입력 컴포넌트에 입력한 값이 변경되면 onChange 콜백 함수가 호출됨
            value={values[name]} // 입력값 중 name 프로퍼티의 키값을 Input 컴포넌트의 입력값으로 전달
            errorMessage={errors[name]} // 공급자에서 전달받은 오류 메시지 중 name 프로퍼티의 키에 해당하는 오류 메시지만을 errorMessage 프로퍼티에 전달
          />
        )}
      </Consumer>
    );
  }
}

export default FormConsumerExample;
