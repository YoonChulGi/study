import React from 'react';
import { storiesOf } from '@storybook/react';

import { PageWithLoadData } from '../05/lifecycle';

storiesOf('Lifecycle', module).addWithJSX('loadData예제', () => (
  <PageWithLoadData loadData={() => fetch('/').then(() => 'hello')}></PageWithLoadData> // fetch()함수를 사용하여 서버 데이터를 호출합니다. 서버 데이터로 호출 완료 후 문자열 'hello'를 반환하여 loadData9()함수의 then()함수 인자로 전달합니다.
));
