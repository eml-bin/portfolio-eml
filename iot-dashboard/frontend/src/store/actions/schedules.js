/*
  Schedules Actions
    Acciones disponibles de los Paros Programados.

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

import {
  GET_SCHEDULES_START,
  GET_SCHEDULES_SUCCESS,
  GET_SCHEDULES_FAIL,
  NEW_SCHEDULE
} from './types'

// import axios from 'axios'
import { saveStart, saveSuccess, saveFail } from './processing'
import { HOSTS } from '../../constants'
import { HttpClient } from '../../utils/HttpClient'
import { Authorizer } from '../../utils/Authorizer'

const getSchedulesStart = () => ({
  type: GET_SCHEDULES_START
})

const getSchedulesSuccess = (data) => ({
  type: GET_SCHEDULES_SUCCESS,
  data
})

const getSchedulesFail = (error) => ({
  type: GET_SCHEDULES_FAIL,
  error
})

const createSchedule = (newSchedule) => ({
  type: NEW_SCHEDULE,
  newSchedule
})

// export const activeRange = (tagName) => ({
//   type: ACTIVE_RANGE,
//   tagName
// })

export const getSchedules = (machineID) => {
  /*
    Método asíncrono para obtener los Paros Programados.
  */
  return async (dispatch) => {

    try {
      dispatch(getSchedulesStart())
    
      const { response, data } = await HttpClient(
        `${HOSTS.API.SCHEDULE}/`, 
        {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': Authorizer()
          }
        }
      )

      if (!response) throw 500

      dispatch(getSchedulesSuccess(data))

    } catch {
      console.log("ERROR: /api/schedule")
      dispatch(getSchedulesFail())
    }
    // dispatch(getSchedulesStart())

    // axios.get(HOSTS.API.SCHEDULE)
    // .then(response => {
    //   dispatch(getSchedulesSuccess(response.data))
    // }).catch(error => {
    //   console.log(error)
    //   dispatch(getSchedulesFail())
    // })
  }
}

export const saveSchedule = (newSchedule) => {
  /*
    Método asíncrono para guardar un Paro Programado.
  */
  return async (dispatch, getState) => {
    const mqttClient = getState().mqtt.client

    dispatch(saveStart())
    if (newSchedule.action === 'CREATE') {

      const schedulesPostResult = await HttpClient(
        `${HOSTS.API.SCHEDULE}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Authorizer()
          },
          body: JSON.stringify(newSchedule)
        }
      )

      if (schedulesPostResult.response) {
        mqttClient.publish('programmed_stoppages', JSON.stringify(schedulesPostResult.data))
        dispatch(createSchedule(schedulesPostResult.data))
        dispatch(saveSuccess())
      } else {
        console.log("ERROR: /api/schedules")
        dispatch(saveFail())
      }

      // axios.post(
      //   HOSTS.API.SCHEDULES,
      //   newSchedule
      // ).then((response) => {
      //   mqttClient.publish('programmed_stoppages', JSON.stringify(response.data))
      //   dispatch(createSchedule(response.data))
      //   dispatch(saveSuccess())
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(saveFail())
      // })

    } else if (newSchedule.action === 'UPDATE') {

      const schedulesPutResult = await HttpClient(
        `${HOSTS.API.SCHEDULES}/${newSchedule.id}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Authorizer()
          },
          body: JSON.stringify(newSchedule)
        }
      )

      if (schedulesPutResult.response) {
        mqttClient.publish('programmed_stoppages', JSON.stringify(newSchedule))
        // dispatch(updateRange(newSchedule))
        dispatch(saveSuccess(newSchedule))
      } else {
        console.log("ERROR: /api/ranges")
        dispatch(saveFail(newSchedule))
      }

      // axios.patch(
      //   `${HOSTS.API.SCHEDULES}/${newSchedule.id}/`,
      //   newSchedule
      // ).then((response) => {
      //   mqttClient.publish('programmed_stoppages', JSON.stringify(newSchedule))
      //   //dispatch(updateRange(newSchedule))
      //   dispatch(saveSuccess(newSchedule))
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(saveFail(newSchedule))
      // })
    }
  }
}
