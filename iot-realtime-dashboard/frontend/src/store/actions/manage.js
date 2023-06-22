import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  NEW_USER,
  ACTIVE_USER,
  UPDATE_USER
} from './types'

// import axios from 'axios'
import { saveStart, saveSuccess, saveFail } from './processing'
import { HOSTS } from '../../constants'
import { HttpClient } from '../../utils/HttpClient'

const getUsersStart = () => ({
  type: GET_USERS_START
})

const getUsersSuccess = (data) => ({
  type: GET_USERS_SUCCESS,
  data
})

const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  error
})

export const activeUser = (userID) => ({
  type: ACTIVE_USER,
  userID
})

const newUser = (newUser) => ({
  type: NEW_USER,
  newUser
})

const updateUser = (newUser) => ({
  type: UPDATE_USER,
  newUser
})

export const getAllUsers = () => {
  /*
    Método asíncrono para obtener a los Usuarios.
  */
  return async (dispatch) => {

    try {

      dispatch(getUsersStart())
    
      const { response, data } = await HttpClient(
        HOSTS.API.PROFILES, 
        {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
        }
      )

      if (!response) throw 500
      
      dispatch(getUsersSuccess(data))

    } catch {
      console.log('ERROR /api/profiles/')
      dispatch(getUsersFail())
    }

    // dispatch(getUsersStart())
    // axios.get(HOSTS.API.PROFILES
    // ).then(response => {
    //   dispatch(getUsersSuccess(response.data))
    // }).catch(error => {
    //   dispatch(getUsersFail())
    // })
  }
}

export const saveUser = (userData) => {
  /*
    Método asíncrono para guardar la información de un Usuario.
  */
  return async (dispatch) => {
    dispatch(saveStart())

    switch (userData.action) {
      case 1:
        const profilePostResult = await HttpClient(
          HOSTS.API.PROFILES,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          }
        )

        if (profilePostResult.response) {

          dispatch(newUser(profilePostResult.data))
          dispatch(saveSuccess())

        } else {

          console.log('ERROR', '/api/profiles')
          dispatch(saveFail())

        }

        // axios.post(
        //   HOSTS.API.PROFILES,
        //   userData
        // ).then(response => {
        //   dispatch(newUser(response.data))
        //   dispatch(saveSuccess())
        // }).catch(error => {
        //   console.log('ERROR', error.response)
        //   dispatch(saveFail())
        // })

        break
      case 2:
      case 3:


        const profilePutResult = await HttpClient(
          `${HOSTS.API.PROFILES}/${userData.id}/`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          }
        )

        if (profilePutResult.response) {

          userData.action === 2 && dispatch(updateUser(profilePutResult.response.data))
          dispatch(saveSuccess())

        } else {

          console.log('ERROR', '/api/profiles')
          dispatch(saveFail())

        }


        // axios.patch(
        //   `${HOSTS.API.PROFILES}/${userData.id}/`,
        //   userData
        // ).then(response => {
        //   userData.action === 2 && dispatch(updateUser(response.data))
        //   dispatch(saveSuccess())
        // }).catch(error => {
        //   console.log('ERROR', error.response)
        //   dispatch(saveFail())
        // })
        break
      default:
        break
    }
  }
}
