import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

import { list_tasks } from '../ajax';
import TaskCard from './card';

let TasksList = connect(({tasks}) => ({tasks}))(({tasks}) => {
  if (tasks.size == 0) {
    list_tasks();
  }

  let cards = _.map([...tasks], ([_, task]) => {
    return <TaskCard key={task.id} task={task} />;
  });

  return (
    <div>
      <h1>Tasks</h1>
      <div className="row">
        {cards}
      </div>
    </div>
  );
});

export default TasksList;