import { handle } from 'redux-pack';
import { CREATE, UPDATE, FETCH, FETCH_LIST, RESET } from './actionTypes';

export default (...reducerNames) => {
    return reducerNames.reduce((apiReducers, name) => {
        const initState = {
            ids: [],
            entities: {},
            loadingState: {
                [`${CREATE}/${name}`]: false,
                [`${UPDATE}/${name}`]: false,
                [`${FETCH}/${name}`]: false,
                [`${FETCH_LIST}/${name}`]: false,
            },
            errorState: {
                [`${CREATE}/${name}`]: false,
                [`${UPDATE}/${name}`]: false,
                [`${FETCH}/${name}`]: false,
                [`${FETCH_LIST}/${name}`]: false,
            },
            pagination: {},
        };
        apiReducers[name] = (state = initState, action) => {
            const { type, payload, meta } = action;
            const { resourceName, key } = meta || {};

            if (resourceName !== name) { // 서로 다른 데이터를 처리할 때 같은 액션 type을 사용할 것이므로 액션에서 포함시킨 meta의 resourceName과 리듀서의 이름이 일치한 경우에만 리듀서 코드를 실행
                return state;
            }
            switch (type) {
                case UPDATE:
                case FETCH:
                case CREATE:
                case FETCH_LIST: {
                    return handle(state, action, {
                        start: prevState => ({
                            ...prevState,
                            loadingState: {
                                ...prevState.loadingState,
                                [`${type}/${name}`]: true,
                            },
                            errorState: {
                                ...prevState.errorState,
                                [`${type}/${name}`]: false,
                            },
                        }),
                        success: prevState => {
                            const { data } = payload;
                            if( type === FETCH_LIST) {
                                const { pageNumber, pageSize } = meta || {};
                                const ids = data.map(entity => entity[key]);
                                const entities = data.reduce(
                                    (finalEntities, entity) => ({
                                        ...finalEntities,
                                        [entity[key]]: entity
                                    }),
                                    {}
                                );
                                return {
                                    ...prevState,
                                    ids,
                                    entities: { ...prevState.entities, ...entities },
                                    loadingState: {
                                        ...prevState.loadingState,
                                        [`${type}/${name}`]: false,
                                    },
                                    errorState: {
                                        ...prevState.errorState,
                                        [`${type}/${name}`]: false,
                                    },
                                    pagination: {
                                        number: pageNumber,
                                        size: pageSize,
                                    },
                                };
                            } else {
                                const id = data[key];
                                return {
                                    ...prevState,
                                    id,
                                    entities: { ...prevState.entities, [id]: data },
                                    loadingState: {
                                        ...prevState.loadingState,
                                        [`${type}/${name}`]: false,
                                    },
                                    errorState: {
                                        ...prevState.errorState,
                                        [`${type}/${name}`]: false,
                                    },
                                };
                            }
                        },
                        failure: prevState => {
                            const { errorMessage } = payload.response ? payload.response.data : {};
                            return {
                                ...prevState,
                                loadingState: {
                                    ...prevState.loadingState,
                                    [`${type}/${name}`]: false,
                                },
                                errorState: {
                                    ...prevState.errorState,
                                    [`${type}/${name}`]: errorMessage || true,
                                },
                            };
                        }
                    });
                }
                case RESET:
                    return initState;
                default:
                    return state;
            }
        };
        return apiReducers;
    }, {});
};