import React from 'react';
import PropTypes from 'prop-types';
import { withAxios } from 'react-axios-push';

class App extends React.Component {
  static propTypes: {
  }

  componentWillMount() {
    // Make your API calls in componentWillMount, not componentDidMount, so it
    // runs during both server-side and client-side rendering.
    // The actual API call will only be made once, because the browser will wait
    // for the push_promise to be fulfilled, rather than making another call.
    this.getFooBar();
  }

  async getFooBar() {
    try {
      const fooResponse = await this.props.axios.get('/foo', {
        chained: true
      });

      console.log('got foo!', fooResponse.data);

      this.setState({
        foo: fooResponse.data
      });

      const barResponse = await apiClient.get('/bar');

      console.log('got bar!', barResponse.data);

      this.setState({
        bar: barResponse.data
      });
    } catch(err) {
      console.error('could not get foo,bar', err);
      return;
    }
  }

  render() {
    return (
      <div>
        <h1>Push it!</h1>
        <p>
          This page calls the api endpoint <code>/api/foo</code>, followed
          by <code>/api/bar</code>.
          The results are displayed below.
        </p>
        <p>
          {this.props.foo ?
            <samp>{JSON.stringify(this.props.foo)}</samp> :
            <progress />
          }
          <br />
          {this.props.bar ?
            <samp>{JSON.stringify(this.props.bar)}</samp> :
            <progress />
          }
        </p>
        <p>
          In Chrome's developer tools, you should be able to see this
          under the network tab. In the "Initiator" column, it will say
          "Push / xhr.js".
        </p>
        <p>
          For a more detailed look at what's going on, check out
          Chrome's net internals,
          at: <samp>chrome://net-internals/#http2</samp>
        </p>
      </div>
    );
  }
}

export default withAxios(App);
