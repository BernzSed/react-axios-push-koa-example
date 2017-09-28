import Immutable from 'immutable';
import { fromJS } from 'immutable';

const defaultState = null;

export default function fooReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_FOO':
      return Immutable.fromJS(action.data);

    default:
      return state;
  }
}
