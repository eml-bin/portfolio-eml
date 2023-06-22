/*
  Index de los multiples reducers

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

import { combineReducers } from 'redux'
import { LOGOUT } from '../actions/types'
import authReducer from './auth'
import historyReducer from './history'
import machinesReducer from './machines'
import manageReducer from './manage'
import mqttReducer from './mqtt'
import notificationsReducer from './notifications'
import pathsReducer from './paths'
import processingReducer from './processing'
import rangesReducer from './ranges'
import schedulesReducer from './schedules'
import variablesReducer from './variables'

const appReducer = combineReducers({
  auth: authReducer,
  history: historyReducer,
  machines: machinesReducer,
  manage: manageReducer,
  mqtt: mqttReducer,
  notifications: notificationsReducer,
  paths: pathsReducer,
  processing: processingReducer,
  ranges: rangesReducer,
  schedules: schedulesReducer,
  variables: variablesReducer,
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    localStorage.clear()
    state.mqtt.client && state.mqtt.client.end()
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
