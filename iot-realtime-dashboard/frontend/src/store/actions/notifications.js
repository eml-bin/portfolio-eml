/*
  Notifications Actions
    Acciones de Notificaciones.

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

// import axios from 'axios'

import {
  GET_ALARMS_START,
  GET_ALARMS_SUCCESS,
  GET_ALARMS_FAIL,
  ACTIVATE_ALARM,
  UPDATE_ALARM,
  NEW_ALARM,

  GET_SHUTDOWNS_START,
  GET_SHUTDOWNS_SUCCESS,
  GET_SHUTDOWNS_FAIL,
  ACTIVATE_SHUTDOWN,
  NEW_SHUTDOWN,
  UPDATE_SHUTDOWN
} from './types'

import { saveStart, saveSuccess, saveFail } from './processing'
import { HOSTS } from '../../constants'
import { HttpClient } from '../../utils/HttpClient'
import { Authorizer } from '../../utils/Authorizer'

// ALARMS

const getAlarmsStart = () => ({
  type: GET_ALARMS_START
})

const getAlarmsSuccess = (data) => ({
  type: GET_ALARMS_SUCCESS,
  data,
})

const getAlarmsFail = () => ({
  type: GET_ALARMS_FAIL
})

export const newAlarm = (alarm) => ({
  type: NEW_ALARM,
  alarm
})

export const activateAlarm = (alarmID) => ({
  type: ACTIVATE_ALARM,
  alarmID
})

const updateAlarm = (alarmData) => ({
  type: UPDATE_ALARM,
  alarmData
})

export const getAlarms = () => {
  return async (dispatch) => {

    try {

      dispatch(getAlarmsStart())
    
      const { response, data } = await HttpClient(
        `${HOSTS.API.ALARMS}/`, 
        {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': Authorizer()
          }
        }
      )

      if (!response) throw 500
      
      dispatch(getAlarmsSuccess(data))

    } catch {
      console.log('ERROR /api/alarms')
      dispatch(getAlarmsFail())
    }

    // dispatch(getAlarmsStart())

    // axios.get(HOSTS.API.ALARMS).then(response => {
    //   dispatch(getAlarmsSuccess(response.data))
    // }).catch(error => {
    //   console.log(error)
    //   dispatch(getAlarmsFail(error))
    // })

  }
}

export const attendAlarm = (alarmData) => {
  return async (dispatch) => {
    
    try {

      dispatch(saveStart())
  
      const { response } = await HttpClient(
        `${HOSTS.API.ALARMS}/${alarmData.id}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Authorizer()
          },
          body: JSON.stringify(alarmData)
        }
      )

      if (!response) throw 500

      dispatch(saveSuccess())
      dispatch(updateAlarm(alarmData))
  
      // dispatch(saveStart())
      // axios.patch(
      //   `${HOSTS.API.ALARMS}/${alarmData.id}/`,
      //   alarmData
      // ).then((response) => {
      //   dispatch(saveSuccess())
      //   dispatch(updateAlarm(alarmData))
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(saveFail())
      // })
    } catch {
      console.log("ERROR: ")
      dispatch(saveFail())
    }
  }
}

// SHUTDOWNS

const getShutdownsStart = () => ({
  type: GET_SHUTDOWNS_START
})

const getShutdownsSuccess = (data) => ({
  type: GET_SHUTDOWNS_SUCCESS,
  data,
})

const getShutdownsFail = () => ({
  type: GET_SHUTDOWNS_FAIL
})

export const newShutdown = (shutdown) => ({
  type: NEW_SHUTDOWN,
  shutdown
})

export const activateShutdown = (shutdownID) => ({
  type: ACTIVATE_SHUTDOWN,
  shutdownID
})

const updateShutdown = (shutdownData) => ({
  type: UPDATE_SHUTDOWN,
  shutdownData
})

export const getShutdowns = () => {
  return async(dispatch) => {
    
    try {

      dispatch(getShutdownsStart())

      const { response, data } = await HttpClient(
        `${HOSTS.API.SHUTDOWNS}/`, 
        {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': Authorizer()
          }
        }
      )

      if (!response) throw 500

      dispatch(getShutdownsSuccess(data))
      // dispatch(getShutdownsStart())
  
      // axios.get(HOSTS.API.SHUTDOWNS).then(response => {
      //   dispatch(getShutdownsSuccess(response.data))
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(getShutdownsFail(error))
      // })

    } catch {
      console.log("ERROR: /api/shutdowns")
      dispatch(getShutdownsFail())
    }

  }
}

export const attendShutdown = (shutdownData) => {
  return async (dispatch) => {

    try {
      dispatch(saveStart())
      
      const { response } = await HttpClient(
        `${HOSTS.API.ALARMS}/${shutdownData.id}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Authorizer()
          },
          body: JSON.stringify(shutdownData)
        }
      )

      if (!response) throw 500

      dispatch(saveSuccess())
      dispatch(updateShutdown(shutdownData))

      // dispatch(saveStart())
      // axios.patch(
      //   `${HOSTS.API.ALARMS}/${shutdownData.id}/`,
      //   shutdownData
      // ).then((response) => {
      //   dispatch(saveSuccess())
      //   dispatch(updateShutdown(shutdownData))
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(saveFail())
      // })

    } catch {
      console.log("ERROR: /api/alarms")
      dispatch(saveFail())
    }
  }
}
