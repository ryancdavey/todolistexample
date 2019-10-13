import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddTaskForm from './Add';

class Task extends Component {

    state = {
        isEditing: false,
        updateValue: this.props.title,
    }

    componentWillMount() {
        this.title = "Write down a new task";
    }

    handleSetIsEditing = () => this.setState({
        isEditing: true,
    });

    handleSetNoEditing = () => {
        this.props.onUpdate(this.props.id, this.state.updateValue);
        this.setState({isEditing: false,});

        console.log('???', this.props, this.state);
    };

    _handleChangeEvent(value) {
        return value;
      }

    handleChange = event => this.setState({
        updateValue: event.target.value,
    });

    render() {
        const { id, title, category, handleInputChange, onUpdate, onCompletion, onRemove } = this.props

        console.log(this.state);

        return (
            <div className="task" style={this.style}>
                <div>
                    {this.state.isEditing ? (
                        <input
                            type="text"
                            value={this.state.updateValue}
                            onChange={this.handleChange}
                        />
                    ) : (
                        <label class="task-title">{category}: {title}</label>
                    )}
                </div>
                {/* <label ref="category"></label> */}
                
                    {/* // onChange={()=>{this._handleChangeEvent(title);}} 
                    // defaultValue={title} */}
                
                        
               
                <button className="example_c" onClick={!this.state.isEditing ? this.handleSetIsEditing : this.handleSetNoEditing}>
                    {
                        this.state.isEditing ? "Save" : "Edit"
                    }
                </button>
                <div class="divider"/>
                <button className="completion example_c" onClick={onCompletion}>Complete</button>
                <div class="divider"/>
                <button className="example_c" onClick={onRemove}>Delete</button>
                {/* <div className="color"
                     style={{ backgroundColor: color }}>
                </div> */}
                {/* <div>
                    <StarRating starsSelected={rating} onRate={onRate}/>
                </div> */}
            </div>
        )
    }

}


export default Task;