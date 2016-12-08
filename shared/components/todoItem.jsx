import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
      // todoTextValue: props.todo
    }
  }

  handleSave = (target) => {
    this.props.actions.editTodo(this.props.id, this.refs.input.value);
    this.setState({editing: false});
  }

  handleEdit = () => {
    this.setState({
      editing: true
      // todoInputValue: this.props.todo
    });
  }

  handleDelete = () => {
    this.props.actions.deleteTodo(this.props.id);
  }

  renderNormalView() {
    return (
      <span>
        <span>{this.props.todo}</span>

        <button data-id={this.props.id} onClick={this.handleEdit}>
          Edit
        </button>
      </span>
    )
  }

  renderEditingView() {
    return (
      <form style={{display: 'inline'}}>
        <span>
          <input type="text" defaultValue={this.props.todo} ref='input' />
          <button type="submit" onClick={this.handleSave}>
            ✓
          </button>
        </span>
      </form>
    )
  }

  render() {
    const containerElement = this.state.editing ? 'form' : 'span'
    return (
      <li>
        {this.state.editing ? this.renderEditingView() : this.renderNormalView()}

        <button data-id={this.props.id} onClick={this.handleDelete}>
          X
        </button>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
  actions: React.PropTypes.shape({
    deleteTodo: React.PropTypes.func,
    editTodo: React.PropTypes.func
  })
}

export default TodoItem
