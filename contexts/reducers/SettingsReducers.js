export const ACTIONS = {
  UPDATE_TEMPERATURE_UNIT: 'UPDATE_TEMPERATURE_UNIT',
  UPDATE_SPEED_UNIT: 'UPDATE_SPEED_UNIT',
  UPDATE_THEME: 'UPDATE_THEME',
  UPDATE_LOCATION_SELECTOR_OPEN: 'UPDATE_LOCATION_SELECTOR_OPEN',
};

const ACTIONS_REDUCERS = {
  [ACTIONS.UPDATE_TEMPERATURE_UNIT]: (state, action) => ({
    ...state,
    temperatureUnit: action.payload,
  }),
  [ACTIONS.UPDATE_SPEED_UNIT]: (state, action) => ({
    ...state,
    speedUnit: action.payload,
  }),
  [ACTIONS.UPDATE_THEME]: (state, action) => ({
    ...state,
    theme: action.payload,
  }),
  [ACTIONS.UPDATE_LOCATION_SELECTOR_OPEN]: (state, action) => ({
    ...state,
    locationSelectorOpen: action.payload,
  }),
};

export default (state, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type];
  return actionReducer ? actionReducer(state, action) : state;
};
