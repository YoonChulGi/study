import React from 'react';
import lifecycle from 'recompose/lifecycle';

function Page({ content }) {
  // lifecycle() 함수 안의 this.state.content값을 프로퍼티로 전달
  return (
    <div>
      페이지 로딩이 완료되었습니다.
      {content}
    </div>
  );
}

export const withLoadData = lifecycle({
  state: { isLoading: true, content: '' }, //  state의 초깃값 설정
  componentDidMount: function () {
    // loadData 프로퍼티에 함수가 할당되지 않으면 오류가 발생하므로 프로퍼티에 loadData() 함수가 선언된 경우에만 함수가 실행되도록
    if (this.props.loadData) {
      this.props.loadData().then((content) => this.setState({ isLoading: false, content })); // 로딩이 완료되면 loading을 false로, 결과 화면을 content에 저장합니다.
    }
  },
});

export const PageWithLoadData = withLoadData(Page); // lifecycle() 함수로 만든 하이어오더 컴포넌트 생성 함수를 Page컴포넌트에 적용
