import React, { PureComponent } from "react";
import { withStyles, css, withStylesPropTypes } from "../ui/withStyles";
import Heading from "../ui/Heading";
import InlineList from "../ui/InlineList";
import Button from "../ui/Button";

import { Consumer as Modal } from "../ui/Modal/context";
import { ADD_ADMIN_MODAL, MANAGE_BANNER } from "../constants/modals";

// import { logoutAdmin } from "../actions/adminActions";

export const HEIGHT = 64;

class AppNav extends PureComponent {
  render() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const { styles, logoutAdmin } = this.props;
    return (
      <Modal>
        {({ openModal }) => (
          <div {...css(styles.wrapper)}>
            <div {...css(styles.container)}>
              <Heading level={3} inverse>
                Spb Admin
              </Heading>
              {isLoggedIn === "true" ? (
                <InlineList align="right">
                  <Button
                    inverse
                    bold
                    large
                    onPress={() => openModal(MANAGE_BANNER)}
                  >
                    배너 광고 관리
                  </Button>
                  <Button
                    inverse
                    bold
                    large
                    onPress={() => openModal(ADD_ADMIN_MODAL)}
                  >
                    관리자 추가
                  </Button>
                  <Button inverse bold large onPress={() => logoutAdmin()}>
                    로그아웃
                  </Button>
                </InlineList>
              ) : null}
            </div>
          </div>
        )}
      </Modal>
    );
  }
}

AppNav.propTypes = {
  ...withStylesPropTypes,
};

export default withStyles(({ color, depth, unit }) => ({
  wrapper: {
    ...depth.level1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: HEIGHT - 4,
    backgroundColor: color.primary,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: unit * 2,
    paddingRight: unit * 2,
  },
}))(AppNav);
