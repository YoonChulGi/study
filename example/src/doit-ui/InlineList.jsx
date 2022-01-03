import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from './withStyles';
import { unit } from './Theme';

class InlineList extends PureComponent {
  render() {
    const { align, children, styles, spacingBetween, verticalAlign } = this.props;
    return (
      <div
        {...css(
          styles.wrapper, // withStyles의 wrapper 속성으로 가로 배치를 위한 속성들을 적용
          align === 'center' && styles.alignCenter, // align 프로퍼티값이 center이면 하위 요소를 가운데 정렬
          align === 'right' && styles.alignRight, // align 프로퍼티값이 right이면 하위 요소를 오른쪽 정렬
          verticalAlign === 'top' && styles.verticalAlignTop, // verticalAlign 프로퍼티값이 top이면 하위 요소의 내용을 위로 정렬
          verticalAlign === 'bottom' && styles.verticalAlignBottom, // verticalAlign 프로퍼티값이 bottom이면 하위 요소의 내용을 아래로 정렬
        )}
      >
        {React.Children.map(children, (child) => (
          <div {...css({ marginRight: spacingBetween * unit })}>{child}</div> // spacingBetween 프로퍼티값에 unit을 곱한 만큼 하위 요소의 간격을 지정
        ))}
      </div>
    );
  }
}

InlineList.propTypes = {
  ...withStylesPropTypes,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  spacingBetween: PropTypes.number,
  children: PropTypes.node,
};

InlineList.defaultProps = {
  spacingBetween: 1,
};

export default withStyles(() => ({
  wrapper: {
    display: 'flex', // withStyles의 wrapper 속성으로 가로 배치를 위한 속성들을 적용
    flexDirection: 'row', // withStyles의 wrapper 속성으로 가로 배치를 위한 속성들을 적용
    flexWrap: 'wrap', // flexWrap의 속성을 wrap으로 설정하면 화면 밖의 하위 요소를 아래로 밀어 배치
    justifyContent: 'flex-start', // justifyContent의 속성을 flex-start로 설정하면 하위 요소를 왼쪽부터 배치
    alignItems: 'center', // alignItems의 속성을 center로 설정하면 하위 요소를 상하 가운데 정렬
  },
  alignCenter: {
    justifyContent: 'center', // align 프로퍼티값이 center이면 하위 요소를 가운데 정렬
  },
  alignRight: {
    justifyContent: 'flex-end', // align 프로퍼티값이 right이면 하위 요소를 오른쪽 정렬
  },
  verticalAlignTop: {
    alignItems: 'flex-start', // verticalAlign 프로퍼티값이 top이면 하위 요소의 내용을 위로 정렬
  },
  verticalAlignBottom: {
    alignItems: 'flex-end', // verticalAlign 프로퍼티값이 bottom이면 하위 요소의 내용을 아래로 정렬
  },
}))(InlineList);
