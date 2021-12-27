import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoadingProvider extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };
    this.setLoading = this.setLoading.bind(this);
  }

  // 홈페이지 컴포넌트에 사용된 공급자 데이터 항목을 옮겨 놓았습니다.
  getChildContext() {
    return {
      loading: this.state.loading,
      setLoading: this.setLoading,
    };
  }

  setLoading(loading) {
    this.setState({ loading });
  }

  render() {
    return this.props.children; // 자식 프로퍼티 노드를 출력합니다.
  }
}

LoadingProvider.childContextTypes = {
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default LoadingProvider;
