import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import {Reducers_combiner} from "./reducers";
import locationReducer from "./reducers/currentReducer";

const initialState = {locations:''
};
const middeware = [thunk];

//
//   STORE...
//SYNTAX:    createStore( Combinereducer, initialState, applyMiddleware(...middeware)// );
const store = createStore(
    locationReducer,
  initialState,
    applyMiddleware(...middeware)
);
export {store};
