import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles, { css } from './withStyles'; //css()함수와 withStyles() 함수를 입포트하여 엘리먼트에 스타일 적용

class Button extends PureComponent {
  render() {
    const {
      children,
      disabled,
      styles,
      large,
      xlarge,
      small,
      xsmall,
      primary,
      secondary,
      onPress,
    } = this.props;
    return (
      <button
        {...css(
          styles.default, // default 스타일을 기본으로 적용
          xsmall && styles.xsmall,
          small && styles.small,
          large && styles.large,
          xlarge && styles.xlarge,
          secondary && styles.secondary,
          primary && styles.primary,
        )}
        onClick={onPress}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  secondary: PropTypes.bool,
  primary: PropTypes.bool,
  onPress: PropTypes.func,
};
Button.defaultProps = {
  onPress: () => {},
  xsmall: false,
  small: false,
  large: false,
  xlarge: false,
  secondary: false,
  primary: false,
};
export default withStyles(({ color, size, unit, responsive }) => ({
  default: {
    // 버튼의 기본 모양을 구성합니다. 전체 테두리 두께는 1px이고 2px의 둥근 테두리 모양 패딩크기는 unit *2
    border: 1,
    borderStyle: 'solid',
    borderColor: color.default,
    boarderRadius: 2,
    color: color.default,
    fontSize: size.md,
    padding: unit * 2,
    cursor: 'pointer',
    // 미디어 스타일값 responsive.small을 키로 사용하여 추가 스타일 항목을 하위 객체로 할당
    [responsive.small]: {
      width: '100%',
    },
  },
  xlarge: {
    fontSize: size.xg,
  },
  large: {
    fontSize: size.lg,
  },
  // small, xsmall 버튼의 경우 unit *1 크기의 패딩으로 조정
  small: {
    fontSize: size.sm,
    padding: unit,
  },
  xsmall: {
    fontSize: size.xs,
    padding: unit,
  },
  primary: {
    bordercolor: color.primary,
    color: color.white,
    backgroundColor: color.primary,
  },
  secondary: {
    bordercolor: color.secondary,
    color: color.secondary,
  },
}))(Button);
