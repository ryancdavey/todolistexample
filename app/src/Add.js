import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Picker, StyleSheet } from 'react-picker'
//import '../../stylesheets/AddColorForm.scss'

const AddTaskForm = ({onNewTask=f=>f}) => {

    let _title, _category;

    const submit = e => {
        e.preventDefault() // @brodey - Make sure you're using semi-colons. Its technically not needed, but best practice.
        onNewTask(_title.value)
        _title.value = ''
        //_category.selectedValue = ''
        _title.focus()
    }

    return (// @brodey - White spaces like below here are ugly.

        <form className="add-task" onSubmit={submit}>
            <input ref={input => _title = input} // @brodey - Using ref's isn't bad, but it's usually best pracice to have controlled components. We talked about this yesterday. If you're confused, reach out.
                   type="text"
                   className="example_c" // @brodey - These prop indents are weird. Find my other comment about proper prop indenting.
                   placeholder="add a new task..." required/>
            {/* <Picker 
                style={{
                    width: 100,
                }}
                selectedValue={( this.state.pickerValue) || 'a'}
                onValueChange={(value) => {
                    this.setState({pickerValue: value});
                }} itemStyle={{color: 'white'}}>
                <Picker.Item label={'Work'} value={'a'} />
                <Picker.Item label={'Social'} value={'b'} />
                <Picker.Item label={'Personal'} value={'c'} />
                <Picker.Item label={'Miscellaneous'} value={'d'} />
            </Picker> */}
            <button className="example_c">Add</button>
        </form>

    )

}

AddTaskForm.propTypes = {
    onNewTask: PropTypes.func // @brodey - You're defining the propType definition, but not a default prop.
    // @brodey - There are a few rules to this.
    // @brodey - 1. If you define a prop definition, and it's NOT required (like above), set a default prop defintion.
           // @brodey - You do this by: AddTaskForm.defaultProps = { onNewTask: f => f }
    // @brodey - 2. If you define a prop definition and it IS required, do NOT set a default prop definition.
}

export default AddTaskForm
