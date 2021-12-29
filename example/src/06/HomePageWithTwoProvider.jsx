import React, { PureComponent } from 'react';
import {
  ButtonWithDefaultLoadingContext,
  ButtonWithLoading2Context,
} from './ButtonWithLoadingContextAndKey'; // 곧 구현할 소비자를 임포트
import LoadingProviderWithKey from './LoadingProviderWithKey';
import ButtonWithConsumer from './ButtonWithConsumer';

const LoadingProvider1 = LoadingProviderWithKey();
const LoadingProvider2 = LoadingProviderWithKey('loading2');

function TableComponent() {
  return (
    <table>
      <ButtonWithDefaultLoadingContext>컨텍스트1</ButtonWithDefaultLoadingContext>
      <ButtonWithLoading2Context>컨텍스트2</ButtonWithLoading2Context>
      <ButtonWithConsumer>다중 소비자 예제</ButtonWithConsumer>
    </table>
  );
}

class HomePageWithTwoProvider extends PureComponent {
  render() {
    return (
      <LoadingProvider1>
        <LoadingProvider2>
          <TableComponent />
        </LoadingProvider2>
      </LoadingProvider1>
    );
  }
}

export default HomePageWithTwoProvider;
