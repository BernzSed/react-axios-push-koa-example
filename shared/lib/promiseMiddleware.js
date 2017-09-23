export default store => next => action => {
  const { promise, type, ...rest } = action;

  if (!promise) return next(action);

  const SUCCESS = type;
  const REQUEST = type + '_REQUEST';
  const FAILURE = type + '_FAILURE';
  next({ ...rest, type: REQUEST });
  next({ type: 'LOADING_START' });
  return promise
    .then(res => {
      next({ ...rest, res, type: SUCCESS });
      next({ type: 'LOADING_COMPLETE' });

      return true;
    })
    .catch(error => {
      next({ ...rest, error, type: FAILURE });
      next({ type: 'LOADING_COMPLETE' });

      console.log('promise middleware error', error);
      return false;
    });
};
