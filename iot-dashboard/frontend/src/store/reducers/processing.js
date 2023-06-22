import {
  SAVE_START,
  SAVE_SUCCESS,
  SAVE_FAIL,
  RESET_FORM
} from '../actions/types'

const initialState = {
  pending: false,
  success: null,
  error: null,
}

export default function rangeReducer(state=initialState, action) {
  switch(action.type) {
    case SAVE_START:
      return {
        pending: true,
      }
    case SAVE_SUCCESS:
      return {
        pending: false,
        success: true,
      }
    case SAVE_FAIL:
      return {
        success: false,
        error: true
      }
    case RESET_FORM:
      return initialState
    default:
      return state
  }
}
