import request from 'axios';

const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';

export function createTodo(text) {
  return {
    promise: request.post(BACKEND_URL, { text }),
    type: 'CREATE_TODO',
    text
  }
}

export function editTodo(id, text) {
  return {
    type: 'EDIT_TODO',
    id,
    text,
    date: Date.now()
  };
}

export function deleteTodo(id) {
  return {
    type: 'DELETE_TODO',
    id
  };
}

export function getTodos() {
  global.console.log('getTodos() action');
  return {
    type: 'GET_TODOS____TEMPORARILY_DOING_NOTHING',
    // promise: request.get(BACKEND_URL)
    // promise: Promise.resolve([])
  }
}

// export function getTodos() {
//   return {
//     type: 'GET_TODOS',
//     todos: ['first_task', 'second_task']
//   }
// }

export const getFoo = () => (dispatch, getState, axios) => {
  global.console.log('getFoo()');
  return axios.get('/api/foo').then(
    foo => console.log('got foo', foo),
    err => console.log('could not get foo', err)
  );
}
