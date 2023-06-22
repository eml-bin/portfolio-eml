/*
  History Actions
    Acciones disponibles del historial

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

// import axios from 'axios'
import FileDownload from 'js-file-download' 
import { HOSTS } from '../../constants'
import { Authorizer } from '../../utils/Authorizer'
import { HttpClient } from '../../utils/HttpClient'

import {
  GET_HISTORY_VARIABLE_START,
  GET_HISTORY_VARIABLE_SUCCESS,
  GET_HISTORY_VARIABLE_FAIL,
  GET_HISTORY_VALVE_START,
  GET_HISTORY_VALVE_SUCCESS,
  GET_HISTORY_VALVE_FAIL,
  RESET_HISTORY
} from './types'

const getHistoryVariableStart = () => ({
  type: GET_HISTORY_VARIABLE_START
})

const getHistoryVariableSuccess = (data, distinctTypes, endDate=null, interval=null) => ({
  type: GET_HISTORY_VARIABLE_SUCCESS,
  data,
  distinctTypes,
  endDate,
  interval
})

const getHistoryVariableFail = () => ({
  type: GET_HISTORY_VARIABLE_FAIL
})

const getHistoryValveStart = () => ({
  type: GET_HISTORY_VALVE_START
})

const getHistoryValveSuccess = (data) => ({
  type: GET_HISTORY_VALVE_SUCCESS,
  data,
})

const getHistoryValveFail = () => ({
  type: GET_HISTORY_VALVE_FAIL
})

export const resetHistory = () => ({
  type: RESET_HISTORY
})

export const getNotificationHistory = (machineID, endDate) => {
  return async (dispatch) => {

    try {

      dispatch(getHistoryVariableStart())
  
      const url = new URL(`${HOSTS.API.HISTORY}/`)
  
      const params = { machine_id: machineID, date_end: endDate, interval: '5m' }
  
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

      const distinctTypes = [...new Set(data.map(value => value.type))]
      dispatch(getHistoryVariableSuccess(data, distinctTypes))
  
      // axios.get(HOSTS.API.HISTORY, {
      //   params: {
      //     machine_id: machineID,
      //     date_end: endDate,
      //     interval: '5m'
      //   }
  
      // }).then(response => {
      //   const distinctTypes = [...new Set(response.data.map(value => value.type))]
      //   dispatch(getHistoryVariableSuccess(response.data, distinctTypes))
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(getHistoryVariableFail(error))
      // })

    } catch {
      console.log('ERROR getHistory')
      dispatch(getHistoryVariableFail())
    }

  }
}

export const getVariablesHistory = (machineID, endDate, interval='8h') => {
  return async(dispatch) => {

    try { 
      dispatch(getHistoryVariableStart())
  
      const url = new URL(`${HOSTS.API.HISTORY}/`)
  
      const params = { machine_id: machineID, date_end: endDate, interval: interval }
  
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

      const distinctTypes = [...new Set(data.map(value => value.type))]
      dispatch(getHistoryVariableSuccess(data, distinctTypes))

      // dispatch(getHistoryVariableStart())
      // axios.get(HOSTS.API.HISTORY, {
      //   params: {
      //     machine_id: machineID,
      //     date_end: endDate,
      //     interval: interval
      //   }
      // }).then(response => {
      //   const distinctTypes = [...new Set(response.data.map(value => value.type))]
      //   dispatch(getHistoryVariableSuccess(response.data, distinctTypes, endDate, interval))
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(getHistoryVariableFail(error))
      // })

    } catch {
      console.log('ERROR getHistory')
      dispatch(getHistoryVariableFail())
    }

  }
}

export const getValveHistory = (tagID) => {
  return async (dispatch) => {

    try {

      dispatch(getHistoryValveStart())

      const url = new URL(`${HOSTS.API.COUNTERS}/`)
  
      const params = { tag_id: tagID }
  
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

      dispatch(getHistoryValveSuccess(data))

      // axios.get(HOSTS.API.COUNTERS, {
      //   params: {
      //     tag_id: tagID,
      //   }
      // }).then(response => {
      //   dispatch(getHistoryValveSuccess(response.data))
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(getHistoryValveFail(error))
      // })


    } catch {
      console.log("ERROR /api/counters")
      dispatch(getHistoryValveFail())
    }
  
  }
}

export const exportHistoryToCSV = async (machineID, endDate, interval='8h') => {

  try {

    const url = new URL(HOSTS.API.EXPORT)

    const params = {  
      machine_id: machineID,
      date_end: endDate,
      interval: interval
    }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  
    const { response, data } = await HttpClient(
      url.href, 
      {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      }
    )

    if (!response) throw 500

    FileDownload(data, `reporte_${interval}.csv`);


    // axios.get(HOSTS.API.EXPORT, {
    //   params: {
    //     machine_id: machineID,
    //     date_end: endDate,
    //     interval: interval
    //   }
    // }).then((response) => {
    //   FileDownload(response.data, `reporte_${interval}.csv`);
    // }).catch(error => {
    //   console.log(error)
    // })  


  } catch {
    console.log("ERROR /api/export")
  }

}






































// export const getVariableHistory = (tagID) => {
//   return (dispatch) => {
//     dispatch(getHistoryVariableStart())
//
//     axios.get('/api/values', {
//       params: {
//         tag_id: tagID,
//       }
//     }).then(response => {
//       console.log(response.data)
//       dispatch(getHistoryVariableSuccess(response.data))
//     }).catch(error => {
//       console.log(error)
//       dispatch(getHistoryVariableFail(error))
//     })
//
//   }
// }
