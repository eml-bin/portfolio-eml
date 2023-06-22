/*
  MQTT Reducer
    Encargado de cambiar el state `mqtt´ de la aplicación.

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/


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
  UPDATE_SHUTDOWN,
  NEW_SHUTDOWN,
} from '../actions/types'

const initialState = {
  loadingAlarms: false,
  count: 0,
  alarms: [],
  shutdowns: [],
  errorAlarms: null
}

export default function notificationsReducer(state=initialState, action) {
  switch (action.type) {
    case GET_ALARMS_START:
      return {
        ...state,
        loadingAlarms: true
      }
    case GET_ALARMS_SUCCESS:
      return {
        ...state,
        loadingAlarms: false,
        count: state.count+action.data.filter(notification => notification.is_active).length,
        alarms: [...state.alarms, ...action.data]
      }
    case GET_ALARMS_FAIL:
      return {
        ...state,
        loadingAlarms: false,
        errorAlarms: true
      }
    case NEW_ALARM:
      return {
        ...state,
        count: state.count+1,
        alarms: [...state.alarms, action.alarm],
      }
    case ACTIVATE_ALARM:
      return {
        ...state,
        activeShutdown: null,
        activeAlarm: action.alarmID
      }
    case UPDATE_ALARM:
      let { alarmData } = action
      return {
        ...state,
        count: state.count-1,
        alarms: state.alarms.map((alarm) => {
          if (alarm.id === alarmData.id) {
            return {
              ...alarm,
              notes: alarmData.notes,
              is_active: alarmData.is_active
            }
          }
          return alarm
        })
      }

    case GET_SHUTDOWNS_START:
      return {
        ...state,
        loadingShutdowns: true
      }
    case GET_SHUTDOWNS_SUCCESS:
      return {
        ...state,
        loadingShutdowns: false,
        count: state.count+action.data.filter(notification => notification.is_active).length,
        shutdowns: [...state.shutdowns, ...action.data]
      }
    case GET_SHUTDOWNS_FAIL:
      return {
        ...state,
        loadingShutdowns: false,
        errorShutdowns: true
      }
    case NEW_SHUTDOWN:
      return {
        ...state,
        count: state.count+1,
        shutdowns: [...state.shutdowns, action.shutdown],
      }
    case ACTIVATE_SHUTDOWN:
      return {
        ...state,
        activeAlarm: null,
        activeShutdown: action.shutdownID
      }
    case UPDATE_SHUTDOWN:
        let { shutdownData } = action
        return {
          ...state,
          count: state.count-1,
          shutdowns: state.shutdowns.map((shutdown) => {
            if (shutdown.id === shutdownData.id) {
              return {
                ...shutdown,
                notes: shutdownData.notes,
                is_active: shutdownData.is_active
              }
            }
            return shutdown
          })
        }
    default:
      return state
  }
}
