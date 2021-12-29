import React from 'react';
import PropTypes from 'prop-types';
import Button from '../04/Button';

// 소비자와 추가될 프로퍼티 정보를 함께 임포트
import withLoadingContextAndKey, { loadingPropTypes } from './withLoadingContextAndKey';

function ButtonWithLoadingContext({ children, loading, setLoading }) {
  return <Button onPress={() => setLoading(!loading)}>{loading ? '로딩 중' : children}</Button>;
}

ButtonWithLoadingContext.propTypes = {
  ...loadingPropTypes,
  children: PropTypes.string,
};

// 이중 커링 구조의 생성 함수를 키값 없이 사용하여 기본 공급자와 연결된 버튼 컴포넌트를 생성
export const ButtonWithDefaultLoadingContext = withLoadingContextAndKey()(ButtonWithLoadingContext);

// loading2 키값으로 생성된 공급자와 연결된 버튼 컴포넌트를 생성
export const ButtonWithLoading2Context =
  withLoadingContextAndKey('loading2')(ButtonWithLoadingContext);
