import createReducer from "../../library/createReducer";

const SOME_EVENT = "/home/event";

const initialState = {
  someState: false
};

export default createReducer(initialState, {
  [SOME_EVENT]: (state, action) => {
    return {
      ...state,
      someState: action.payload
    };
  }
});

export function triggerEvent(eventPayload) {
  return {
    type: SOME_EVENT,
    payload: eventPayload
  };
}
