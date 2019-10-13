import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import '../src/stylesheets/style.css' // @brodey - Importing css like this is usually done within the top level index.js file.

const TaskList = ({ tasks=[], handleInputChange=f=>f, onUpdate=f=>f, onRemove=f=>f, onCompletion=f=>f }) =>
    <div className="task-list">
        {(tasks.length === 0) ?
            <p>Write down a new task</p> :
            tasks.map(task =>
                <Task key={task.id}
                    {...task}
                        onEdit={handleInputChange}
                        onUpdate={(title) => onUpdate(task.id, title)}
                        onRemove={() => onRemove(task.id)}
                        onCompletion={() => onCompletion(task.id)} />
            )
        }
    </div>

TaskList.propTypes = {
    tasks: PropTypes.array,
    onUpdate: PropTypes.func,
    onCompletion: PropTypes.func,
    // @brodey - Don't leave whitespaces like this.
}

export default TaskList;
