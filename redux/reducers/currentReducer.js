import {CURRENT_LOCATION, DESIRED_LOCATION, DESTINATION_LOCATION, PLACEHOLDER} from "../types/Types";

//
// REDUCER
//
const initialState = {
  currentLocation: {},
  desiredLocation: {},
  destinationLocation: {}
};

const locationReducer = function(state = initialState, action) {
  switch (action.type) {
    case DESIRED_LOCATION:
      return {
        ...state,
        desiredLocation: action.payload
      };
    case CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload
      };
    case DESTINATION_LOCATION:
      return {
        ...state,
        destinationLocation: action.payload
      };
      case PLACEHOLDER:
          return {
              ...state,
              text: action.payload
          };
    default:
      return state;
  }
}
export default locationReducer