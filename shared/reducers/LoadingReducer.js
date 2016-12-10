import Immutable from 'immutable';

const defaultState = {
  pending: 0
};

export default function loadingReducer(state = defaultState, action) {
  switch(action.type) {
    case 'LOADING_START':
      console.log('loading start');
      return {...state, pending: state.pending + 1};
    case 'LOADING_COMPLETE':
      console.log('loading complete');
      return {...state, pending: state.pending - 1};
    default:
      return state;
  }
}
