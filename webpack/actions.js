import { ACTION_GET_FLEETS,ACTION_ADD_FLEET } from './constants'

export const createAction = (type, data) => {
  return {type: type, data}
};

export const getFleets = (param) => {
  return (dispatch) => {
    $.ajax({
      url: '/fleets',
      method: 'GET',
      dataType: 'JSON',
      data: param,
    }).done(data => {
      dispatch(createAction(ACTION_GET_FLEETS, data))
    })
  }
};

export const addFleet = (param) => {
  return (dispatch) => {
    $.ajax({
      url: '/fleets',
      type: 'POST',
      dataType: 'JSON',
      data: {fleet: param},
    }).done(data => {
      dispatch(createAction(ACTION_ADD_FLEET, data))
    })
  }
};

export const updateFleet = (id) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/items/${id}`,
      type: 'PUT'
    }).done(item => {
      dispatch({
        type: 'UPDATE_TODO',
        item
      })
    })
  }
};

export const deleteFleet = (id) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/items/${id}`,
      type: 'DELETE'
    }).done(() => {
      dispatch({
        type: 'DELETE_TODO',
        id
      })
    })
  }
};

