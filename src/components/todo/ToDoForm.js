import React from 'react';
import PropTypes from 'prop-types';

export const ToDoForm = (props) => {
    return(
    <form onSubmit={props.handleSubmit}>
        <div className="add">
            <div className="add__priority">
            <label className="add__radio" title="Priority 0">
                <input defaultChecked={true} onChange={props.handleRadioChange} value="0" type="radio" name="priority"/>
                <span className="add__circle"></span>
            </label>
            <label className="add__radio add__radio--1" title="Priority 1">
                <input onChange={props.handleRadioChange} value="1" type="radio" name="priority"/>
                <span className="add__circle"></span>
            </label>
            <label className="add__radio add__radio--2" title="Priority 2">
                <input onChange={props.handleRadioChange} value="2" type="radio" name="priority"/>
                <span className="add__circle"></span>
            </label>
            <label className="add__radio add__radio--3" title="Priority 3">
                <input onChange={props.handleRadioChange} value="3" type="radio" name="priority"/>
                <span className="add__circle"></span>
            </label>
            </div>
            <input placeholder="+ Add todo item" type="text" className="add__input" 
            onChange={props.handleInputChange} 
            value={props.currentTodo}/>
        </div>
    </form>)
}

ToDoForm.propTypes = {
    currentTodo: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}