import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles, css, withStylesPropTypes } from "../ui/withStyles";
import { HEIGHT } from "./AppNav";
import AppNavContainer from "../containers/AppNavContainer";

class AppLayout extends PureComponent {
  render() {
    const { children, styles } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <AppNavContainer />
        <div {...css(styles.body)}>{children}</div>
      </div>
    );
  }
}

AppLayout.propTypes = {
  ...withStylesPropTypes,
  children: PropTypes.node,
};

export default withStyles(({ unit }) => ({
  wrapper: {
    marginTop: HEIGHT,
  },
  body: {
    padding: unit * 4,
  },
}))(AppLayout);
