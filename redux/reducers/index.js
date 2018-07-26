import { combineReducers } from "redux";
import locationReducer from "./currentReducer";


//reducers

/* SYNTAX:   combineReducers({ object_key_in_state: reducer_name})*/
const Reducers_combiner = combineReducers({
  locations: locationReducer
});
export {Reducers_combiner}