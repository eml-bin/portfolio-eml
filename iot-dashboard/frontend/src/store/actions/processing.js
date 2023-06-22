/*
  Notifications Actions
    Acciones disponibles del procesamiento de Formularios

  Eduardo Muñoz López (eduardo@gestalabs.com)
  10/02/2020
*/

import {
  SAVE_START,
  SAVE_SUCCESS,
  SAVE_FAIL,
  RESET_FORM,
} from './types'

export const resetForm = () => ({
  type: RESET_FORM
})

export const saveStart = () => ({
  type: SAVE_START,
})

export const saveSuccess = () => ({
  type: SAVE_SUCCESS,
})

export const saveFail = () => ({
  type: SAVE_FAIL,
})
