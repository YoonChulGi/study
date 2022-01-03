import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from './withStyles';
import { unit } from './Theme';

export const propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  vertical: PropTypes.number,
  horizontal: PropTypes.number,
};

class Spacing extends PureComponent {
  render() {
    const { children, top, left, right, bottom, vertical, horizontal } = this.props;
    // Spacing 컴포넌트에 간격을 따로 설정하는 top, bottom, left, right 프로퍼티 또는
    // 상하, 좌우 간격을 동일하게 설정하는 horizontal, vertical 프로퍼티를
    // computedTop, computedBottom, computedLeft, computedRight에 저장합니다.
    const computedTop = top ? top : vertical;
    const computedBottom = bottom ? bottom : vertical;
    const computedLeft = left ? left : horizontal;
    const computedRight = right ? right : horizontal;

    // 크기를 일정한 비율로 늘리는데 도움을 줍니다
    const computedStyles = {
      flex: 1, // flex값이 1이면 하위 요소가 동일한 비율로 채워집니다.
      ...(computedTop && { marginTop: computedTop * unit }), // computedTop에 값이 있으면 { marginTop: computedTop * unit })를 computedStyles 객체에 추가
      ...(computedBottom && { marginBottom: computedBottom * unit }),
      ...(computedLeft && { marginLeft: computedLeft * unit }),
      ...(computedRight && { marginRight: computedRight * unit }),
    };
    return <div {...css(computedStyles)}>{children}</div>;
  }
}

Spacing.propTypes = propTypes;

export default Spacing;
