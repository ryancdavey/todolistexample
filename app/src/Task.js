import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Delete from './Delete';

class Task extends Component {

    componentWillMount() {
        this.title = "Write down a new task";
    }

    shouldComponentUpdate(nextProps) {
        const { title } = this.props;
        return title !== nextProps.title;
    }

    componentWillUpdate(nextProps) {
        const { title } = this.props
        this.style = null
       // this.refs.title.style.backgroundColor = "red"
        //this.refs.title.style.color = "white"
        alert(`${title}: -> ${nextProps.title}`)
    }

    componentDidUpdate(prevProps) {
        const { title } = this.props;
        //const status = (rating > prevProps.rating) ? 'better' : 'worse'
        //console.log(`${title} is getting ${status}`)
        //this.refs.title.style.backgroundColor = ""
        //.refs.title.style.color = "black"
    }

    _handleChangeEvent(value) {
        return value;
      }
    

    render() {
        const { title, category, handleInputChange, onUpdate, onCompletion, onRemove } = this.props
        return (
            <div className="task" style={this.style}>
                {/* <label ref="category"></label> */}
                <label
                    class="task-title"
                >{category}: {title}</label>
                    {/* // onChange={()=>{this._handleChangeEvent(title);}} 
                    // defaultValue={title} */}
                
                        
               
                <button className="example_c" onClick={onUpdate}>Edit</button>
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