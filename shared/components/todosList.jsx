import React from 'react';
import TodoItem from 'components/todoItem';

export default class TodosList extends React.Component {
  static propTypes = {
    todos: React.PropTypes.any.isRequired,
    actions: React.PropTypes.shape({
      deleteTodo: React.PropTypes.func,
      editTodo: React.PropTypes.func
    }).isRequired
  }

  componentWillMount() {
    this.props.actions.getTodos();
  }

  render() {
    return (
      <ul id='todo-list'>
        {
          this.props.todos.map( (todo, index) => {
            return (
              <TodoItem key={index} id={index} todo={todo} actions={this.props.actions} />
            );
          })
        }
      </ul>
    );
  }
}
