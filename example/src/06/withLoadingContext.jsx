import React from 'react';
import PropTypes from 'prop-types';

export default (WrappedComponent) => {
  const { displayName, name: componentName } = WrappedComponent;
  const wrappedComponentName = displayName || componentName;

  function WithLoadingContext(props, context) {
    const { loading, setLoading } = context;
    return <WrappedComponent {...props} loading={loading} setLoading={setLoading} />; // 컨텍스트로 전달받은 객체를 프로퍼티로 변환하여 전달합니다.
  }
  WithLoadingContext.displayName = `withLoadingContext(${wrappedComponentName})`;
  WithLoadingContext.contextTypes = {
    loading: PropTypes.bool,
    setLoading: PropTypes.func,
  };
  return WithLoadingContext;
};
