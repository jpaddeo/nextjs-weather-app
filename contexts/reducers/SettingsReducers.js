export const ACTIONS = {
  UPDATE_TEMPERATURE_UNIT: 'UPDATE_TEMPERATURE_UNIT',
  UPDATE_SPEED_UNIT: 'UPDATE_SPEED_UNIT',
  UPDATE_CURRENT_LOCATION: 'UPDATE_CURRENT_LOCATION',
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
  [ACTIONS.UPDATE_CURRENT_LOCATION]: (state, action) => ({
    ...state,
    currentLocation: action.payload,
  }),
};

export default (state, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type];
  return actionReducer ? actionReducer(state, action) : state;
};
