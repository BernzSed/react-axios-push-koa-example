import React from 'react';

export default class AppView extends React.Component {
  render() {
    return (
      <div id="app-view">
        <h1>This is a test of the emergency react.js system.</h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
