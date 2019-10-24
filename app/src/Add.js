import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Picker, StyleSheet } from 'react-picker'

const AddTaskForm = ({onNewTask=f=>f}) => {

    let _title, _category;

    const submit = e => {
        e.preventDefault();
        onNewTask(_title.value);
        _title.value = '';
        //_category.selectedValue = ''
        _title.focus();
    }

    return (
      <form className="add-task" onSubmit={submit}>
        <input 
          ref={input => _title = input}
          //_title={textfield.value}
          type="text"
          className="add_task"
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
          <button className="add_task">Add</button>
        </form>
    )
}


export default AddTaskForm