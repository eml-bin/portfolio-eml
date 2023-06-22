/*
  Configuración de Alarmas Actions
    Acciones disponibles de la Configuración de Alarmas.

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

import {
  GET_RANGES_START,
  GET_RANGES_SUCCESS,
  GET_RANGES_FAIL,

  ACTIVE_RANGE,
  UPDATE_RANGE,
  NEW_RANGE,
} from './types'

// import axios from 'axios'
import { saveStart, saveSuccess, saveFail } from './processing'
import { HOSTS } from '../../constants'
import { HttpClient } from '../../utils/HttpClient'
import { Authorizer } from '../../utils/Authorizer'

const getRangesStart = () => ({
  type: GET_RANGES_START
})

const getRangesSuccess = (data) => ({
  type: GET_RANGES_SUCCESS,
  data
})

const getRangesFail = (error) => ({
  type: GET_RANGES_FAIL,
  error
})

export const activeRange = (variableID) => ({
  type: ACTIVE_RANGE,
  variableID
})

const updateRange = (newRange) => ({
  type: UPDATE_RANGE,
  newRange
})

const createRange = (newRange) => ({
  type: NEW_RANGE,
  newRange
})

export const getAllRanges = (machineID) => {
  /*
    Método asíncrono para obtener las Alarma.
  */
  return async(dispatch) => {

    try {

      dispatch(getRangesStart())

      const url = new URL(`${HOSTS.API.RANGES}/`)
  
      const params = { machine_id: machineID }
  
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      const { response, data } = await HttpClient(
        url.href, 
        {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': Authorizer()
          }
        }
      )

      if(!response) throw 500

      dispatch(getRangesSuccess(data))

      // dispatch(getRangesStart())
  
      // axios.get(HOSTS.API.RANGES, {
      //   params: {
      //     machine_id: machineID
      //   }
      // }).then(response => {
      //   dispatch(getRangesSuccess(response.data))
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(getRangesFail())
      // })
    } catch {
        console.log("ERROR: /api/ranges")
        dispatch(getRangesFail())
    }
    
  }
}

export const saveRange = (newRange) => {
  /*
    Método asíncrono para guardar una Alarma.
  */
  return async (dispatch, getState) => {
    const mqttClient = getState().mqtt.client

    dispatch(saveStart())
    if (newRange.action === 'CREATE') {

      const rangesPostResult = await HttpClient(
        `${HOSTS.API.RANGES}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Authorizer()
          },
          body: JSON.stringify(newRange)
        }
      )

      if (rangesPostResult.response) {
        mqttClient.publish('alarm_parameters', JSON.stringify(rangesPostResult.data))
        dispatch(createRange(rangesPostResult.data))
        dispatch(saveSuccess())
      } else {
        console.log("ERROR: /api/ranges")
        dispatch(saveFail())
      }

      // axios.post(
      //   HOSTS.API.RANGES,
      //   newRange
      // ).then((response) => {
      //   mqttClient.publish('alarm_parameters', JSON.stringify(response.data))
      //   dispatch(createRange(response.data))
      //   dispatch(saveSuccess())
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(saveFail())
      // })
    } else if (newRange.action === 'UPDATE') {

      const rangesPutResult = await HttpClient(
        `${HOSTS.API.RANGES}/${newRange.id}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Authorizer()
          },
          body: JSON.stringify(newRange)
        }
      )

      if (rangesPutResult.response) {
        mqttClient.publish('alarm_parameters', JSON.stringify(rangesPutResult.data))
        dispatch(updateRange(newRange))
        dispatch(saveSuccess(newRange))
      } else {
        console.log("ERROR: /api/ranges")
        dispatch(saveFail(newRange))
      }
      // axios.patch(
      //   `${HOSTS.API.RANGES}/${newRange.id}/`,
      //   newRange
      // ).then((response) => {
      //   mqttClient.publish('alarm_parameters', JSON.stringify(response.data))
      //   dispatch(updateRange(newRange))
      //   dispatch(saveSuccess(newRange))
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(saveFail(newRange))
      // })
    }
  }
}
