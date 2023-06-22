import {
  GET_VARIABLES_START,
  GET_VARIABLES_SUCCESS,
  GET_VARIABLES_FAIL,
  UPDATE_VARIABLE,
  ACTIVE_VARIABLE,

  UPDATE_VALVE
} from '../actions/types'

const initialState = {
  loadingVariables: false,
  data: null,
  error: null,
}

export default function variablesReducer(state=initialState, action) {
  switch(action.type) {
    case GET_VARIABLES_START:
      return {
        loadingVariables: true
      }
    case GET_VARIABLES_SUCCESS:
      return {
        loadingVariables: false,
        data: action.data
      }
    case ACTIVE_VARIABLE:
      return {
        data: state.data,
        activeVariable: state.data.find(variable => variable.id === action.variableID)
      }
    case UPDATE_VALVE:
      let { valveData } = action
      return {
        ...state,
        data: state.data.map((variable) => {
          if (variable.tag.name === valveData.tagName) {
            return {
              ...variable,
              valveDetail: {
                date: valveData.date
              }
            }
          }
          return variable
        })
      }
    case UPDATE_VARIABLE:
      return state
    case GET_VARIABLES_FAIL:
      return {
        loadingVariables: false,
        error: true
      }

    default:
      return state
  }
}















// function dataReducer(state = {}, action) {
//   switch (action.type) {
//     case GET_VARIABLES_SUCCESS:
//       return {
//         variables: action.variables
//       }
//     case UPDATE_VARIABLE:
//       console.log(action.data)
//       let newData = JSON.parse(action.data)
//
//       return state.map((variable) => {
//         console.log(variable)
//         if (variable.tag_identifier === newData.variable) {
//           return {
//             ...variable,
//             newData
//           }
//         }
//         return variable
//       })
//     default:
//       return state
//   }
// }
