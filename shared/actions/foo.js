
export const getFoo = () => (dispatch, getState, apiClient) => {
  return apiClient.get('/api/foo').then(
    response => dispatch({
      type: 'GET_FOO',
      data: response.data
    }),
    err => global.console.error('could not get foo', err)
  );
}
