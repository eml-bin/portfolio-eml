import {
  GET_RANGES_START,
  GET_RANGES_SUCCESS,
  GET_RANGES_FAIL,
  ACTIVE_RANGE,
  UPDATE_RANGE,
  NEW_RANGE
} from '../actions/types'

const initialState = {
  loadingRange: false,
  data: null,
  error: null,
}

export default function rangesReducer(state=initialState, action) {
  switch(action.type) {
    case GET_RANGES_START:
      return {
        loadingRange: true
      }
    case GET_RANGES_SUCCESS:
      return {
        loadingRange: false,
        error: false,
        data: action.data
      }
    case GET_RANGES_FAIL:
      return {
        loadingRange: false,
        error: action.error
      }
    case ACTIVE_RANGE:
      return {
        data: state.data,
        activeRange: state.data.find(range => range.variable === action.variableID)
      }
    case NEW_RANGE:
      return {
        ...state,
        data: [...state.data, action.newRange]
      }
    case UPDATE_RANGE:
      let { newRange } = action
      return {
          ...state,
          data: state.data.map((range) => {
          if (range.id === newRange.id) {
            return {
              ...range,
              max: newRange.max,
              min: newRange.min,
              tolerance: newRange.tolerance,
              emails: newRange.emails,
              is_active: newRange.is_active
            }
          }
          return range
        })
      }
    default:
      return state
  }
}
