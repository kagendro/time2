import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { get_task } from '../ajax';

function state2props(state, props) {
  let id = parseInt(props.id);
  return {id: id, task: state.tasks.get(id)};
}

function tasksShow({id, task}) {

  if (!task) {
    get_task(id);

    return (
      <div>
        <h1>Show task</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Show Task</h1>
      <img src={task.data} />
      <ul>
        <li>Name: {task.name}</li>
      </ul>
      
    </div>
  );
}

export default connect(state2props)(tasksShow);