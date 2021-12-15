import React from 'react';
import { storiesOf } from '@storybook/react'; // 스토리를 스토리북 도구에 추가해주는 storiesOf() 함수를 임포트
import { action } from '@storybook/addon-actions';

import Input from '../03/Input';

storiesOf('Input', module)
  .addWithJSX('기본 설정', () => <Input name="name" />)
  .addWithJSX('label 예제', () => <Input name="name" label="이름" />)
  .addWithJSX('onChange 예제', () => (
    <Input name="name" onChange={action('onChange 이벤트 발생')} />
  ));
