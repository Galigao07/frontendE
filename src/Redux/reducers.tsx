/* eslint-disable @typescript-eslint/no-explicit-any */
import { SET_BOOLEAN_VALUE } from './actions';

const initialState = {
  booleanValue: false, // Initial state
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_BOOLEAN_VALUE:
      return {
        ...state,
        booleanValue: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;