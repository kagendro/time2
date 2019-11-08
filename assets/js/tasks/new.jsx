import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_new_task } from '../ajax';

function state2props(state) {
  return state.forms.new_task;
}

class TasksNew extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_NEW_TASKS',
      data: data,
    });
  }

  file_changed(ev) {
    let input = ev.target;
    let file  = null;
    if (input.files.length > 0) {
      file = input.files[0];
    }
    this.changed({file: file});
  }

  render() {
    let {file, desc, errors, dispatch} = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <h1>New Task</h1>
        { error_msg }
        <Form.Group controlId="name">
          <Form.Label>Task Name</Form.Label>
          <Form.Control type="text" 
	                 onChange={(ev) => this.changed({name: ev.target.value})} />
        </Form.Group>
        <Form.Group controlId="hours">
          <Form.Label>Hours Worked</Form.Label>
          <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId="submit">
          <Button variant="primary"
                  onClick={() => submit_new_task(this)}>
            Upload Task</Button>
        </Form.Group>
      </div>
    );
  }
}

export default connect(state2props)(TasksNew);
