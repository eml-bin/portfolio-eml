/*
  AUTH Reducer
    Encargado de cambiar el state `machines´ de la aplicación.

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

import {
  GET_TOKEN_START,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAIL,
} from '../actions/types'

import jwt from 'jwt-decode'
// import axios from 'axios'

const initialState = {
  loadingLogin: false,
  token: false,
  user: null,
  error: null
}


export default function machinesReducer(state=initialState, action) {
  switch(action.type) {
    case GET_TOKEN_START:
      return {
        loadingLogin: true,
        token: false,
        error: false
      }
    case GET_TOKEN_SUCCESS:
      const user = jwt(action.token)
      delete user.exp

      // axios.defaults.headers.common['Authorization'] = `Bearer ${action.token}`
      return {
        loadingLogin: false,
        token: action.token,
        user: user,
        error: false
      }

    case GET_TOKEN_FAIL:
      return {
        loadingLogin: false,
        token: false,
        error: true
      }
    default:
      return state
  }
}
