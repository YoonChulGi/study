import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../04/Button';
import ButtonWithContext from './ButtonWithContext'; // 소비자

function RowBComponent() {
  return <Button>버튼</Button>;
}

function RowCComponent() {
  return <ButtonWithContext>버튼</ButtonWithContext>; // 소비자를 출력합니다.
}

function TableComponent() {
  return (
    <table>
      <RowBComponent />
      <RowCComponent />
    </table>
  );
}

class HomePageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { loading: false };
    // 콜백 함수 setLoading()을 소비자에 전달하여 데이터를 변경할 예정이므로 공급자의 this를 바인딩.
    // 만약 this를 바인딩 하지 않으면 콜백 함수가 실행되는 소비자 컴포넌트에서 공급자의 setState()
    // 함수에 접근하지 못하므로 오류가 발생
    this.setLoading = this.setLoading.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  // 소비자는 getChildContext() 함수를 통해 loading과 setLoading() 함수를 전달받을 것입니다.
  getChildContext() {
    return {
      loading: this.state.loading,
      setLoading: this.setLoading,
    };
  }

  setLoading(loading) {
    this.setState({ loading });
  }

  toggleLoading() {
    this.setState(({ loading }) => ({ loading: !loading }));
  }

  render() {
    return (
      <div>
        <TableComponent />
        <Button onPress={this.toggleLoading}>상태 변경</Button>
      </div>
    );
  } // toggleLoading() 함수를 실행하는 버튼입니다.
}

// 컨텍스트의 자료형을 정의
HomePageComponent.childContextTypes = {
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default HomePageComponent;
