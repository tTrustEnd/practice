import { combineReducers } from "redux";

import userReducerRedux from './userReducer'

const rootReducer = combineReducers({
        user: userReducerRedux,
    });
export default rootReducer;