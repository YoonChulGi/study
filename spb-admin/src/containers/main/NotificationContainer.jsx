import { connect } from "react-redux";
import Notification from "../../components/main/Notification";

const mapStateToProps = (state) => {
  const { showMessage, message, warning } = state.notification;
  return { showMessage, message, warning };
};

export default connect(mapStateToProps)(Notification);
