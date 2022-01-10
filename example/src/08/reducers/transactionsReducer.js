import { 
    SET_TRANSACTION_LIST, 
    LOADING_TRANSACTION_LIST, 
    SET_ERROR 
} from "../actions/transactionActions";
import { handle } from 'redux-pack';
import { 
    CREATE_TRANSACTION,
    FETCH_TRANSACTION_LIST
} from "../actions/transasctionPackActions";

const initState = {
    ids: [],
    entities: {},
    loadingState: {
        [CREATE_TRANSACTION]: false,
        [FETCH_TRANSACTION_LIST]: false,
    },
    errorState: {
        [CREATE_TRANSACTION]: false,
        [FETCH_TRANSACTION_LIST]: false,
    },
    pagination: {},
    pages: {},
};

export default ( state = initState, action) => {
    const { type, payload, meta } = action;

    switch (type) {
        case SET_ERROR: {
            const { errorMessage } = payload;
            return {
                ...state, 
                loading: false,
                hasError: true,
                errorMessage,
            }
        }
        case LOADING_TRANSACTION_LIST: {
            return {
                ...state,
                loading: true, 
                hasError: false,
            }
        }
        case SET_TRANSACTION_LIST: {
            const ids = payload.map(entity => entity['id']);
            const entities = payload.reduce((finalEntities, entity)=> ({
                ...finalEntities,
                [entity['id']]: entity,
            }), {});
            return { 
                ...state,
                ids,
                entities, 
                loading: false,
                hasError: false,
            }; 
        }
        case CREATE_TRANSACTION:
        case FETCH_TRANSACTION_LIST: {
            return handle(state, action, {
                
                start: prevState => ({
                    ...prevState, 
                    loading: true,
                    hasError: false,
                    loadingState: { // 액션 type에 따라 loadingState값을 분리하여 저장
                        ...prevState.loadingState,
                        [type]: true,
                    },
                    errorState: {
                        ...prevState.errorState,
                        [type]: false,
                    },
                }),
                
                success: prevState => {
                    const { data } = payload;
                    const loadingAndErrorState = { // FETCH_TRANSACTION_LIST와 CREATE_TRANSACTION 모두에 해당하는 loadingState와 errorState의 초깃값을 정의
                        loadingState: {
                            ...prevState.loadingState,
                            [type]: false,
                        }, 
                        errorState: {
                            ...prevState.errorState,
                            [type]: false,
                        },
                    };
                    if (type === FETCH_TRANSACTION_LIST) {
                        const { pageNumber, pageSize } = meta || {};
                        const ids = data.map(entity => entity['id']);
                        const entities = data.reduce(
                            (finalEntities, entity) => ({
                                ...finalEntities,
                                [entity['id']]: entity,
                            }),
                            {},
                        );
                    
                        return {
                            ...prevState,
                            ...loadingAndErrorState, // FETCH_TRANSACTION_LIST와 CREATE_TRANSACTION 모두에 해당하는 loadingState와 errorState의 초깃값을 정의
                            ids,
                            entities: { ...prevState.entities, ...entities },
                            pagination: {
                                number: pageNumber,
                                size: pageSize,
                            },
                            pages: {
                                ...prevState.pages,
                                [pageNumber]: ids
                            }
                        };
                    } else {
                        const id = data['id']; // axios의 response 데이터 중 id값을 추출
                        return {
                            ...prevState,
                            ...loadingAndErrorState, // FETCH_TRANSACTION_LIST와 CREATE_TRANSACTION 모두에 해당하는 loadingState와 errorState의 초깃값을 정의
                            id,
                            entities: { ...prevState.entities, [id]: data }, // 그래프 DB의 entities 객체에 추가된 자료를 id 키값에 할당
                        };
                    }
                },
                failure: prevState => {
                    const { errorMessage } = payload.response.data;
                    return {
                        ...prevState,
                        loading: false,
                        hasError: true,
                        loadingState: { // 액션 type에 따라 loadingState값을 분리하여 저장
                            ...prevState.loadingState,
                            [type]: false,
                        },
                        errorState: {
                            ...prevState.errorState,
                            [type]: errorMessage || true, // 오류 메시지를 포함히지 않을 경우 true를 할당하여 오류가 발생한 상태임을 표시합니다.
                        },  
                    };
                },
            });
        }
        default:
            return state;
    }
};