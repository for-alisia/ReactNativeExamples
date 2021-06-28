export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const SET_FILTERS = 'SET_FILTERS';

export const toggleFavourite = (mealId) => {
  return {
    type: TOGGLE_FAVOURITE,
    payload: mealId
  }
}

export const setFilters = (filterSettings) => {
  return {
    type: SET_FILTERS,
    payload: filterSettings
  }
}