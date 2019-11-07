import { get_photo } from '../ajax';

function state2props(state, props) {
  let id = parseInt(props.id);
  return {id: id, photo: state.photos.get(id)};
}

function PhotosShow({id, photo}) {
  let image = null;

  if (!photo) {
    get_photo(id);