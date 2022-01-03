import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../04/Button';

class ActionComponent extends PureComponent {
  render() {
    const { setAge } = this.props;
    return (
      <>
        <Button onPress={() => setAge(2, 19)}>id 2번 나이 19세로 변경</Button>
      </>
    );
  }
}

ActionComponent.propTypes = {
  setAge: PropTypes.func,
};

export default ActionComponent;
