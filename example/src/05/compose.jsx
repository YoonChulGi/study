import compose from 'recompose/compose';
import withLoading from './withLoading';
import withState from 'recompose/withState';
const withLoadData = withState('isLoading', 'setIsLoading', false);

function Component() {
  return '완료(컴포넌트 출력)';
}
const ComponentWithLoading = withLoading('로딩 중')(Component);
const ComponentWithLoadData = withLoadData(ComponentWithLoading);

const withLoadDataAndLoading = compose(withLoadData, withLoading('로딩 중'));
// 조합이 올바르지 못한 예: compose(withLoadData, withLoading)
// 순서가 올바르지 못한 예: compose(withLoading('로딩 중'), withLoadData) // withLoadingData('로딩 중')을 먼저 조합하면 withLoadingData의 isLoading 프로퍼티가 withLoading하이어오더 컴포넌트에 전달되지 않으므로 주의합니다.
const ComponentWithLoadData = withLoadDataAndLoading(ComponentWithLoading); // compose로 만든 증강된 하이어오더 컴포넌트 생성 함수를 사용하니 하이어오더 컴포넌트 생성 함수도 코드를 추가로 작성하지 않아도 됩니다.
// or compose(withLoadData, withLoading('로딩 중'))(ComponentWithLoading);
