# axios-push-koa-redux-example
An example of how to use [axios-push](https://github.com/BernzSed/axios-push) to make a super-fast website with [HTTP/2 Push](https://en.wikipedia.org/wiki/HTTP/2_Server_Push), using [koa](http://koajs.com/), [react](https://reactjs.org/), and [redux](http://redux.js.org/).

In this example, `server.jsx` creates a new wrapped instance of axios for each request, and passes it to the redux actions using [redux-thunk](https://github.com/gaearon/redux-thunk)'s `withExtraArgument()` function.  
On the client-side, `client.jsx` creates an unwrapped instance of axios when the page is loaded.

The same redux actions are executed on both the server and client, but the resulting API calls are only made by the server. Instead of calling the API, the browser will rely on HTTP/2 push promises.

## How to run

`npm i; npm start`

You can verify that it works in Chrome's developer tools. In the network tab, the "Initiator" column will say "Push / xhr.js" if the resource was sent via push.
