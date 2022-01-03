import { connect } from 'react-redux';
import ActionComponent from '../ActionComponent01'; // 화면 컴포넌트

import { setAge } from '../actions/collectionActions02'; // SET_AGE 액션 타입을 호출하는 setAge() 함수를 임포트

const mapDispatchToProps = (dispatch) => {
  return {
    setAge: (id, age) => dispatch(setAge(id, age)),
  };
};

export default connect(null, mapDispatchToProps)(ActionComponent); // 첫 번째 인자인 mapStateToProps는 생략
