# react-axios-push-koa-example
An example of how to use [react-axios-push](https://github.com/BernzSed/react-axios-push) to make a super-fast website with [HTTP/2 Push](https://en.wikipedia.org/wiki/HTTP/2_Server_Push).

In this example, `server.jsx` creates a new wrapped instance of axios for each request.
On the client-side, `client.jsx` creates an unwrapped instance of axios when the page is loaded.
Components that use the `withAxios` high-order-component receive that axios instance in their props, and use it to make API calls during `componentWillMount()`, which will run on both the server and the browser. However, instead of calling the API, the browser will rely on HTTP/2 push promises.

## How to run

`npm i; npm start`

You can verify that it works in Chrome's developer tools. In the network tab, the "Initiator" column will say "Push / xhr.js" if the resource was sent via push.
