import {
  FETCH_LIST,
  CREATE,
  /*UPDATE, FETCH,*/ RESET,
  // ADD_ADMIN,
} from "./actionTypes";
import Api from "../Api";

export default (resourceName, key = "idx") => ({
  collection: (params = {}, meta = {}) => ({
    type: FETCH_LIST,
    promise: Api.get("/api/checkout", { params }),
    meta: {
      ...meta,
      key,
      resourceName,
    },
  }),
  reset: () => ({
    type: RESET,
    meta: { resourceName },
  }),
  create: (data, params = {}, meta = {}) => ({
    type: CREATE,
    promise: Api.post(resourceName, data, { params }),
    meta: {
      ...meta,
      key: "id",
      resourceName,
    },
  }),
});
