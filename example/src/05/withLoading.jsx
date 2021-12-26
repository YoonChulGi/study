import React from 'react';

// 확장 컴포넌트에서 출력할 메시지를 전달받는 커링 함수
export default (loadingMessage = '로딩중') =>
  (WrappedComponent) => {
    const { displayName, name: componentName } = WrappedComponent;
    const wrappedComponentName = displayName || componentName;

    function WithLoading({ isLoading, ...props }) {
      if (isLoading) {
        return loadingMessage;
      }

      return <WrappedComponent {...props} />;
    }
    WithLoading.displayName = `withLoading(${wrappedComponentName})`;
    return WithLoading;
  };
