import React from 'react';
import withState from 'recompose/withState';
import Button from '../04/Button';

export const withCountState = withState('count', 'setCount', 0);

function Counter({ count, setCount }) {
  const increaseCount = () => setCount((value) => value + 1); // setCount() 콜백 함수를 이용하여 increaseCount() 함수가 호출될 때 count를 1씩 증가

  return (
    <div>
      현재 카운트: {count}
      <Button onPress={increaseCount}>카운트 증가</Button>
    </div>
  );
}

export const CounterWithCountState = withCountState(Counter);
