import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';

import TasksList from './tasks/index';
import TasksNew from './tasks/new';
import TasksShow from './tasks/show';
import Login from './login';

import store from './store';

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Page(props) {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Col md="8">
          <Nav>
            <Nav.Item>
              <NavLink to="/" exact activeClassName="active" className="nav-link">
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/users" exact activeClassName="active" className="nav-link">
                Users
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/tasks/new" exact activeClassName="active" className="nav-link">
                New task
              </NavLink>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md="4">
          <Session />
        </Col>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <TasksList />
        </Route>

        <Route exact path="/users">
          <h1>Users</h1>
        </Route>

        <Route exact path="/tasks/new">
          <TasksNew />
        </Route>

        <Route exact path="/tasks/:id" render={
          (props) =>
            <TasksShow id={props.match.params.id} />
        } />

        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
  }

  if (session) {
    return (
      <Nav>
        <Nav.Item>
          <p className="text-light py-2">User: {session.user_name}</p>
        </Nav.Item>
        <Nav.Item>
          <a className="nav-link" href="#" onClick={logout}>Logout</a>
        </Nav.Item>
      </Nav>
    );
  }
  else {
    return (
      <Nav>
        <Nav.Item>
          <NavLink to="/login" exact activeClassName="active" className="nav-link">
            Login
          </NavLink>
        </Nav.Item>
      </Nav>
    );
  }
});