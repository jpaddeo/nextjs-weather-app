export const ACTIONS = {
  UPDATE_TEMPERATURE: 'UPDATE_TEMPERATURE',
  UPDATE_SPEED: 'UPDATE_SPEED',
  UPDATE_CURRENT_LOCATION: 'UPDATE_CURRENT_LOCATION',
};

const ACTIONS_REDUCERS = {
  [ACTIONS.UPDATE_TEMPERATURE]: (state, action) => ({
    ...state,
    temperature: action.payload,
  }),
  [ACTIONS.UPDATE_SPEED]: (state, action) => ({
    ...state,
    speed: action.payload,
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
