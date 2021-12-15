import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import BoolComponent from '../03/BoolComponent';
storiesOf('BoolComponent', module)
  .addWithJSX('기본 설정', () => <BoolComponent />)
  .addWithJSX('bored 설정', () => <BoolComponent bored />);
