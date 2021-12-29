import React from 'react';
import Button from '../04/Button';
import { Consumer } from './LoadingProviderWithNewContext';

function ButtonWithNewConsumer({ children }) {
  return (
    <React.Fragment>
      <Consumer
        children={(value) => (
          <Button onPress={() => value.setLoading('loading', !value.loading)}>
            {value.loading ? '로딩 중' : children}
          </Button>
        )}
      />
      <Consumer
        children={({ loading2 = false, setLoading }) => (
          <Button onPress={() => setLoading('loading2', !loading)}>
            {loading2 ? '로딩 중' : children}
          </Button>
        )}
      />
      <Consumer
        children={({ loding = false, loading2 = false }) => (
          <Button>{loading && loding2 ? '로딩 중' : children}</Button>
        )}
      />
    </React.Fragment>
  );
}
