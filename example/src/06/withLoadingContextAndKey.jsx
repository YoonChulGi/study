import React, { Component } from 'react';

// 공급자에 정의된 컨텍스트 데이터의 키값과 항목 정보를 임포트
import { DEFAULT_KEY, contextPropTypes } from './LoadingProviderWithKey';

// 공급자의 컨텍스트 데이터의 자료형을 가져와 loadingPropTypes에 대입
export const loadingPropTypes = contextPropTypes;

// 공급자의 컨텍스트 데이터 키값을 인자로 전달받는 하이어오더 컴포넌트
export default (contextKey = DEFAULT_KEY) =>
  (WrappedComponent) => {
    const { displayName, name: componentName } = WrappedComponent;
    const wrappedComponentName = displayName || componentName;

    function WithLoadingContext(props, context) {
      // 키값에 맞는 컨텍스트 데이터 구조 분해 할당
      const { loading, setLoading } = context[contextKey];

      return <WrappedComponent {...props} loading={loading} setLoading={setLoading} />;
    }
    WithLoadingContext.displayName = `withLoadingContext(${wrappedComponentName})`;
    WithLoadingContext.contextTypes = {
      [contextKey]: contextPropTypes,
    };

    return WithLoadingContext;
  };
