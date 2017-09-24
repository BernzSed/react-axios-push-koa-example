import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as fooActions from 'actions/foo';

function mapStateToProps(state) {
  return { foo: state.foo };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fooActions, dispatch) };
}

class Home extends React.Component {
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
        <h1>I am a banana!</h1>
        <p>Watch how I soar.</p>
        {this.props.foo ?
          <samp>{this.props.foo.toString()}</samp> :
          <progress />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
