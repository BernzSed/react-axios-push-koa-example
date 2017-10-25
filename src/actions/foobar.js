export const getFooBar = () => async (dispatch, getState, apiClient) => {
  try {
    const foo = await apiClient.get('/foo', {
      chainedRequest: true
    });
    console.log('got foo!', foo.data);

    dispatch({
      type: 'GET_FOO',
      data: foo.data
    });

    const bar = await apiClient.get('/bar');

    console.log('got bar!', bar.data);

    return dispatch({
      type: 'GET_BAR',
      data: bar.data
    });
  } catch(err) {
    console.error('could not get foo,bar', err);
    return;
  }
}
