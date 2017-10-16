import Router from 'koa-router';
import delay from 'delay';

const api = new Router({
  prefix: '/api'
});

api.get('/foo', foo);

async function foo(ctx) {
  console.log('called /foo');
  // give us time to close the browser tab
  // so we can test closing the push stream early.
  await delay(1000);

  ctx.body = { thing: 'You got the thing!' };
}

export default api;
