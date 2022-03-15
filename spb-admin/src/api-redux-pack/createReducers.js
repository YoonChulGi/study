import { handle } from "redux-pack";
import {
  CREATE,
  /*UPDATE, FETCH,*/ FETCH_LIST,
  RESET,
  FETCH_BANNER_LIST,
  RESET_BANNER,
} from "./actionTypes";

export default (...reducerNames) => {
  return reducerNames.reduce((apiReducers, name) => {
    const initState = {
      indexes: [],
      entities: {},
      loadingState: {
        [`${CREATE}/${name}`]: false,
        // [`${UPDATE}/${name}`]: false,
        // [`${FETCH}/${name}`]: false,
        [`${FETCH_LIST}/${name}`]: false,
        [`${FETCH_BANNER_LIST}/${name}`]: false,
      },
      errorState: {
        [`${CREATE}/${name}`]: false,
        // [`${UPDATE}/${name}`]: false,
        // [`${FETCH}/${name}`]: false,
        [`${FETCH_LIST}/${name}`]: false,
        [`${FETCH_BANNER_LIST}/${name}`]: false,
      },
      pagination: {},
    };
    apiReducers[name] = (state = initState, action) => {
      const { type, payload, meta } = action;
      const { resourceName, key } = meta || {};
      if (type === FETCH_BANNER_LIST) {
        console.log({ type, payload, meta });
        console.log({ resourceName, key });
      }
      if (resourceName !== name) {
        console.log(resourceName, name);
        return state;
      }
      switch (type) {
        case CREATE:
        case FETCH_BANNER_LIST:
        case FETCH_LIST: {
          return handle(state, action, {
            start: (prevState) => ({
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
            success: (prevState) => {
              console.log("success", type);
              const { data } = payload;
              if (type === FETCH_LIST || type === FETCH_BANNER_LIST) {
                const { pageNumber, pageSize } = meta || {};

                const indexes = data.payload.map((entity) => entity[key]);
                const entities = data.payload.reduce(
                  (finalEntities, entity) => ({
                    ...finalEntities,
                    [entity[key]]: entity,
                  }),
                  {}
                );
                return {
                  ...prevState,
                  indexes,
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
                // } else if (type === CREATE) {
                //   console.log(data);
                //   const indexes = data.payload[key];
                //   return {
                //     ...prevState,
                //     indexes,
                //     entities: {
                //       ...prevState.entities,
                //       [indexes]: data.payload,
                //     },
                //     loadingState: {
                //       ...prevState.loadingState,
                //       [`${type}/${name}`]: false,
                //     },
                //     errorState: {
                //       ...prevState.errorState,
                //       [`${type}/${name}`]: false,
                //     },
                //   };
              } else {
                console.log("else");
                const indexes = data.payload[key];
                return {
                  ...prevState,
                  indexes,
                  entities: {
                    ...prevState.entities,
                    [indexes]: data.payload,
                  },
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
            failure: (prevState) => {
              // const { errorMessage } = payload.response ? payload.response.data : {};
              const { errorMessage } = payload.message || payload.errorMessage;
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
            },
          });
        }
        case RESET:
        case RESET_BANNER:
          return initState;

        default:
          return state;
      }
    };
    return apiReducers;
  }, {});
};
