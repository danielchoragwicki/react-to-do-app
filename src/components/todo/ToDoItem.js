import React from 'react'
import {partial} from '../../lib/utils'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
 
export const ToDoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  const handleRemove = partial(props.handleRemove, props.id)
  const priority = props.priority
  return (
    <li className={props.isComplete ? "item done" : "item"}>
      <label className={priority !== 0 ? `item__checkbox item__checkbox--${priority}` : "item__checkbox"}>
        <input type="checkbox" onChange={handleToggle} checked={props.isComplete}/><FontAwesomeIcon icon={faCheck} /></label>
        {props.name}
        <button onClick={handleRemove} className="item__delete"><FontAwesomeIcon icon={faTrashAlt} /></button>
    </li>
  )
}

ToDoItem.propTypes = {
  name: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  id: PropTypes.number.isRequired,
  priority: PropTypes.number.isRequired
}
