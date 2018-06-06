import React from 'react'
import PropTypes from 'prop-types'
import {ToDoItem} from './ToDoItem'

export const ToDoList = (props) => {
  return (
    <ul className="list">
        {props.todos.map(todo => <ToDoItem priority={todo.priority} handleToggle={props.handleToggle} key={todo.id} {...todo} handleRemove={props.handleRemove}/>)}
    </ul>
  )
}

ToDoList.propTypes = {
  todos: PropTypes.array.isRequired
}