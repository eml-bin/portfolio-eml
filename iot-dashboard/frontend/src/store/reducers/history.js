/*
  History Reducer
    Encargado de cambiar el state `history´ de la aplicación.

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

import {
  GET_HISTORY_VARIABLE_START,
  GET_HISTORY_VARIABLE_SUCCESS,
  GET_HISTORY_VARIABLE_FAIL,
  GET_HISTORY_VALVE_START,
  GET_HISTORY_VALVE_SUCCESS,
  GET_HISTORY_VALVE_FAIL,
  RESET_HISTORY
} from '../actions/types'

const initialState = {
  loadingHistory: false,
  variableData: null,
  error: null
}


export default function machinesReducer(state=initialState, action) {
  switch(action.type) {
    case GET_HISTORY_VARIABLE_START:
      return {
        loadingHistory: true
      }
    case GET_HISTORY_VARIABLE_SUCCESS:
      return {
        loadingHistory: false,
        variablesData: action.data,
        distinctTypes: action.distinctTypes,
        endDate: action.endDate,
        activeInterval: action.interval
      }
    case GET_HISTORY_VARIABLE_FAIL:
      return {
        loadingHistory: false,
        error: true
      }
    case GET_HISTORY_VALVE_START:
      return {
        loadingHistory: true
      }
    case GET_HISTORY_VALVE_SUCCESS:
      return {
        loadingHistory: false,
        valveData: action.data
      }
    case GET_HISTORY_VALVE_FAIL:
      return {
        loadingHistory: false,
        error: true
      }
    case RESET_HISTORY:
      return initialState
    default:
      return state
  }
}
