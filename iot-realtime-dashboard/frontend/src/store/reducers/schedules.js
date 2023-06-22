import {
  GET_SCHEDULES_START,
  GET_SCHEDULES_SUCCESS,
  GET_SCHEDULES_FAIL,
  ACTIVE_SCHEDULE,
  UPDATE_SCHEDULE,
  NEW_SCHEDULE
} from '../actions/types'

const initialState = {
  loadingSchedules: false,
  data: null,
  error: null,
}

export default function schedulesReducer(state=initialState, action) {
  switch(action.type) {
    case GET_SCHEDULES_START:
      return {
        loadingSchedules: true
      }
    case GET_SCHEDULES_SUCCESS:
      return {
        loadingSchedules: false,
        error: false,
        data: action.data
      }
    case GET_SCHEDULES_FAIL:
      return {
        loadingSchedules: false,
        error: action.error
      }
    case ACTIVE_SCHEDULE:
      return state

      // return {
      //   data: state.data,
      //   activeRange: state.data.find(range => range.tagName === action.tagName)
      // }
    case NEW_SCHEDULE:
      return {
        ...state,
        data: [...state.data, action.newSchedule]
      }
    case UPDATE_SCHEDULE:
      return state

      // let { newRange } = action
      // return {
      //   ...state,
      //   data: state.data.map((range) => {
      //   if (range.tag_name === newRange.tag_name) {
      //     return {
      //       ...range,
      //       max: newRange.max,
      //       min: newRange.min,
      //       tolerance: newRange.tolerance,
      //       emails: newRange.emails
      //     }
      //   }
      //   return range
      // })
    default:
      return state
  }
}
