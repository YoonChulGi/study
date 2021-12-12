import React, { Component } from 'react';

class CounterExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.increaseCount = this.increaseCount.bind(this);
  }
  increaseCount() {
    this.setState((prevState) => {
      const newState = {
        count: prevState.count + 1,
      };
      return newState;
    });
  }
  render() {
    return (
      <div>
        <span>카운트: {this.state.count}</span>
        <button onClick={this.increaseCount}>카운트 증가</button>
      </div>
    );
  }
}

export default CounterExample;
