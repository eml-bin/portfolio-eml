/*
  MQTT Actions
    Acciones disponibles de mqtt.

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

import {
  MQTT_NEW_VARIABLE,
  MQTT_CLIENT_CONNECT
} from './types'

import { newAlarm, newShutdown } from '../../store/actions/notifications'
import { newMachineStatus } from '../../store/actions/machines'
import { HOSTS } from '../../constants'

export const createClient = () => {
  return {
    type: MQTT_CLIENT_CONNECT
  }
}

const newVariableData = (newData) => ({
    type: MQTT_NEW_VARIABLE,
    newData
})

export const subscribeTopics = () => {

  return (dispatch, getState) => {
    const client = getState().mqtt.client
    const role = getState().auth.user.role
    
    client.subscribe(HOSTS.TOPICS.VARIABLES.REALTIME)
    client.subscribe(HOSTS.TOPICS.VARIABLES.NOTIFICATIONS)
    client.subscribe(HOSTS.TOPICS.MACHINE.STATUS)

    client.on('message', (topic, data) => {
      let newData = JSON.parse(data.toString())
      console.log('subscriptions: topic-data', topic, newData)
      switch (topic) {
        case HOSTS.TOPICS.VARIABLES.REALTIME:
          console.log('update kepserver_variables')
          dispatch(newVariableData(newData))
          break
        case HOSTS.TOPICS.MACHINE.STATUS:
          dispatch(newMachineStatus(newData.value))
          break
        case HOSTS.TOPICS.VARIABLES.NOTIFICATIONS:
          if (role.level === 1 && role.family !== newData.machine.family) break

          if (newData.type === 1) {
            dispatch(newAlarm(newData))
          }
          else if (newData.type === 2) {
            dispatch(newShutdown(newData))
          }
          break
        default:
          break
      }
    })

    return client

  }
}
