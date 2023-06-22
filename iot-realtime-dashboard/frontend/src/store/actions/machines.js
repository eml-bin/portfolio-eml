/*
  Machines Actions
    Acciones disponibles de las máquinas.

# 10/02/2020
@ Eduardo Muñoz (eduardo@gestalabs.com)
*/

// import axios from 'axios'
import { HOSTS } from '../../constants'
import { Authorizer } from '../../utils/Authorizer'
import { HttpClient } from '../../utils/HttpClient'

import { GET_MACHINES_START,
GET_MACHINES_SUCCESS,
GET_MACHINES_FAIL,
NEW_MACHINE_STATUS
} from './types'

const getMachinesStart = () => ({
  type: GET_MACHINES_START
})

const getMachinesSuccess = (machines) => ({
  type: GET_MACHINES_SUCCESS,
  machines,
})

const getMachinesFail = () => ({
  type: GET_MACHINES_FAIL
})

export const newMachineStatus = (status) => ({
  type: NEW_MACHINE_STATUS,
  status
})

export const getMachines = () => {
  return async (dispatch, getState) => {

    try {
      dispatch(getMachinesStart())
    
      const { response, data } = await HttpClient(
        `${HOSTS.API.MACHINES}/`, 
        {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': Authorizer()
          }
        }
      )

      if (!response) throw 500
      
      dispatch(getMachinesSuccess(data))

      // axios.get(HOSTS.API.MACHINES
      // ).then(response => {
      //   dispatch(getMachinesSuccess(response.data))
      // }).catch(error => {
      //   console.log(error)
      //   dispatch(getMachinesFail(error))
      // })
    } catch {
      dispatch(getMachinesFail())
    }

    

  }
}
