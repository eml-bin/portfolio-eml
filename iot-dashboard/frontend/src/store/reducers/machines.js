/*
  Machines Reducer
    Encargado de cambiar el state `machines´ de la aplicación.

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

import {
  GET_MACHINES_START,
  GET_MACHINES_SUCCESS,
  GET_MACHINES_FAIL,
  NEW_MACHINE_STATUS
} from '../actions/types'

const initialState = {
  loadingMachines: false,
  data: null,
  error: null,
  status: false
}


export default function machinesReducer(state=initialState, action) {
  switch(action.type) {
    case GET_MACHINES_START:
      return {
        loadingMachines: true
      }
    case GET_MACHINES_SUCCESS:
      return {
        loadingMachines: false,
        data: action.machines
      }
    case GET_MACHINES_FAIL:
      return {
        loadingMachines: false,
        error: true
      }
    case NEW_MACHINE_STATUS:
      return {
        ...state,
        status: action.status
      }
    default:
      return state
  }
}
