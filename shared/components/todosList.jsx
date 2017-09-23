import React from 'react';
import TodoItem from 'components/todoItem';

export default class TodosList extends React.Component {
  constructor(props) {
    super(props);
    global.console.log("TodosList.constructor()");
  }

  static propTypes = {
    todos: React.PropTypes.any.isRequired,
    actions: React.PropTypes.shape({
      deleteTodo: React.PropTypes.func,
      editTodo: React.PropTypes.func
    }).isRequired
  }

  componentWillMount() {
    global.console.log('TodosList.componentWillMount()');
    this.props.actions.getTodos();
    this.props.actions.getFoo();
  }

  componentDidMount() {
    global.console.log('TodosList.componentDidMount()');
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
