import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Consumer } from './FormContext';
import Button from '../04/Button';

class FormSubmitButton extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Consumer>
        {({ submit }) => (
          <Button primary onPress={submit}>
            {/* 컨텍스트의 폼 전송을 위한 submit() 콜백 함수를 Button 컴포넌트의 onPress 프로퍼티로 전달합니다. 공급자 프로퍼티의 onSubmit 콜백 함수를 입력된 값과 함께 호출하게 됩니다. */}
            {children}
          </Button>
        )}
      </Consumer>
    );
  }
}

FormSubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormSubmitButton;
