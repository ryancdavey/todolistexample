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

    // JSalert() {
    //     swal({ 
    //         title: "Edit Task",   
    //         text: "Enter an update or cancel:",   
    //         type: "input",   
    //         showCancelButton: true,   
    //         closeOnConfirm: false,   
    //         animation: "slide-from-top",   
    //         inputPlaceholder: "" 
    //     });
    // }

    _handleChangeEvent(value) {
        return value;
      }
    

    render() {
        const { title, category, handleInputChange, onUpdate, onCompletion, onRemove } = this.props
        return (
            <div className="task" style={this.style}>
                {/* <label ref="category"></label> */}
                <label
                    ref="title"
                >{category}: {title}</label>
                    {/* // onChange={()=>{this._handleChangeEvent(title);}} 
                    // defaultValue={title} */}
                
                        
               
                <button onClick={onUpdate}>Edit</button>
                <button className="completion" onClick={onCompletion}>Complete</button>
                <button onClick={onRemove}>Delete</button>
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