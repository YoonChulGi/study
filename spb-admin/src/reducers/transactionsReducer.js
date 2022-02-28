import {
  SET_TRANSACTION_LIST,
  LOADING_TRANSACTION_LIST,
  SET_ERROR,
} from "../actions/transactionActions";
import { handle } from "redux-pack";
import { FETCH_TRANSACTION_LIST } from "../actions/transactionPackActions";

const initState = {
  indexes: [],
  entities: {},
  loadingState: {
    [FETCH_TRANSACTION_LIST]: false,
  },
  errorState: {
    [FETCH_TRANSACTION_LIST]: false,
  },
  pagination: {},
  pages: {},
};

export default (state = initState, action) => {
  const { type, payload, meta } = action;

  switch (type) {
    case SET_ERROR: {
      const { errorMessage } = payload;
      return {
        ...state,
        loading: false,
        hasError: true,
        errorMessage,
      };
    }
    case LOADING_TRANSACTION_LIST: {
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    }
    case SET_TRANSACTION_LIST: {
      const indexes = payload.map((entity) => entity["idx"]);
      const entities = payload.reduce(
        (finalEntities, entity) => ({
          ...finalEntities,
          [entity["idx"]]: entity,
        }),
        {}
      );
      return {
        ...state,
        indexes,
        entities,
        loading: false,
        hasError: false,
      };
    }
    case FETCH_TRANSACTION_LIST: {
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          loading: true,
          hasError: false,
          loadingState: {
            ...prevState.loadingState,
            [type]: false,
          },
          errorState: {
            ...prevState.errorState,
            [type]: false,
          },
        }),

        success: (prevState) => {
          // console.dir(payload);
          const { data } = payload;
          const loadingAndErrorState = {
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
            const indexes = data.payload.map((entity) => entity["idx"]);
            const entities = data.payload.reduce(
              (finalEntities, entity) => ({
                ...finalEntities,
                [entity["idx"]]: entity,
              }),
              {}
            );

            return {
              ...prevState,
              ...loadingAndErrorState,
              indexes,
              entities,
              pagination: {
                number: pageNumber,
                size: pageSize,
              },
              pages: {
                ...prevState.pages,
                [pageNumber]: indexes,
              },
            };
          } else {
            const indexes = data.payload["idx"];
            return {
              ...prevState,
              ...loadingAndErrorState,
              indexes,
              entities: { ...prevState.entities, [indexes]: data },
            };
          }
        },
        failure: (prevState) => {
          // const { errorMessage } = payload.response.data;
          const { errorMessage } = payload.message;
          return {
            ...prevState,
            loading: false,
            hasError: true,
            loadingState: {
              ...prevState.loadingState,
              [type]: false,
            },
            errorState: {
              ...prevState.errorState,
              [type]: errorMessage || true,
            },
          };
        },
      });
    }
    default:
      return state;
  }
};
