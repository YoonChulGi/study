import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChildComponent extends Component {
  render() {
    // 객체 분해 할당식을 사용한 프로퍼티에 전달된 값을 render() 함수 내의 지역 변수로 재정의
    const { boolVal, numVal, arrayVal, objVal, nodeVal, funcVal } = this.props;
    return (
      <div>
        <span>불리언: {String(boolVal)}</span> <br />
        <span>숫자: {numVal}</span> <br />
        <span>배열: {arrayVal}</span> <br />
        <span>객체name: {objVal.name}</span> <br />
        <span>객체price: {objVal.price}</span> <br />
        <span>노드: {nodeVal}</span> <br />
        <span>함수: {String(funcVal)}</span>
      </div>
    );
  }
}

ChildComponent.propTypes = {
  // 객체형태로 자료형 정의
  boolVal: PropTypes.bool,
  numVal: PropTypes.number,
  arrayVal: PropTypes.array,
  objVal: PropTypes.object,
  nodeVal: PropTypes.node,
  funcVal: PropTypes.func,
};

export default ChildComponent;
