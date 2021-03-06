import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

const TaskList = ({ tasks=[], onUpdate=f=>f, onRemove=f=>f, onCompletion=f=>f }) =>
  <div className="task-list">
    {(tasks.length === 0) ?
      <p>Write down a new task</p> :
        tasks.map(task =>
          <Task key={task.id}
            {...task}
              onUpdate={onUpdate}
              onRemove={() => onRemove(task.id)}
              onCompletion={() => onCompletion(task.id)} />
        )
    }
  </div>

TaskList.propTypes = {
  tasks: PropTypes.array,
  onUpdate: PropTypes.func,
  onCompletion: PropTypes.func,
}

export default TaskList;
