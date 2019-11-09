import store from './store';

export function post(path, body) {

  let state = store.getState();
  let token = state.session.token;


  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function get(path) {

	console.log("Initializing state...")
  let state = store.getState();

	console.log("state = ", state)
let token = state.session.token;

	console.log("token = ", token)
  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}

export function get_task(id) {
  get('/tasks/'+id)
    .then((resp) => {
      store.dispatch({
        type: 'ADD_TASKS',
        data: [resp.data],
      });
    });
}

export function list_tasks() {
  get('/tasks')
    .then((resp) => {
      console.log("list_tasks", resp);
      store.dispatch({
        type: 'ADD_TASKS',
        data: resp.data,
      });
    });
}

export function submit_new_task(form) {
  let state = store.getState();
  console.log("state", state);
  let data = state.forms.new_task;

  if (data.file == null) {
    return;
  }

  let reader = new FileReader();
  reader.addEventListener("load", () => {
    post('/tasks', {
      task: {
        hours: data.hours,
        name: data.name,
      }
    }).then((resp) => {
      console.log(resp);
      if (resp.data) {
        store.dispatch({
          type: 'ADD_TASKS',
          data: [resp.data],
        });
        form.redirect('/tasks');
      }
      else {
        store.dispatch({
          type: 'CHANGE_NEW_TASK',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
  });

  reader.readAsDataURL(data.file);
}

export function submit_login(form) {
  let state = store.getState();
  let data = state.forms.login;
  console.log("in ajax")
  console.log(data)

  post('/sessions', data)
    .then((resp) => {
      console.log(resp);
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'LOG_IN',
          data: resp,
        });
        form.redirect('/');
      }
      else {
        store.dispatch({
          type: 'CHANGE_LOGIN',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}
