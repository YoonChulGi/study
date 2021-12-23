import React from 'react';
export default function withHoC(WrappedComponent) {
  return class WithHoc extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
