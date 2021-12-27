import React from 'react';
import branch from 'recompose/branch';
import Button from '../04/Button';

// function isLoading(props){
//     return props.isLoading;
// }

// function LoadingButton(props) {
//     return <Button disabled>로딩 중</Button>;
// }

// export default branch(
//     isLoading,
//     () => LoadingButton, // isLoading()함수가 참값을 반환하면 props.isLoading(로딩 메시지)를, 로딩이 완료되면 LoadingButton 컴포넌트를 반환
// )(Button);

export default branch(
  ({ isLoading }) => isLoading,
  () => () => <Button disabled>로딩 중</Button>,
)(Button);
