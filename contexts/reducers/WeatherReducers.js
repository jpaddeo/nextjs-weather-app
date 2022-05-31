export const ACTIONS = {
  UPDATE_LOCATION: 'UPDATE_LOCATION',
};

const ACTIONS_REDUCERS = {
  [ACTIONS.UPDATE_LOCATION]: (state, action) => ({
    ...state,
    location: action.payload,
  }),
};

export default (state, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type];
  return actionReducer ? actionReducer(state, action) : state;
};
