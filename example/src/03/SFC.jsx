import React, { Component } from 'react';
import Proptypes from 'prop-types';

function SFC(props, context) {
  // 클래스형 컴포넌트의 this.props와 동일
  const { somePropValue } = props;
  // 클래스형 컴포넌트의 this.context
  const { someContextValue } = context;
  return <h1>Hello, {somePropValue}</h1>;
}

SFC.propTypes = { somePropValue: Proptypes.any };
SFC.defaultProps = { somePropValue: 'default value' };

export default SFC;
