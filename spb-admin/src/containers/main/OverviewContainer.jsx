import { connect } from "react-redux";
import OverView from "../../components/main/Overview";

import { requestOverviewList } from "../../actions/overviewPackActions";
import { overviewListSelector } from "../../selectors/overviewSelectors";

const mapStateToProps = (state) => {
  return {
    overviewList: overviewListSelector(state),
  };
};
const mapDispatchToProps = {
  requestOverviewList,
};

export default connect(mapStateToProps, mapDispatchToProps)(OverView);
