import { connect } from "react-redux";
import Notification from "../../components/main/Notification";

const mapStateToProps = (state) => {
  const { showMessage, message, warning } = state.notification;
  console.log(state.notification);
  return { showMessage, message, warning };
};

export default connect(mapStateToProps)(Notification);
