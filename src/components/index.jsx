import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as fooActions from '../actions/foo';

function mapStateToProps(state) {
  return { foo: state.foo };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fooActions, dispatch) };
}

class App extends React.Component {
  propTypes: {
    actions: PropTypes.obj.isRequired,
    foo: PropTypes.any
  }

  componentWillMount() {
    // Call the action in componentWillMount, not componentDidMount, so it
    // is called during both server-side and client-side rendering.
    // The actual API call will only be made once, because the browser will wait
    // for the push_promise to be fulfilled, rather than making another call.
    this.props.actions.getFoo();
  }

  render() {
    return (
      <div>
        <h1>Push it!</h1>
        <p>
          This page calls the api endpoint <code>/api/foo</code>.
          The result is displayed below.
        </p>
        {this.props.foo ?
          <samp>{JSON.stringify(this.props.foo)}</samp> :
          <progress />
        }
        <p>
          In Chrome's developer tools, you should be able to see this
          under the network tab. In the "Initiator" column, it will say
          "Push / xhr.js".
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
