export const ADD_RIGHT_WEIGHT = "ADD_RIGHT_WEIGHT";
export const ADD_LEFT_BLOCK = "ADD_LEFT_BLOCK";

export const addRightWeight = (weight) => ({
  type: ADD_RIGHT_WEIGHT,
  weight,
});

export const addLeftBlock = (block) => ({
  type: ADD_LEFT_BLOCK,
  block,
});
