import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DefaultPropsComponent extends Component {
  render() {
    let msg1 = '';
    if (this.props.boolVal === false) {
      msg1 = 'boolVal 기본값이 false';
    }
    let msg2 = '';
    if (this.props.boolValWithoutDefault === false) {
      msg2 = 'boolValWithoutDefault 기본값이 false';
    }
    return (
      <div className="message-container">
        {msg1}
        {msg2}
      </div>
    );
  }
}

DefaultPropsComponent.propTypes = {
  boolVal: PropTypes.bool,
  boolValWithoutDefault: PropTypes.bool,
};

// 기본값 선언
DefaultPropsComponent.defaultProps = {
  // DefaultPropsComponent의 특수 변수 defaultProps 를 통하여 프로퍼티의 기본값 정의
  boolVal: false,
};

export default DefaultPropsComponent;
