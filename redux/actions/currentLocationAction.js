import {DESTINATION_LOCATION, PLACEHOLDER} from "../types/Types";

// send current location to state
const initialState = {
    text:''
}

export const setPlaceholder = text => {
  return {
    type: PLACEHOLDER,
    payload: text
  };
};

export const setDestination = location => {
    return {
        type: DESTINATION_LOCATION,
        payload: location
    };
};
