import React from 'react';
export default function withHoC(WrappedComponent) {
  const { displayName, name } = WrappedComponent; // WrappedComponent의 displayName과 name을 추출
  const wrappedComponentName = displayName || name; // displayName이 있으면 wrappedComponentName에는 displayName이 먼저 할당됨
  return class WithHoC extends React.Component {
    static displayName = `withHoC(${wrappedComponentName})`;
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
