/*
  Variables Actions
    Acciones disponibles de las Variables.

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

// import axios from 'axios'

import {
  GET_VARIABLES_START,
  GET_VARIABLES_SUCCESS,
  GET_VARIABLES_FAIL,
  UPDATE_VARIABLE,
  ACTIVE_VARIABLE,
  UPDATE_VALVE
} from './types'

import { saveSuccess, saveStart, saveFail } from './processing'
import { HOSTS } from '../../constants'
import { HttpClient } from '../../utils/HttpClient'
import { Authorizer } from '../../utils/Authorizer'

const getVariablesStart = () => ({
  type: GET_VARIABLES_START
})

const getVariablesSuccess = (data) => ({
  type: GET_VARIABLES_SUCCESS,
  data
})

const getVariablesFail = () => ({
  type: GET_VARIABLES_FAIL
})

export const updateVariable = (newData) => ({
  type: UPDATE_VARIABLE,
  newData
})

export const updateValve = (valveData) => ({
  type: UPDATE_VALVE,
  valveData
})

export const activeVariable = (variableID) => ({
  type: ACTIVE_VARIABLE,
  variableID
})

export const getVariables = (machineID) => {
  return async (dispatch) => {

    try {
      dispatch(getVariablesStart())
    

      const url = new URL(`${HOSTS.API.VARIABLES}/`)
  
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

      if (!response) throw 500

      dispatch(getVariablesSuccess(data))

    } catch {
      console.log("ERROR: /api/schedule")
      dispatch(getVariablesFail())
    }

    // dispatch(getVariablesStart())

    // axios.get(HOSTS.API.VARIABLES, {
    //   params: {
    //     machine_id: machineID
    //   }
    // }).then(response => {
    //   dispatch(getVariablesSuccess(response.data))
    // }).catch(error => {
    //   console.log(error)
    //   dispatch(getVariablesFail(error))
    // })
  }
}

export const resetValve = (valveData) => {
  return async (dispatch, getState) => {
    
    try {
      const mqttClient = getState().mqtt.client
      dispatch(saveStart())

      const { response, data } = await HttpClient(
        `${HOSTS.API.COUNTERS}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Authorizer()
          },
          body: JSON.stringify(valveData)
        }
      )

      if (!response) throw 500
      
      mqttClient.publish('electrovalve_to_zero', JSON.stringify(valveData))
      dispatch(saveSuccess())
      dispatch(updateValve(valveData))


    } catch {
      console.log("ERROR: /api/counters")
      dispatch(saveFail())
    }

    // dispatch(saveStart())
    // axios.post(
    //   HOSTS.API.COUNTERS,
    //   valveData
    // ).then((response) => {
    //   mqttClient.publish('electrovalve_to_zero', JSON.stringify(valveData))
    //   dispatch(saveSuccess())
    //   dispatch(updateValve(valveData))
    // }).catch(error => {
    //   console.log(error)
    //   dispatch(saveFail())
    // })
  }
}
