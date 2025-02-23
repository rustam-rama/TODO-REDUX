export const INCREASE_AGE = "INCREASE_AGE";
export const RESET_AGE = "RESET_AGE";

// Создаём action creators
export const increaseAge = (value) => ({
  type: INCREASE_AGE,
  payload: value,
});

export const resetAge = () => ({
  type: RESET_AGE,
});
