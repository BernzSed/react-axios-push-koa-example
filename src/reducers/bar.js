import Immutable from 'immutable';
import { fromJS } from 'immutable';

const defaultState = null;

export default function barReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_BAR':
      return Immutable.fromJS(action.data);

    default:
      return state;
  }
}
