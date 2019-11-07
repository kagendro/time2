  
import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';

/* Structure of store data:
 * {
 *   forms: {
 *     new_task: {...},
 *     edit_task: {...},
 *     new_user: {...},
 *     edit_user: {...},
 *   },
 *   users: Map.new(
 *     1 => {id: 1, name: "Alice", email: "alice@example.com"},
 *     ...
 *   ),
 *   tasks: Map.new(
 *     1 => {id: 1, data: "...", desc: "...", tags: [...]},
 *     ...
 *   ),
 * }
 */

function new_task(st0 = {file: null, desc: "", errors: null}, action) {
  switch (action.type) {
    case 'CHANGE_NEW_TASK':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function login(st0 = {email: "", password: "", errors: null}, action) {
  switch(action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers({
    new_task,
    login,
  });
  return reducer(st0, action);
}

function users(st0 = new Map(), action) {
  return st0;
}

function tasks(st0 = new Map(), action) {
  switch (action.type) {
    case 'ADD_TASKS':
      let st1 = new Map(st0);
      for (let task of action.data) {
        st1.set(task.id, task);
      }
      return st1;
    default:
      return st0;
  }
}

let session0 = localStorage.getItem('session');
if (session0) {
  session0 = JSON.parse(session0);
}
function session(st0 = session0, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}

function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers({
    forms,
    users,
    tasks,
    session,
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;