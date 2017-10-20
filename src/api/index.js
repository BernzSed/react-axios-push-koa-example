import Router from 'koa-router';
import delay from 'delay';

const api = new Router({
  prefix: '/api'
});

api.get('/foo', async function foo(ctx) {
  console.log('called /foo');
  // give us time to close the browser tab
  // so we can test closing the push stream early.
  await delay(1000);

  ctx.body = { foo: 'You got Foo!' };
});

api.get('/bar', async function bar(ctx) {
  console.log('called /bar');
  // give us time to close the browser tab
  // so we can test closing the push stream early.
  await delay(1000);

  ctx.body = { bar: 'You got Bar!' };
});

export default api;
