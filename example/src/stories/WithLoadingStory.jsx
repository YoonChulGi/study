import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../04/Button';
import Text from '../04/Text';
import withLoading from '../05/withLoading';

// 이중 커링 구조의 하이어오더 컴포넌트를 사용할 때 로딩 상태를 표시하는 메시지를 인자로 전달하여 실행
const TextWithLoading = withLoading('로딩중')(Text);
// 로딩 상태 메시지를 버튼 형태의 JSX로 출력하도록 노드를 전달
const ButtonWithLoading = withLoading(<Button disabled>로딩 중...</Button>)(Button);

storiesOf('WithLoading', module)
  .addWithJSX('기본 설정', () => (
    <div>
      <ButtonWithLoading>안녕하세요</ButtonWithLoading>
      <TextWithLoading>안녕하세요</TextWithLoading>
    </div>
  ))
  .addWithJSX('isLoading 예제', () => (
    <div>
      <ButtonWithLoading isLoading>안녕하세요</ButtonWithLoading>
      <TextWithLoading isLoading>안녕하세요</TextWithLoading>
    </div>
  ));
