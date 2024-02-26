import { POST_FLIGHT, GET_SAVED_FLIGHT , SELECTED_FLIGHT} from "../actions/types";

const initialState = {
  savedFlights: [],
  selectedFlights : []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_FLIGHT:
      //when user save a flight to planner, update that to savedFlights
      return {
        ...state,
        savedFlights: [...action.payload]
      }
    ;
    case GET_SAVED_FLIGHT:
    return {
        ...state,
        savedFlights: [...action.payload]
    }
    case SELECTED_FLIGHT:
    return {
        ...state,
        selectedFlights: [...state.selectedFlights,action.payload],
    }

    default:
      return state;
  }
}
