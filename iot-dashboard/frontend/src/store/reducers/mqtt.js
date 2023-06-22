/*
  MQTT Reducer
    Encargado de cambiar el state `mqtt´ de la aplicación.

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/


import {
  MQTT_NEW_VARIABLE,
  MQTT_CLIENT_CONNECT
} from '../actions/types'

import mqtt from 'mqtt'
import { HOSTS } from '../../constants'
// import { MQTT } from '../../configuration/constants'

const initialState = {
  client: null,
  streamingVariables: null
}

const createClient = () => {
  // console.log('MQTT HOST: ', process.env.REACT_APP_BROKER_HOST)
  const client = mqtt.connect(HOSTS.MQTT)

  client.on("connect",function(){	
    console.log("MQTT Connected!");
  })

  return client
  
}

export default function mqttReducer(state=initialState, action) {
  switch (action.type) {
    case MQTT_CLIENT_CONNECT:
      return {
        client: createClient()
      }
    case MQTT_NEW_VARIABLE:
      return {
        ...state,
        streamingVariables: action.newData
      }
    default:
      return state
  }
}
