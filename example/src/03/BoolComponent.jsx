import React, { Component } from 'react';

class BoolComponent extends Component {
  render() {
    const msg = this.props.bored ? '놀러가자~~~' : '일부터 마무리해!!';
    return <div className="message-container">{msg}</div>;
  }
}

export default BoolComponent;
