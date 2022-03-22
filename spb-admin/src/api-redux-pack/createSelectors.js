import { createSelector } from "reselect";
import {
  CREATE,
  /*UPDATE,*/ FETCH_LIST,
  FETCH_BANNER_LIST,
  FETCH_LOGIN_LOG_LIST,
} from "./actionTypes";

export default function createSelectors(resourceName) {
  const resourceSelector = (state) => state[resourceName];
  const entitiesSelector = (state) => resourceSelector(state).entities;
  const collectionSelector = createSelector(
    [resourceSelector],
    ({ indexes, entities }) => indexes.map((idx) => entities[idx])
    // ({ ids, entities }) => ids.map((id) => entities[id])
  );
  const bannerSelector = createSelector(
    [resourceSelector],
    ({ indexes, entities }) => indexes.map((idx) => entities[idx])
  );
  const loginLogSelector = createSelector(
    [resourceSelector],
    ({ indexes, entities }) => indexes.map((idx) => entities[idx])
  );
  const loadingStateSelector = (state) => resourceSelector(state).loadingState;
  // const errorStateSelector = (state) => resourceSelector(state).errorState;
  const collectionLoadingStateSelector = (state) =>
    loadingStateSelector(state)[`${FETCH_LIST}/${resourceName}`];
  const bannerLoadingStateSelector = (state) =>
    loadingStateSelector(state)[`${FETCH_BANNER_LIST}/${resourceName}`];
  const loginLogLoadingStateSelector = (state) =>
    loadingStateSelector(state)[`${FETCH_LOGIN_LOG_LIST}/${resourceName}`];
  const createLoadingStateSelector = (state) =>
    loadingStateSelector(state)[`${CREATE}/${resourceName}`];
  // const updateLoadingStateSelector = state => loadingStateSelector(state)[`${UPDATE}/${resourceName}`];
  // const memberLoadingStateSelector = state => loadingStateSelector(state)[`${FETCH}/${resourceName}`];

  // const collectionErrorSelector = (state) =>
  //   errorStateSelector(state)[`${FETCH_LIST}/${resourceName}`];
  // const createErrorStateSelector = state => errorStateSelector(state)[`${CREATE}/${resourceName}`];
  // const updateErrorStateSelector = state => errorStateSelector(state)[`${UPDATE}/${resourceName}`];
  // const memberErrorStateSelector = state => errorStateSelector(state)[`${FETCH}/${resourceName}`];

  const paginationSelector = (state) => {
    const { pagination } = resourceSelector(state);
    return {
      number: pagination.number || 0,
      size: pagination.size,
    };
  };

  return {
    resourceSelector,
    entitiesSelector,
    collectionSelector,
    bannerSelector,
    collectionLoadingStateSelector,
    bannerLoadingStateSelector,
    createLoadingStateSelector,
    // updateLoadingStateSelector,
    // memberLoadingStateSelector,
    loginLogSelector,
    loginLogLoadingStateSelector,

    paginationSelector,
  };
}
