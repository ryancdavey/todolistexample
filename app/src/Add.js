import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import '../../stylesheets/AddColorForm.scss'

const AddTaskForm = ({onNewTask=f=>f}) => {

    let _title;

    const submit = e => {
        e.preventDefault()
        onNewTask(_title.value)
        _title.value = ''
        _title.focus()
    }

    return (
        <form className="add-task" onSubmit={submit}>
            <input ref={input => _title = input}
                   type="text"
                   placeholder="add a new task..." required/>
            <button>Add</button>
        </form>
    )

}

AddTaskForm.propTypes = {
    onNewTask: PropTypes.func
}

export default AddTaskForm