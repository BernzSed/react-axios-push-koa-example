import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/foobar';

function mapStateToProps(state) {
  return {
    foo: state.foo,
    bar: state.bar
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

class App extends React.Component {
  static propTypes: {
    actions: PropTypes.obj.isRequired,
    foo: PropTypes.any
  }

  componentWillMount() {
    // Call the action in componentWillMount, not componentDidMount, so it
    // is called during both server-side and client-side rendering.
    // The actual API call will only be made once, because the browser will wait
    // for the push_promise to be fulfilled, rather than making another call.
    this.props.actions.getFooBar();
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
