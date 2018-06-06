import React, { Component } from 'react';
import './App.css';
import {ToDoForm, ToDoList, Header} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils'
import PropTypes from 'prop-types'
import {loadTodos, createTodo, saveTodo, destroyTodo} from './lib/todoService'

class App extends Component {

  state = {
    todos: [],
    currentTodo: '',
    priority: 0
  }

  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }

  handleRemove = (id, e) => {
    e.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos: updatedTodos})
    destroyTodo(id)
      .then(() => this.showTempMessage('Todo Removed'))
  }

  handleToggle = id => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({todos: updatedTodos})
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo Updated'))
  }
  
  handleSubmit = e => {
    e.preventDefault()
    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false, priority: this.state.priority}
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
    createTodo(newTodo)
    .then(() => this.showTempMessage('Todo added'))
  }

  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 1000)
  }


  handleEmptySubmit = e => {
    e.preventDefault()
    this.setState({
      errorMessage: 'Please supply a todo name!'
    })
  }

  handleInputChange = e => {
    this.setState({
      currentTodo: e.target.value
    })
  }

  handleRadioChange = e => {
    this.setState({
      priority: parseInt(e.target.value, 10)
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div>
        <main className="app">
          <Header />
          <ToDoForm handleInputChange={this.handleInputChange} 
            handleRadioChange={this.handleRadioChange}
            currentTodo={this.state.currentTodo} 
            handleSubmit={submitHandler}
            />
            <div className="info">
              {this.state.errorMessage && <span className='info__error'>{this.state.errorMessage}</span>}
              {this.state.message && <span className='info__succes'>{this.state.message}</span>}
            </div>
          <ToDoList 
            handleToggle={this.handleToggle} 
            todos={displayTodos}
            handleRemove={this.handleRemove}
          /> 
        </main>
      </div>
    );
  }
}
 
export default App;
