export const SET_FILTER = 'searchFilter/SET_FILTER';
export const RESET_FILTER = 'searchFilter/RESET_FILTER';

export const setFilter = (filterName, value) =>({ // filter: 검색 항목의 이름, value: 검색값.. 나이를 검색하려면 filter는 age, value는 실제 입력한 숫자
    type: SET_FILTER,
    payload: {
        filterName,
        value,
    },
});

export const resetFilter = () => ({
    type: RESET_FILTER,
});