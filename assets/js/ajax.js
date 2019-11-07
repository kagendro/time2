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
  let state = store.getState();
  let token = state.session.token;

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

export function get_photo(id) {
  get('/photos/'+id)
    .then((resp) => {
      store.dispatch({
        type: 'ADD_PHOTOS',
        data: [resp.data],
      });
    });
}

export function list_photos() {
  get('/photos')
    .then((resp) => {
      console.log("list_photos", resp);
      store.dispatch({
        type: 'ADD_PHOTOS',
        data: resp.data,
      });
    });
}

export function submit_new_photo(form) {
  let state = store.getState();
  console.log("state", state);
  let data = state.forms.new_photo;

  if (data.file == null) {
    return;
  }

  let reader = new FileReader();
  reader.addEventListener("load", () => {
    post('/photos', {
      photo: {
        desc: data.desc,
        filename: data.file.name,
        data: reader.result,
        user_id: 1,
      }
    }).then((resp) => {
      console.log(resp);
      if (resp.data) {
        store.dispatch({
          type: 'ADD_PHOTOS',
          data: [resp.data],
        });
        form.redirect('/photos/' + resp.data.id);
      }
      else {
        store.dispatch({
          type: 'CHANGE_NEW_PHOTO',
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