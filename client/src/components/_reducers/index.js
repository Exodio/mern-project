// Flow: user(makes request) => actions folder(checks action type) => DB(server) => response(data) => actions folder(check user action data) => reducers folder => reducer dispatch(data) => Browser(client)
import { combineReducers } from "redux";

import user from "./user_reducer";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;