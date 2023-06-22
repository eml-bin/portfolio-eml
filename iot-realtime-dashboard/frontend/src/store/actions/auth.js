/*
  Auth Actions
    Acciones disponibles de la Autenticación

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

// import axios from 'axios'
import jwt from 'jwt-decode'
import { HOSTS } from '../../constants'
import { HttpClient } from '../../utils/HttpClient'

import {
  GET_TOKEN_START,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAIL,
  LOGOUT
} from './types'

const authUserStart = () => ({
  type: GET_TOKEN_START
})

const authUserSuccess = (token) => ({
  type: GET_TOKEN_SUCCESS,
  token
})

const authUserFail = () => ({
  type: GET_TOKEN_FAIL
})

export const logout = () => ({
  type: LOGOUT
})

export const authUser = (userInfo) => {
  return async (dispatch) => {

    try {
      dispatch(authUserStart())
      const { response, data } = await HttpClient(
        HOSTS.API.LOGIN,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userInfo)
        }
      )

      // console.log('authUser response', response)
      // console.log('authUser data', data)

      if (!response) throw 500
      
      localStorage.setItem('tkn', data.access)
      dispatch(authUserSuccess(data.access))
      
    } catch {
      console.log('ERROR /api/login')
      dispatch(authUserFail())
    }

    // axios.post(HOSTS.API.LOGIN, userInfo).then(response => {
    //   localStorage.setItem('tkn', response.data.access)
    //   dispatch(authUserSuccess(response.data.access))
    // }).catch(error => {
    //   console.log(error)
    //   console.log('ERROR')
    //   dispatch(authUserFail(error))
    // })

  }
}

export const verifyToken = (token) => {
  return (dispatch) => {
    dispatch(authUserStart(token))
    const { exp } = jwt(token)
    const expDate = new Date(0)
    expDate.setUTCSeconds(exp)

    if((expDate.getTime() - Date.now()) < 0) {
      dispatch(logout())
    } else {
      dispatch(authUserSuccess(token))
    }
  }
}
