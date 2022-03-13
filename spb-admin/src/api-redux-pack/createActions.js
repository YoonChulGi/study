import {
  FETCH_LIST,
  CREATE,
  /*UPDATE, FETCH,*/ RESET,
  LOGIN,
  LOGOUT,
  UPLOAD_BANNER,
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
  login: (data, params = {}, meta = {}) => ({
    type: LOGIN,
    promise: Api.post(resourceName, data, { params }),
    meta: {
      ...meta,
      key: "email",
      resourceName,
    },
  }),
  logout: (meta = {}) => ({
    type: LOGOUT,
    promise: Api.get(resourceName),
    meta: {
      ...meta,
      key: "email",
      resourceName,
    },
  }),
  upload: (data, params = {}, meta = {}) => ({
    type: UPLOAD_BANNER,
    promise: Api.post(resourceName, data, { params }),
    meta: {
      ...meta,
      resourceName,
    },
  }),
});
