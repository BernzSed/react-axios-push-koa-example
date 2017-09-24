import Router from 'koa-router';
import delay from 'delay';

const api = new Router({
  prefix: '/api'
});

api.get('/foo', foo);

async function foo(ctx) {
  await delay(500);
  ctx.body = { thing: 'You got the thing!' };
}

export default api;
