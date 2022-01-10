import {
    FETCH_TRANSACTION_LIST,
    CREATE_TRANSACTION
} from '../actions/transasctionPackActions';
import { createSelector } from 'reselect';

// 스토어 데이터에서 거래 정보를 추출하는 셀렉터
export const transactionsSelector = state => state.transactions; 
// 그래프 DB 구조의 거래 목록 자료를 원본 배열로 변환하는 셀렉터
export const transactionListSelector = (state) => {
    const { ids, entities } = transactionsSelector(state);
    return entities.map(id => entities[id]);
}
export const transactionListSelector = createSelector(
    [transactionsSelector],
    (transactions) => {
        const{ ids, entities } = transactions;
        return ids.map(id => entities[id]);
    }
);
// 거래 정보의 전체 로딩 정보 객체를 추출하는 셀렉터
export const loadingStateSelector = state => transactionsSelector(state).loadingState;
// 전체 거래 목록 요청의 로딩 상태만을 추출하는 셀렉터
export const transactionListLoadingSelector = state => loadingStateSelector(state)[FETCH_TRANSACTION_LIST];
// 거래 생성 요청의 로딩 상태만을 추출하는 셀렉터
export const transactionCreateLoadingStateSelector = state => loadingStateSelector(state)[CREATE_TRANSACTION];
