import React from 'react';

export default class TodosForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let node = this.refs['todo-input'];

    this.props.createTodo(node.value);

    node.value = '';
  }

  render() {
    return (
      <form id='todo-form' onSubmit={this.handleSubmit}>
        <div>
          <input type='text' placeholder='type todo' ref='todo-input' />
          <input type='submit' value='OK!' />
        </div>
      </form>
    );
  }
}
