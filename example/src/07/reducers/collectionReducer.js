import { SET_COLLECTION } from '../actions/collectionActions01';
import { SET_AGE } from '../actions/collectionActions02';

const initState = {
    ids: [],
    entities: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;
    
    switch(type) {
        case SET_COLLECTION: {
            // payload의 하위에 ids에 entities를 저장합니다. 
            const ids = payload.map(entity=>entity['id']);
            const entities = payload.reduce((finalEntities, entity)=>({
                ...finalEntities,
                [entity['id']]: entity,
            }),{});
            return { ...state, ids, entities };
        }
        case SET_AGE: {
            const { id, age } = payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [id]: { ...state.entities[id],age},
                },
            };
        }
        default:
            return state;
    }
};