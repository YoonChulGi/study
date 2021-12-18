import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../04/Button';

storiesOf('Button', module)
  .addWithJSX('기본 설정', () => <Button>확인</Button>)
  .addWithJSX('large 예제', () => <Button large>확인</Button>)
  .addWithJSX('xlarge 예제', () => <Button xlarge>확인</Button>)
  .addWithJSX('small 예제', () => <Button small>확인</Button>)
  .addWithJSX('xsmall 예제', () => <Button xsmall>확인</Button>)
  .addWithJSX('primary 예제', () => <Button primary>확인</Button>)
  .addWithJSX('secondary 예제', () => <Button secondary>확인</Button>)
  .addWithJSX('primary와 small 함께 쓰는 예제', () => (
    <Button primary small>
      확인
    </Button>
  ));
