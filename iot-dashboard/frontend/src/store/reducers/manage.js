import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  NEW_USER,
  ACTIVE_USER,
  UPDATE_USER
} from '../actions/types'

const initialState = {
  loadingUsers: false,
  data: null,
  error: null,
}

export default function manageReducer(state=initialState, action) {
  switch(action.type) {
    case GET_USERS_START:
      return {
        loadingUsers: true
      }
    case GET_USERS_SUCCESS:
      return {
        loadingUsers: false,
        error: false,
        data: action.data
      }
    case GET_USERS_FAIL:
      return {
        loadingUsers: false,
        error: action.error
      }
    case NEW_USER:
      return {
        ...state,
        data: [...state.data, action.newUser]
      }
    case ACTIVE_USER:
      return {
        ...state,
        activeUser: state.data.find(user => user.id === action.userID)
      }
    case UPDATE_USER:
      let { newUser } = action
      return {
          ...state,
          data: state.data.map((user) => {
          if (user.id === newUser.id) {
            return {
              ...newUser
            }
          }
          return user
        })
      }
    default:
      return state
  }
}
