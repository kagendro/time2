import React from 'react';
import ReactDOM from 'react-dom';

import { Card } from 'react-bootstrap';

export default function TaskCard({task}) {
  return (
    <Card className="col-4">
      <Card.Img src={task.data} />
      <Card.Text>
        {task.desc}
      </Card.Text>
    </Card>
  );
}