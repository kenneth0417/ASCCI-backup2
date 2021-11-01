import { combineReducers } from "redux";

import user from "./user";
import concern from "./concern";
import categories from "./categories";
import accounts from "./accounts";
import semester from "./semester";

export const reducers = combineReducers({
  user,
  concern,
  categories,
  accounts,
  semester,
});
