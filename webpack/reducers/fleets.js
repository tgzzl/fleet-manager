import { ACTION_GET_FLEETS,ACTION_ADD_FLEET } from '../constants'

const initialState = {
  fleets: [],
  drivers: [],
  vehicles: [],
};

const fleets = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_FLEETS:
      return Object.assign({}, state, {
        fleets: action.data
      });
    case ACTION_ADD_FLEET:
      return [
        {...action.item},
        ...state
      ];
    case 'UPDATE_TODO':
      let index = state.findIndex(i => i.id === action.item.id);
      return [
        ...state.slice(0, index),
        {...action.item},
        ...state.slice(index + 1, state.length)
      ];
    case 'DELETE_TODO':
      let deleteIndex = state.findIndex(i => i.id === action.id);
      return [
        ...state.slice(0, deleteIndex),
        ...state.slice(deleteIndex + 1, state.length)
      ];
    default:
      return state;
  }
};

export default fleets;