import * as types from "../actions";

const initState = {
  weightRight: 0,
  leftSide: [],
};

const app = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_RIGHT_WEIGHT:
      return {
        ...state,
        weightRight: action.weight,
      };
    case types.ADD_LEFT_BLOCK:
      return {
        ...state,
        leftSide: [...state.leftSide, action.block],
      };
    default:
      return state;
  }
};

export default app;
