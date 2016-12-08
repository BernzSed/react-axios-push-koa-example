import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import TodosList              from 'components/todosList';
import TodosForm              from 'components/todosForm';
import * as TodoActions       from 'actions/todoActions';


@connect(state => ({ todos: state.todos }))

export default class Home extends React.Component {
  propTypes: {
    todos: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div id='todo-list'>
        <TodosList todos={this.props.todos}
          actions={bindActionCreators(TodoActions, this.props.dispatch)} />
        <TodosForm
          {...bindActionCreators(TodoActions, this.props.dispatch)} />
      </div>
    );
  }
}
